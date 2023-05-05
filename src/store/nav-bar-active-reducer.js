const initialNavBar = {
  homePage: false,
  shopPage: false,
  cartPage: false,
  loginPage: false,
};

const navBarActiveReducer = (state = initialNavBar, action) => {
  switch (action.type) {
    case "ACTIVE_HOME_PAGE":
      return {
        homePage: true,
        shopPage: false,
        cartPage: false,
        loginPage: false,
      };
    case "ACTIVE_SHOP_PAGE":
      return {
        homePage: false,
        shopPage: true,
        cartPage: false,
        loginPage: false,
      };
    case "ACTIVE_CART_PAGE":
      //   console.log("before active");
      return {
        homePage: false,
        shopPage: false,
        cartPage: true,
        loginPage: false,
      };
    case "ACTIVE_LOGIN_PAGE":
      return {
        homePage: false,
        shopPage: false,
        cartPage: false,
        loginPage: true,
      };
    default:
      return state;
  }
};
export default navBarActiveReducer;
