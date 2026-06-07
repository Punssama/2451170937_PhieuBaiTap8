function createCart() {
  let items = [];
  let discountCode = null;

  function getSubtotal() {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  function getDiscountAmount() {
    const subtotal = getSubtotal();
    if (discountCode === "SALE10") return subtotal * 0.1;
    if (discountCode === "SALE20") return subtotal * 0.2;
    if (discountCode === "FREESHIP") return 30000;
    return 0;
  }

  function formatMoney(value) {
    return value.toLocaleString("vi-VN") + "k";
  }

  return {
    addItem(product, quantity = 1) {
      const existing = items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        items.push({ ...product, quantity });
      }
    },

    removeItem(productId) {
      items = items.filter((item) => item.id !== productId);
    },

    updateQuantity(productId, newQuantity) {
      if (newQuantity <= 0) {
        this.removeItem(productId);
        return;
      }
      const existing = items.find((item) => item.id === productId);
      if (existing) existing.quantity = newQuantity;
    },

    getTotal() {
      return Math.max(0, getSubtotal() - getDiscountAmount());
    },

    applyDiscount(code) {
      discountCode = code;
    },

    printCart() {
      const subtotal = getSubtotal();
      const discount = getDiscountAmount();
      const total = Math.max(0, subtotal - discount);

      console.log("┌──────────────────────────────────────────────┐");
      console.log("│ # │ Sản phẩm      │ SL │ Đơn giá     │ Tổng   │");
      items.forEach((item, index) => {
        const lineTotal = item.price * item.quantity;
        const row = `│ ${String(index + 1).padEnd(1)} │ ${item.name.padEnd(13)} │ ${String(item.quantity).padStart(2)} │ ${formatMoney(item.price).padStart(11)} │ ${formatMoney(lineTotal).padStart(9)} │`;
        console.log(row);
      });
      console.log("├──────────────────────────────────────────────┤");
      console.log(`│ Tổng cộng:${formatMoney(total).padStart(31)} │`);
      console.log("└──────────────────────────────────────────────┘");
    },

    getItemCount() {
      return items.reduce((sum, item) => sum + item.quantity, 0);
    },

    clearCart() {
      items = [];
      discountCode = null;
    },
  };
}

const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);

cart.printCart();

cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount());
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount());

if (typeof module !== "undefined") {
  module.exports = { createCart };
}
