import Vue from "vue";
import { api } from "@/api";
import { router } from "@/router";

const state = {
  products: [],
};

const getters = {
  getProducts(state) {
    return state.products;
  },
  getProduct(state) {
    return (productKey) =>
      state.products.filter((product) => product.key === productKey);
  },
};

const mutations = {
  // add new product to products
  updateProductList(state, product) {
    state.products.push(product);
  },
};

const actions = {
  initApp({ commit }) {
    Vue.http.get(`${api.baseUrl}products.json`).then((response) => {
      let data = response.data;

      for (let key in data) {
        data[key].key = key;
        commit("updateProductList", data[key]);
      }
    });
  },
  saveProduct({ commit, dispatch }, product) {
    Vue.http.post(`${api.baseUrl}products.json`, product).then((response) => {
      product.key = response.data.name;
      commit("updateProductList", product);

      let tradeResult = {
        purchase: product.price,
        sale: 0,
        count: product.count,
      };

      dispatch("setTradeResult", tradeResult);
      router.replace("/");
    });
  },
  sellProduct({ state, dispatch }, payload) {
    const product = state.products.filter(
      (product) => product.key === payload.key
    );

    const totalCount = product[0].count - payload.count;

    if (product) {
      Vue.http
        .patch(`${api.baseUrl}products/${payload.key}.json`, {
          count: totalCount,
        })
        .then(() => {
          product[0].count = totalCount;

          const tradeResult = {
            purchase: 0,
            sale: product[0].price,
            count: payload.count,
          };

          dispatch("setTradeResult", tradeResult);
          router.replace("/");
        });
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
