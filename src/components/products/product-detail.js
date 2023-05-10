import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputOrderedProducts from "../UI/InputOrderedProducts";
import classes from "./product-detail.module.css";
// import { saveToLocalStore } from "../../store/cart-reducer";

const ProductDetail = (props) => {
  const product = props.product;
  // console.log("CHECK PROPS produtt: ", product);
  const [img, setImg] = useState(0);

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
            <img
              className={classes.img1}
              src={product.images[img]}
              alt={product.name}
            />
          </div>
          <div className={classes.small}>
            <img
              className={classes.img2}
              src={product.images[0]}
              onClick={changeImageHandler}
              data-img="0"
              alt={product.name}
            />
            <img
              className={classes.img3}
              src={product.images[1]}
              onClick={changeImageHandler}
              data-img="1"
              alt={product.name}
            />
            <img
              className={classes.img4}
              src={product.images[2]}
              onClick={changeImageHandler}
              data-img="2"
              alt={product.name}
            />
            <img
              className={classes.img5}
              src={product.images[3]}
              onClick={changeImageHandler}
              data-img="3"
              alt={product.name}
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
