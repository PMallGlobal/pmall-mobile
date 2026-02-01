const currency = (value) =>
new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0,
}).format(value);


export default currency;