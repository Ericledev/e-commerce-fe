import classes from "./order-detail.module.css";

const OrderDetail = (props) => {
  const { total, listCart } = props.cart;

  const orderList = listCart.map((item) => {
    return (
      <div className={classes["list-order"]}>
        <label className={classes["name"]}>{item.product.name}</label>
        <label className={classes["price-quantity"]}>
          {Intl.NumberFormat("vi").format(item.product.price)} VND x{" "}
          {item.quantity}
        </label>
      </div>
    );
  });

  return (
    <div className={classes["order-detail-container"]}>
      <p>YOUR ORDER</p>
      {orderList}
      <div className={classes["order-detail-footer"]}>
        <label>TOTAL</label>
        <label>{Intl.NumberFormat("vi").format(total)} VND</label>
      </div>
    </div>
  );
};
export default OrderDetail;
