import classes from "./products-list.module.css";

const ProductsList = (props) => {
  const products = props.products;

  const productDetailHandler = (e) => {
    props.onShowDetail(e.target.dataset.id);
  };

  const item = products.map((item) => {
    // format VND
    const price = new Intl.NumberFormat("vi").format(Number(item.price));
    return (
      <div
        className={classes.item}
        key={item._id.$oid}
        style={{ width: props.width }}
      >
        <img
          src={item.img1}
          alt={item.category}
          data-id={item._id.$oid}
          onClick={productDetailHandler}
        />
        <div className={classes.name}>{item.name}</div>
        <div className={classes.price}>{price} VND</div>
      </div>
    );
  });

  return (
    <div className={classes["list-container"]} style={{ gap: props.gap }}>
      {item}
    </div>
  );
};
export default ProductsList;
