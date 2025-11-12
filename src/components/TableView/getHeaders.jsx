const headers = {
  Order: ['Barcode', 'Items', 'Quantity', 'Price'],
  arOrder: ['الباركود', 'أغراض', 'كمية', 'سعر'],
};
export const getHeaders = (
  key
) => {
  const headersArray = headers[key];
  return headersArray;
};
