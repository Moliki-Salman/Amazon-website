export function formatCurrency(priceCents) {
  return (priceCents / 100).toFixed(2);
}


//an example of a default export. when importing this function, a {} will not be needed. Note each file can only  have one fefault export.
export default formatCurrency