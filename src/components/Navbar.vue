<template>
  <div class="fixed-bottom py-3">
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <router-link to="/" class="nav-link">
          Wallet
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/send" class="nav-link">
          Send
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/select" class="nav-link">
          Select
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/import" class="nav-link">
          Import
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "WalletNavbar",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
