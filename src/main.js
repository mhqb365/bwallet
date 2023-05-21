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
      price: {},
    };
  },
  actions: {
    async getPrice(context) {
      const { data } = await axios.get(
        "https://api-dashboard.mhqb365.com/price"
      );
      // console.log(data);
      context.commit("updatePrice", data);
    },
  },
  mutations: {
    updateWallets(state) {
      state.wallets = JSON.parse(localStorage.getItem("wallets"));
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
