import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Notifications from "@kyvg/vue3-notification";
import VueClipboard from "vue3-clipboard";
import { createStore } from "vuex";
import axios from "axios";
import VueMobileDetection from "vue-mobile-detection";

const store = createStore({
  state() {
    return {
      wallets: JSON.parse(localStorage.getItem("wallets")) || [],
      selected: Number(localStorage.getItem("selected")) || 0,
      price: {
        fiatRate: [],
        change24h: 0,
        usd: 0,
      },
    };
  },
  actions: {
    async getWallets(context) {
      const wallets = JSON.parse(localStorage.getItem("wallets"));
      context.commit("updateWallets", wallets);
    },
    async getSelected(context) {
      const selected = Number(localStorage.getItem("selected"));
      context.commit("updateSelected", selected);
    },
    async getPrice(context) {
      const { data } = await axios.get(
        "https://api-dashboard.mhqb365.com/price"
      );
      // console.log(data);
      context.commit("updatePrice", data);
    },
  },
  mutations: {
    updateWallets(state, wallets) {
      state.wallets = wallets;
    },
    updateSelected(state, selected) {
      state.selected = selected;
    },
    updatePrice(state, price) {
      state.price = price;
    },
  },
});

createApp(App)
  .use(store)
  .use(router)
  .use(Notifications)
  .use(VueMobileDetection)
  .use(VueClipboard, {
    autoSetContainer: true,
    appendToBody: true,
  })
  .mount("#app");
