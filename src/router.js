import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Send from "./views/Send.vue";
import Select from "./views/Select.vue";
import Import from "./views/Import.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/send",
      component: Send,
    },
    {
      path: "/select",
      component: Select,
    },
    {
      path: "/import",
      component: Import,
    },
  ],
});

export default router;
