export const currencyFormatter = amount => {
  //   currency is naira
  const formatter = Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  });
  return formatter.format(amount);
};
