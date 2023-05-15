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

export default {
  name: "WalletApp",

  components: { NavBar, PriceBar },

  mounted() {
    this.$store.dispatch("getPrice");
  },
};
</script>

<style>
#app {
  font-family: Courier New, monospace;
}
</style>
