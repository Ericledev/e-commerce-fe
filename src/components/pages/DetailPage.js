import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useHTTP from "../hooks/use-http";
import { getProducts } from "../lib/api";
import ProductDetail from "../products/product-detail";
import ProductsList from "../products/products-list";
import classes from "./DetailPage.module.css";
import { useNavigate } from "react-router-dom";
const DetailPage = () => {
  const idProduct = useParams(); // return object {productId: parameter}
  const { data, error, status, sendRequest } = useHTTP(getProducts);
  const navigate = useNavigate();
  useEffect(() => {
    sendRequest(); //idProduct.productId
  }, [sendRequest]);

  // filter the detail of product by id
  let productDetail = [];
  if (!error && data && data.length > 0) {
    productDetail = data.filter((item) => item._id === idProduct.productId);
  }

  // filter related products
  let productsRelated = [];
  if (!error && data && data.length > 0) {
    productsRelated = data
      .filter((item) => item.category === productDetail[0].category)
      .filter((item) => item._id !== idProduct.productId);
  }
  // navigate to detail page
  const showDetailHandler = (id) => {
    navigate(`/detail/${id}`);
  };
  return (
    <div className={classes["detail-page-container"]}>
      {/* Section product-detail */}
      {status === "pending" && <p>Loading...</p>}
      {status === "completed" && error && <p>{error}</p>}
      <section className={classes["product-detail"]}>
        {productDetail.length > 0 && (
          <ProductDetail product={productDetail[0]} />
        )}
      </section>
      {/* Section product-related */}
      <section className={classes["product-related"]}>
        <div className={classes.related}>RELATED PRODUCTS</div>
        {productsRelated.length > 0 && (
          <ProductsList
            products={productsRelated}
            onShowDetail={showDetailHandler}
          />
        )}
      </section>
    </div>
  );
};
export default DetailPage;
