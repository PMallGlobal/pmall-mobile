import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { VendorAvatar } from '../vendor/VendorAvatar';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';

import SingleCategoryGrid from './SingleCategoryGrid';
import LimitWord from '../utils/limitWord';
import { getCart } from '../utils/cartUtils';
import Toast from '../utils/Toast';

import './Details.css';

const API = 'https://api.pmall.com.ng/api/v1/public/products/single-product';

async function fetchProductById(productId) {
  const url = `${API}?product_id=${productId}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();
  const product = result?.data;
console.log(product);
  if (!product) {
    throw new Error("No product data returned");
  }

  // Parse more_images safely
  let parsedImages = [];

  if (typeof product.more_images === 'string') {
    const trimmed = product.more_images.trim();
    
    if (trimmed.startsWith('[')) {
      // It's likely a JSON array string
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          parsedImages = parsed;
        }
      } catch (err) {
        console.error("Failed to parse more_images as JSON:", err);
      }
    } else if (trimmed.includes(',')) {
      // It's a comma-separated string
      parsedImages = trimmed.split(',').map(s => s.trim());
    } else if (trimmed.length > 0) {
      // It's just a single plain URL string
      parsedImages = [trimmed];
    }
  } else if (Array.isArray(product.more_images)) {
    // Already an array
    parsedImages = product.more_images;
  }

  // Clean up: ensure all items are valid non-empty strings
  parsedImages = parsedImages
    .map((img) => (typeof img === 'string' ? img.trim() : ''))
    .filter((img) => img !== '');

  return {
    ...product,
    more_images: parsedImages,
  };
}

const fmt = (n) => Number(n || 0).toLocaleString('en-NG');

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  /* ── query ───────────────────────────────────────────────────────── */
  const { data: product, isPending, isError, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  /* ── local UI state ──────────────────────────────────────────────── */
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [toast, setToast] = useState(null);
  const trackRef = useRef(null);

  /* reset UI state when product id changes */
  useEffect(() => {
    setQty(1);
    setActiveImg(0);
    setExpanded(false);
    if (trackRef.current) trackRef.current.scrollLeft = 0;
  }, [id]);

  /* hydrate cart badge */
  useEffect(() => {
    const cart = getCart() || [];
    setCartCount(cart.reduce((s, i) => s + (i.amtItems || 1), 0));
  }, []);

  /* ── derived data ────────────────────────────────────────────────── */
  const stock = Number(product?.quantity ?? 0);         // ← real count
  const selling = Number(product?.selling_price ?? 0);
  const original = Number(product?.price ?? 0);
  const hasDiscount = original > selling && selling > 0;
  const discountPct = hasDiscount
    ? Math.round((1 - selling / original) * 100)
    : 0;

  const images = useMemo(() => {
    const list = [product?.image, ...(product?.more_images || [])].filter(Boolean);
    return list.length ? list : ['https://placehold.net/400x400.png'];
  }, [product?.image, product?.more_images]);

  const fullDesc = product?.description || '';
  const descWordCount = useMemo(
    () => (fullDesc ? fullDesc.trim().split(/\s+/).length : 0),
    [fullDesc]
  );
  const canTruncate = descWordCount > 30;
  const displayDesc =
    expanded || !canTruncate ? fullDesc : LimitWord(fullDesc, 30);

  /* ── carousel ───────────────────────────────────────────────────── */
  const handleScroll = () => {
    const el = trackRef.current;
    if (!el || !el.clientWidth) return;
    setActiveImg(Math.round(el.scrollLeft / el.clientWidth));
  };

  const goToImg = (i) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
  };

  /* ── qty handlers ────────────────────────────────────────────────── */
  const decQty = useCallback(() => setQty((p) => Math.max(1, p - 1)), []);
  const incQty = useCallback(
    () => setQty((p) => Math.min(stock || 1, p + 1)),
    [stock]
  );

  /* ── add to cart ─────────────────────────────────────────────────── */
  const handleAddToCart = useCallback(() => {
    if (!product?.id) {
      setToast({ message: 'Product data missing', type: 'error' });
      return;
    }
    if (stock <= 0) {
      setToast({ message: 'This product is out of stock', type: 'error' });
      return;
    }

    const cart = getCart() || [];
    const idx = cart.findIndex((i) => i?.id === product.id);

    let updatedCart;
    let message;

    if (idx !== -1) {
      const existing = cart[idx];
      const currentQty = existing.amtItems || 1;
      const nextQty = Math.min(stock, currentQty + qty);
      const added = nextQty - currentQty;

      if (added <= 0) {
        setToast({ message: `Only ${stock} in stock — cannot add more`, type: 'error' });
        return;
      }
      updatedCart = [...cart];
      updatedCart[idx] = { ...existing, amtItems: nextQty };
      message = `Added ${added} more · ${product.name}`;
    } else {
      updatedCart = [...cart, { ...product, amtItems: qty }];
      message = `Added to cart · ${product.name}`;
    }

    try {
      localStorage.setItem('pmallCart', JSON.stringify(updatedCart));
    } catch {
      setToast({ message: 'Failed to save cart', type: 'error' });
      return;
    }

    const newTotal = updatedCart.reduce((s, i) => s + (i.amtItems || 1), 0);
    setCartCount(newTotal);
    setToast({ message, type: 'success' });
    setQty(1);
    setTimeout(() => navigate('/cart'), 400);
  }, [product, stock, qty, navigate]);

  
  if (isPending) {
    return (
      <div className="pd-page">
        <div className="pd-skeleton">
          <div className="pd-skeleton__block" style={{ aspectRatio: '1/1' }} />
          <div className="pd-skeleton__block" style={{ height: 24, marginTop: 16, width: '80%' }} />
          <div className="pd-skeleton__block" style={{ height: 16, marginTop: 12, width: '50%' }} />
          <div className="pd-skeleton__block" style={{ height: 40, marginTop: 16, width: '60%' }} />
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="pd-page">
        <div className="pd-topbar">
          <button className="pd-topbar__back" onClick={() => navigate(-1)} aria-label="Back">
            <ArrowBackIosNewIcon fontSize="small" />
          </button>
          <h1 className="pd-topbar__title">Product</h1>
          <span style={{ width: 40 }} />
        </div>
        <div style={{ padding: 32, textAlign: 'center', color: '#b91c1c' }}>
          {error?.message || 'Product not found'}
        </div>
      </div>
    );
  }

  const stockVariant =
    stock <= 0 ? 'out' : stock <= 5 ? 'low' : 'in';
  const stockLabel =
    stock <= 0
      ? 'Out of stock'
      : stock <= 5
      ? `Only ${stock} left in stock`
      : `In stock · ${stock} available`;

  /* ── render ──────────────────────────────────────────────────────── */
  return (
    <div className="pd-page">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* ── Top bar ─────────────────────────────────────────────── */}
      <header className="pd-topbar">
        <button
          className="pd-topbar__back"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </button>
        <h1 className="pd-topbar__title">{product.name || 'Product'}</h1>
        <Link to="/cart" className="pd-topbar__cart" aria-label="Cart">
          <ShoppingCartOutlinedIcon />
          {cartCount > 0 && (
            <span className="pd-topbar__badge">{cartCount > 99 ? '99+' : cartCount}</span>
          )}
        </Link>
      </header>

      {/* ── Image carousel ──────────────────────────────────────── */}
      <section className="pd-carousel" aria-label="Product images">
        <div
          className="pd-carousel__track"
          ref={trackRef}
          onScroll={handleScroll}
        >
          {images.map((src, i) => (
            <div className="pd-carousel__slide" key={i}>
              <img
                src={src}
                alt={`${product.name} — view ${i + 1}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.net/400x400.png';
                }}
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <div className="pd-carousel__dots" aria-hidden>
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`pd-carousel__dot ${activeImg === i ? 'is-active' : ''}`}
                  onClick={() => goToImg(i)}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
            <div className="pd-carousel__counter">
              {activeImg + 1} / {images.length}
            </div>
          </>
        )}
      </section>

      {/* ── Title, price, stock ─────────────────────────────────── */}
      <section className="pd-section">
        {product?.category?.name && (
          <span className="pd-chip">{product.category.name}</span>
        )}

        <h2 className="pd-name">{product.name}</h2>

        <div className="pd-meta">
          {product?.brand?.name && <span>Brand: {product.brand.name}</span>}
          {product?.brand?.name && <span className="pd-meta__divider" />}
          <span>Ships from {product?.vendor?.store_name || 'Pmall'}</span>
        </div>

        <div className="pd-price-row">
          <span className="pd-price">
            <span className="pd-price__currency">₦</span>
            {fmt(selling)}
          </span>
          {hasDiscount && (
            <>
              <span className="pd-price-old">₦{fmt(original)}</span>
              <span className="pd-price-off">-{discountPct}%</span>
            </>
          )}
        </div>

        <div className={`pd-stock pd-stock--${stockVariant}`}>
          <span className="pd-stock__dot" />
          {stockLabel}
        </div>
      </section>

      
      {product?.vendor && (
        <section className="pd-section">
          <div className="pd-vendor">
            <VendorAvatar 
        name={product.vendor.store_name} 
        photo={product.vendor.photo} 
      />
            <div className="pd-vendor__info">
              <p className="pd-vendor__name">
                {product.vendor.store_name}
                <VerifiedIcon fontSize="small" style={{ color: '#6d28d9' }} />
              </p>
              <p className="pd-vendor__label">Verified seller · Usually replies in minutes</p>
            </div>
            <button className="pd-icon-btn" aria-label="Chat seller">
              <ChatOutlinedIcon fontSize="small" />
            </button>
            <button className="pd-icon-btn" aria-label="Call seller">
              <PhoneOutlinedIcon fontSize="small" />
            </button>
          </div>
        </section>
      )}

      {/* ── Trust badges ────────────────────────────────────────── */}
      <section className="pd-trust">
        <div className="pd-trust__item">
          <LocalShippingOutlinedIcon className="pd-trust__icon" />
          <span>Fast delivery</span>
        </div>
        <div className="pd-trust__item">
          <ReplayOutlinedIcon className="pd-trust__icon" />
          <span>7-day returns</span>
        </div>
        <div className="pd-trust__item">
          <ShieldOutlinedIcon className="pd-trust__icon" />
          <span>100% authentic</span>
        </div>
      </section>

      {/* ── Description ─────────────────────────────────────────── */}
      <section className="pd-section">
        <h3 className="pd-section__title">Product Information</h3>
        <p className="pd-desc">
          {displayDesc}
          {canTruncate && (
            <button
              className="pd-desc__toggle"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? 'Read less' : 'Read more'}
            </button>
          )}
        </p>
      </section>

      {/* ── Related products ────────────────────────────────────── */}
      {product?.category?.id && (
        <section className="pd-related">
          <div className="pd-related__header">
            <h3 className="pd-section__title" style={{ margin: 0 }}>
              You may also like
            </h3>
          </div>
          <div className="pd-related__scroll">
            <SingleCategoryGrid categoryId={product.category.id} related={true} />
          </div>
        </section>
      )}

      {/* ── Sticky buy bar ──────────────────────────────────────── */}
      <div className="pd-sticky">
        <div className="pd-qty" aria-label="Quantity selector">
          <button
            className="pd-qty__btn"
            onClick={decQty}
            disabled={qty <= 1}
            aria-label="Decrease quantity"
          >
            <RemoveOutlinedIcon fontSize="small" />
          </button>
          <span className="pd-qty__num">{qty}</span>
          <button
            className="pd-qty__btn"
            onClick={incQty}
            disabled={stock <= 0 || qty >= stock}
            aria-label="Increase quantity"
          >
            <AddOutlinedIcon fontSize="small" />
          </button>
        </div>

        <button
          className="pd-cta"
          onClick={handleAddToCart}
          disabled={stock <= 0}
        >
          <ShoppingCartOutlinedIcon fontSize="small" />
          {stock <= 0 ? 'Out of stock' : `Add to Cart · ₦${fmt(selling * qty)}`}
        </button>
      </div>
    </div>
  );
}