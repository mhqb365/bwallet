import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Notifications from "@kyvg/vue3-notification";
import VueClipboard from "vue3-clipboard";
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      wallets: JSON.parse(localStorage.getItem("wallets")) || [],
      price: {},
    };
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
  .use(VueClipboard, {
    autoSetContainer: true,
    appendToBody: true,
  })
  .mount("#app");
