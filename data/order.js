export const orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
  orders.unshift();
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

//orders made from the page scripts/checkout/paymentSummary.js will be save here
//orders.unshift(): adds the latesorders to the front in the array
