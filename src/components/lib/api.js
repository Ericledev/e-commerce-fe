// const URL =
//   "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74";
const URL = process.env.REACT_APP_DOMAIN;
// Fetch all products
export const getProducts = async () => {
  const res = await fetch(URL + "/product/get-all-products");
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Something wrong");
  }
  return data.data;
};

// Fetch product by id
export const getProductByID = async (id) => {
  const res = await fetch(URL);
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Something wrong");
  }
  return data.filter((item) => item._id.$oid === id);
};
