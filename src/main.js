import Vue from "vue";
import VueResource from "vue-resource";
import App from "./App.vue";
import { router } from "./router";
import { store } from "./store";
import "@/styles/loading.css";

Vue.use(VueResource);

// {{ purchase | currecny}}
Vue.filter("currency", (price) => {
  return (
    parseFloat(price).toLocaleString(undefined, { minimumFractionDigits: 2 }) +
    " ₺"
  );
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
