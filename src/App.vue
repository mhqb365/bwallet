<template>
  <div class="container-fluid py-2">
    <notifications position="center" />
    <Navbar />
    <router-view />
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
