import { useDispatch, useSelector } from "react-redux";
import classes from "./CartPage.module.css";
import BannerShop from "../banner/BannerShop";
import CartTable from "../cart/cart-table";
import CartTotal from "../cart/cart-total";
import { useEffect } from "react";

const CartPage = () => {
  const cart = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "ACTIVE_CART_PAGE" });
  }, [dispatch]);

  // console.log("CHECK listCart: ", cart.listCart);
  // console.log("Check total: ", cart.total);
  return (
    <div className={classes["cart-container"]}>
      <BannerShop text={{ left: "Cart", right: "Cart" }} />
      <div className={classes["shopping-cart"]}>SHOPPING CART</div>
      <div className={classes["cart-content"]}>
        <div className={classes["cart-table-container"]}>
          <CartTable cart={cart} />
        </div>
        <div className={classes["cart-total"]}>
          <CartTotal price={cart.total} />
        </div>
      </div>
    </div>
  );
};
export default CartPage;
