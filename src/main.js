import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Notifications from "@kyvg/vue3-notification";
import VueClipboard from "vue3-clipboard";

createApp(App)
  .use(router)
  .use(Notifications)
  .use(VueClipboard, {
    autoSetContainer: true,
    appendToBody: true,
  })
  .mount("#app");
