const headers = {
  Product: ['BarCode', 'Name', 'Category', 'Price', 'Quantity', 'Actions'],
};
export const getHeaders = (
  key
) => {
  const headersArray = headers[key];
  return headersArray;
};
