<template>
  <div class="container">
    <notifications position="right" />
    <PriceBar />
    <router-view class="py-2 pt-3" />
    <NavBar class="px-3" />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import PriceBar from "./components/PriceBar.vue";
import axios from "axios";

export default {
  name: "WalletApp",

  components: { NavBar, PriceBar },

  mounted() {
    this.getPrice();
  },

  methods: {
    async getPrice() {
      const { data } = await axios.get(
        "https://api-dashboard.mhqb365.com/price"
      );
      // console.log(data);
      this.price = data;
      this.$store.commit("updatePrice", data);
    },
  },
};
</script>

<style>
#app {
  font-family: Courier New, monospace;
}
</style>
