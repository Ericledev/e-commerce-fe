import { useSelector } from "react-redux";
import BannerShop from "../banner/BannerShop";
import BillingForm from "../checkout/billing-form";
import OrderDetail from "../checkout/order-detail";
import classes from "./CheckoutPage.module.css";
import useHTTP from "../hooks/use-http";
import { addNewOrder } from "../lib/api";

const CheckoutPage = () => {
  const cart = useSelector((state) => state.cartReducer);
  const { user } = useSelector((state) => state.logInReducer);
  const { data, error, sendRequest } = useHTTP(addNewOrder);
  const handleSubmitOrder = (user) => {
    // alert("am here");
    sendRequest({ user: user, cart: cart });
  };
  return (
    <div className={classes["checkout-container"]}>
      <BannerShop text={{ left: "CHECKOUT", path: "HOME / CART /" }} />
      <p>BILLING DETAILS</p>
      <div className={classes["billing-detail"]}>
        <div className={classes["billing-form"]}>
          <BillingForm user={user} onSubmit={handleSubmitOrder} />
        </div>
        <div className={classes["order-detail"]}>
          <OrderDetail cart={cart} />
        </div>
      </div>
    </div>
  );
};
export default CheckoutPage;
