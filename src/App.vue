<template>
  <div class="container">
    <notifications position="right" />
    <Navbar />
    <router-view class="py-2 pt-3" />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "WalletApp",
  components: { Navbar },
};
</script>

<style>
#app {
  font-family: Courier New, monospace;
}
</style>
