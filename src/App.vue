<template>
  <div class="container py-4">
    <notifications position="center" />
    <Navbar class="mb-3" />
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

<style lang="scss" scoped></style>
