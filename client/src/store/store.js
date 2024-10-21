import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductReducer from "./admin/product-slice";
import shopProductReducer from "./shop/product-slice";
import shopCartReducer from "./shop/cart-slice";
import addressReducer from "./shop/address-slice";
import orderReducer from "./shop/order-slice";
import adminOrderReducer from "./admin/order-slice";
import searchReducer from "./shop/search-slice";
import reviewReducer from "./shop/review-slice";
import sliderReducer from "./admin/slider-slice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductReducer,
    shopProducts: shopProductReducer,
    cartItems: shopCartReducer,
    address: addressReducer,
    order: orderReducer,
    adminOrder: adminOrderReducer,
    search: searchReducer,
    review: reviewReducer,
    slider: sliderReducer,
  },
});

export default store;
