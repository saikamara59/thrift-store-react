const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/orders`;

const createOrder = async (orderData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(orderData),
    });
    return await res.json();
  } catch (err) {
    throw new Error("Failed to create order");
  }
};

const fetchUserOrders = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return await res.json();
  } catch (err) {
    throw new Error("Failed to fetch orders");
  }
};

export { createOrder, fetchUserOrders };
