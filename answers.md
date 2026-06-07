# BÀI LÀM — PBT 08

### Câu A1 — Function Declaration vs Expression vs Arrow

**1) Function Declaration**

```javascript
function tinhThueBaoHiem(luong) {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return {
    thuong: thue,
    thuc_nhan: luong - thue,
  };
}
```

**2) Function Expression**

```javascript
const tinhThueBaoHiem = function (luong) {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return {
    thuong: thue,
    thuc_nhan: luong - thue,
  };
};
```

**3) Arrow Function**

```javascript
const tinhThueBaoHiem = (luong) => {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return {
    thuong: thue,
    thuc_nhan: luong - thue,
  };
};
```

**Hoisting:**

- Function Declaration được hoisting toàn bộ nên có thể gọi trước khi định nghĩa.
- Function Expression và Arrow Function nếu gán cho `const` / `let` thì chỉ hoisting phần khai báo biến, không hoisting giá trị function.
- Vì vậy gọi trước khi gán sẽ bị lỗi `ReferenceError` hoặc `TypeError` tùy trường hợp.

**Ví dụ:**

```javascript
console.log(a());
function a() {
  return "ok";
}

console.log(b()); // lỗi
const b = function () {
  return "ok";
};
```

---

### Câu A2 — Scope & Closure

**Đoạn 1 output:**

```javascript
1;
2;
3;
2;
2;
```

**Giải thích:** biến `count` nằm trong closure của object trả về, nên các method `increment`, `decrement`, `getCount` cùng dùng chung một biến private.

**Đoạn 2 output sau 200ms:**

```javascript
var: 3
var: 3
var: 3
let: 0
let: 1
let: 2
```

**Giải thích:**

- `var i` có scope theo function/global, nên cả 3 callback đều đọc cùng một biến `i` sau khi vòng lặp kết thúc là `3`.
- `let j` có scope theo block và mỗi vòng lặp tạo một binding riêng, nên callback giữ đúng giá trị từng vòng.

---

### Câu A3 — Array Methods

```javascript
nums.filter((n) => n % 2 === 0);
nums.map((n) => n * 3);
nums.reduce((sum, n) => sum + n, 0);
nums.find((n) => n > 7);
nums.some((n) => n > 10);
nums.every((n) => n > 0);
nums.map((n) => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);
nums.slice().reverse();
```

---

### Câu A4 — Object Destructuring & Spread

```javascript
console.log(name, price, ram, color); // iPhone 16 25990000 8 Titan
console.log(specs); // ReferenceError: specs is not defined

console.log(updated.price); // 23990000
console.log(updated.sale); // true
console.log(product.price); // 25990000

console.log(product.specs.ram); // 16
```

**Giải thích:**

- Destructuring lấy riêng các field cần dùng.
- `specs: { ram, color }` là lấy nested properties, không tạo biến `specs`.
- Spread object là shallow copy, nên `copy.specs` và `product.specs` vẫn trỏ cùng object con.

---

## PHẦN B — THỰC HÀNH CODE

### Bài B1 — Quản lý Sản phẩm E-Commerce

- File: [product_manager.js](product_manager.js)

**Đáp ứng yêu cầu:**

- Dùng `filter` để lọc còn hàng và lọc theo category/giá.
- Dùng `sort` để sắp xếp theo giá.
- Dùng `reduce` để tính tổng giá trị kho và rating trung bình.
- Dùng `map` để tạo danh sách format giá.
- Dùng `find` trong hàm tra cứu sản phẩm đầu tiên khớp keyword.

### Bài B2 — Giỏ hàng (Shopping Cart)

- File: [shopping_cart.js](shopping_cart.js)

**Đáp ứng yêu cầu:**

- Dùng Closure để giữ `items` là dữ liệu private.
- Có `addItem`, `removeItem`, `updateQuantity`, `getTotal`, `applyDiscount`, `printCart`, `getItemCount`, `clearCart`.
- Hỗ trợ mã giảm giá `SALE10`, `SALE20`, `FREESHIP`.

### Bài B3 — Higher-Order Functions Challenge

- File: [higher_order.js](higher_order.js)

**Đáp ứng yêu cầu:**

- `pipe()` nối chuỗi hàm.
- `memoize()` cache kết quả theo input.
- `debounce()` trì hoãn thực thi đến khi ngừng gọi.
- `retry()` thử lại hàm async khi lỗi.

---

## PHẦN C — SUY LUẬN

### Câu C1 — Refactor Code

```javascript
const processOrders = (orders) =>
  orders
    .filter(({ status, total }) => status === "completed" && total > 100000)
    .map(({ id, customer, total }) => ({
      id,
      customer,
      total,
      discount: total * 0.1,
      finalTotal: total * 0.9,
    }))
    .sort((a, b) => b.finalTotal - a.finalTotal);
```

**Ý chính:**

- Dùng `filter` để chọn đơn hợp lệ.
- Dùng `map` để tạo object mới.
- Dùng `sort` để sắp xếp giảm dần theo `finalTotal`.
- Code ngắn, rõ, không dùng vòng lặp lồng nhau.

### Câu C2 — Thiết kế API

```javascript
const miniArray = {
  map(arr, fn) {
    const result = [];
    for (let i = 0; i < arr.length; i++) result.push(fn(arr[i], i, arr));
    return result;
  },
  filter(arr, fn) {
    const result = [];
    for (let i = 0; i < arr.length; i++)
      if (fn(arr[i], i, arr)) result.push(arr[i]);
    return result;
  },
  reduce(arr, fn, initialValue) {
    let acc = initialValue;
    let start = 0;
    if (acc === undefined) {
      acc = arr[0];
      start = 1;
    }
    for (let i = start; i < arr.length; i++) acc = fn(acc, arr[i], i, arr);
    return acc;
  },
};
```

**Test:**

- `map` trả về mảng mới đúng kích thước.
- `filter` giữ lại phần tử thỏa điều kiện.
- `reduce` gom dần thành một giá trị.

---

## Ghi chú

- Đã tạo đủ file theo checklist PBT 08.
- Có thể chạy `node product_manager.js`, `node shopping_cart.js`, `node higher_order.js` để chụp console output.
