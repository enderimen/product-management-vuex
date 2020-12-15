import Vue from "vue";
import ProductList from "@/components/ProductList";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: ProductList },
  {
    path: "/urun-islemleri",
    component: () =>
      import(
        /* webpackChunkName: "product-purchase" */ "@/components/ProductPurchase"
      ),
  },
  {
    path: "/urun-cikisi",
    component: () =>
      import(/* webpackChunkName: "product-sell" */ "@/components/ProductSell"),
  },
  { path: "*", redirect: "/" },
];

export const router = new VueRouter({
  mode: "history",
  routes,
});
