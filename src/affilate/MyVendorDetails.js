import React, { useState } from 'react'
import CategoryHeader from '../components/CategoryHeader'
import ProductsTable from './ProductsTable';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Projects from './Projects';
import Photos from './Photos';
import Toast from '../utils/Toast';


export default function MyVendorDetails() {
    const [activeTab, setActiveTab] = useState('products');
    const [toast, setToast] = useState()
  const tabs = [
    { id: 'products', label: 'Total Products (120)' },
    { id: 'projects', label: 'Projects (21)' },
    { id: 'photos', label: 'Photos (20)' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductsTable />;
      case 'projects':
        return <Projects />;
      case 'photos':
        return <Photos />;
      default:
        return null;
    }
  };
  return (
    <div className='my-vendor-details'>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <CategoryHeader title="My Vendors" image="true" />
        <div className='flex justsb w-full g-20 alc'>
            <div className='statement flex all-center g-10 w-full'>
                <ArticleOutlinedIcon />
                <p>View Statement</p>
            </div>
            <div className='ed flex all-center g-10 w-full'>
                <EditOutlinedIcon />
                <p>Edit Details</p>
            </div>
        </div>
        <div className='bg-white p-10 rounded-sm flex flex-col g-10 vd'>
            <div className='flex alc justsb bb head'>
                <p className='title'>Total Estimates</p>
                <p className='black'>6</p>
            </div>
            <div className='flex alc justsb bb'>
                <div className='flex flex-col alc'>
                    <p>Delivered</p>
                    <p>2</p>
                </div>
                <div className='flex flex-col alc'>
                    <p>Pending</p>
                    <p>4</p>
                </div>
            </div>
            <div className='flex alc justsb bb head'>
                <p  className='title'>All Orders</p>
                <p className='black'>2</p>
            </div>
            <div className='flex alc justsb bb'>
                <div className='flex flex-col alc'>
                    <p>Delivered</p>
                    <p>2</p>
                </div>
                <div className='flex flex-col alc'>
                    <p>Pending</p>
                    <p>4</p>
                </div>
            </div>
            <div className='flex alc justsb bb head'>
                <p className='title'>Invoices</p>
                <p className='black'>2</p>
            </div>
            <div className='flex alc justsb bb'>
                <div className='flex flex-col alc'>
                    <p>Paid</p>
                    <p>2</p>
                </div>
                <div className='flex flex-col alc'>
                    <p>Pending</p>
                    <p>4</p>
                </div>
            </div>
            <div className='flex alc justsb'>
                <div className='flex flex-col alc'>
                    <p>Overdue</p>
                    <p>2</p>
                </div>
                <div className='flex flex-col alc'>
                    <p>Draft</p>
                    <p>4</p>
                </div>
            </div>
        </div>
        <div className="tabs-section">
      {/* Tab Headers */}
      <div className="tabs-header">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tabs-content">
        {renderContent()}
      </div>
    </div>
    </div>
  )
}
