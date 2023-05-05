import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputOrderedProducts from "../UI/InputOrderedProducts";
import classes from "./product-detail.module.css";
// import { saveToLocalStore } from "../../store/cart-reducer";

const ProductDetail = (props) => {
  const product = props.product[0];
  // console.log("CHECK PROPS produtt: ", product);
  const [img, setImg] = useState("img1");

  const quantityRef = useRef();

  // using redux to add product to cart
  const total = useSelector((state) => state.cartReducer.total);
  const dispatch = useDispatch();
  console.log("CHECK REDUX TOTAL: ", total);

  // handle onClick small image
  const changeImageHandler = (e) => {
    setImg(e.target.dataset.img);
  };

  // format feature of product
  let featureArr = [];
  if (product.long_desc.includes("•")) {
    featureArr = product.long_desc.split("•");
  } else {
    featureArr = product.long_desc.split("-");
  }
  const featureHead = <p>{featureArr.shift()}</p>;
  const features = featureArr.map((item) => <p>- {item}</p>);

  // handle "Add to Cart"
  const addToCartHandler = () => {
    dispatch({
      type: "ADD_CART",
      value: { quantity: +quantityRef.current.dataset.value, product: product },
    });
    alert(`The product is added to cart`);
    // saveToLocalStore();
  };
  return (
    <>
      <div className={classes["detail-container"]}>
        {/* Image of product */}
        <div className={classes.image}>
          <div className={classes.large}>
            <img className={classes.img1} src={product[img]} alt="" />
          </div>
          <div className={classes.small}>
            <img
              className={classes.img2}
              src={product.img2}
              onClick={changeImageHandler}
              data-img="img2"
              alt=""
            />
            <img
              className={classes.img3}
              src={product.img3}
              onClick={changeImageHandler}
              data-img="img3"
              alt=""
            />
            <img
              className={classes.img4}
              src={product.img4}
              onClick={changeImageHandler}
              data-img="img4"
              alt=""
            />
            <img
              className={classes.img5}
              src={product.img1}
              onClick={changeImageHandler}
              data-img="img1"
              alt=""
            />
          </div>
        </div>
        {/* Content of product */}
        <div className={classes.content}>
          <h2 className={classes.title}>{product.name}</h2>
          <div className={classes.price}>
            {new Intl.NumberFormat("vi").format(product.price)} VND
          </div>
          <p className={classes.desc}>{product.short_desc}</p>
          <div className={classes.category}>
            CATEGORY: <span>{product.category}</span>
          </div>
          <div className={classes["add-to-cart"]}>
            <label>QUANTITY</label>
            <InputOrderedProducts ref={quantityRef} quantity={1} />
            <button onClick={addToCartHandler}>Add to cart</button>
          </div>
        </div>
      </div>
      <div className={classes.feature}>
        <button>DESCRIPTION</button>
        <div className={classes.description}>PRODUCT DESCRIPTION</div>
        <div className={classes["description-feature"]}>
          {featureHead}
          {features}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
