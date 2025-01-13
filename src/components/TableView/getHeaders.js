const headers = {
  Order: ['Items', 'Quantity', 'Price'],
  arOrder: ['أغراض', 'كمية', 'سعر'],
};
export const getHeaders = (
  key
) => {
  const headersArray = headers[key];
  return headersArray;
};
