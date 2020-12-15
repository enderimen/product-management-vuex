import Vue from "vue";
import { api } from "@/api";

export const setTradeResult = ({ state, commit }, tradeResult) => {
  commit("updateTradeResult", tradeResult);

  let tradeData = {
    purchase: state.purchase,
    sale: state.sale,
  };

  Vue.http
    .put(api.baseUrl + "trade-result.json", tradeData)
    .then((response) => {
      console.log(response);
    });
};

export const getTradeResult = ({ commit }) => {
  Vue.http.get(api.baseUrl + "trade-result.json").then((response) => {
    commit("updateTradeResult", response.data);
  });
};
