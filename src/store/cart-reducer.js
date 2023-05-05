const initialStateCart = {
  total: 0,
  listCart: [],
};

const cartReducer = (state = initialStateCart, action) => {
  const { total, listCart } = state;
  console.log("CHECK listCart in cartReducer: ", listCart);
  switch (action.type) {
    case "ADD_CART":
      // Check listCart is empty then add product to cart
      if (listCart.length === 0) {
        return {
          listCart: [action.value],
          total: +action.value.product.price * action.value.quantity,
        };
      }
      // Check isExist
      let isExist = listCart.findIndex(
        (item) => item.product._id.$oid === action.value.product._id.$oid
      );
      const updatedProducts = listCart.map((item) => {
        let newQuantity;
        if (item.product._id.$oid === action.value.product._id.$oid) {
          newQuantity = +item.quantity + +action.value.quantity;
        } else {
          newQuantity = +item.quantity;
        }
        return {
          product: item.product, //{...item.product,_id:{...item.product._id}},
          quantity: Number(newQuantity),
        };
      });
      // update cartList
      if (isExist !== -1) {
        return {
          listCart: [...updatedProducts],
          total: total + +action.value.product.price * action.value.quantity,
        };
      }
      // add new item in cartList
      if (isExist === -1) {
        return {
          listCart: [...listCart, action.value],
          total: total + +action.value.product.price * action.value.quantity,
        };
      }
      break;
    case "DELETE_CART":
      const listCartAfterDelete = listCart.filter(
        (item) => item.product._id.$oid !== action.value.id
      );
      console.log("CART DELETE: ", listCartAfterDelete);
      console.log("CART Total DELETE: ", action.value.total);
      return {
        listCart: [...listCartAfterDelete],
        total: total - +action.value.total,
      };
    case "INCREASE_QUANTITY":
      const incrementListCart = listCart.map((item) => {
        if (item.product._id.$oid === action.value.id) {
          item.quantity = item.quantity + 1;
        }
        return item;
      });
      return {
        listCart: [...incrementListCart],
        total: total + +action.value.price,
      };
    case "DECREASE_QUANTITY":
      const decrementListCart = listCart.map((item) => {
        if (item.product._id.$oid === action.value.id) {
          item.quantity = item.quantity - 1;
        }
        return item;
      });
      return {
        listCart: [...decrementListCart],
        total: total - +action.value.price,
      };

    default:
      return state;
  }
};

export default cartReducer;
