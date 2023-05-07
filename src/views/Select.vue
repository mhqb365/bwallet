<template>
  <div></div>
</template>

<script>
export default {
  name: "WalletSelect",

  data() {
    return {
      wallets: JSON.parse(localStorage.getItem("wallets")),
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
