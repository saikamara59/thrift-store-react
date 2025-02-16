const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/products`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const products = await res.json();
    return products;
  } catch (error) {
    console.log(error);
  }
};

const show = async (productId) => {
  try {
    const res = await fetch(`${BASE_URL}/${productId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const product = await res.json();
    console.log(product);
    return product;
  } catch (error) {
    console.log(error);
  }
};

export { index, show };
