const headers = {
  Product: ['ID', 'Name', 'Category', 'Price', 'BarCode', 'Tax', 'Actions'],
};
export const getHeaders = (
  key
) => {
  const headersArray = headers[key];
  return headersArray;
};
