import { useState } from "react";
import { createOrder } from "../services/orderService";

const CreateOrder = () => {
  const [form, setForm] = useState({
    total_amount: "",
    shipping_address: "",
    items: [{ product_id: "", quantity: "", price: "" }]
  });
  const [message, setMessage] = useState("");

  const handleChange = (e, idx) => {
    if (["product_id", "quantity", "price"].includes(e.target.name)) {
      const items = [...form.items];
      items[idx][e.target.name] = e.target.value;
      setForm({ ...form, items });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const addItem = () => {
    setForm({
      ...form,
      items: [...form.items, { product_id: "", quantity: "", price: "" }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOrder(form);
      setMessage("Order created!");
    } catch (err) {
      setMessage("Failed to create order.");
    }
  };

  return (
    <div>
      <h2>Create Order (Admin Only)</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="total_amount"
          placeholder="Total Amount"
          value={form.total_amount}
          onChange={handleChange}
          required
        />
        <input
          name="shipping_address"
          placeholder="Shipping Address"
          value={form.shipping_address}
          onChange={handleChange}
          required
        />
        <h4>Items</h4>
        {form.items.map((item, idx) => (
          <div key={idx}>
            <input
              name="product_id"
              placeholder="Product ID"
              value={item.product_id}
              onChange={e => handleChange(e, idx)}
              required
            />
            <input
              name="quantity"
              placeholder="Quantity"
              value={item.quantity}
              onChange={e => handleChange(e, idx)}
              required
            />
            <input
              name="price"
              placeholder="Price"
              value={item.price}
              onChange={e => handleChange(e, idx)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addItem}>Add Item</button>
        <button type="submit">Create Order</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateOrder;