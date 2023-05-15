<template>
  <div class="fixed-bottom nav justify-content-center py-3">
    <div class="btn-group shadow">
      <button type="button" class="btn btn-primary" @click="goto('/')">
        <i class="fas fa-wallet"></i> Wallet
      </button>
      <button type="button" class="btn btn-warning" @click="goto('/send')">
        <i class="fas fa-paper-plane"></i> Send
      </button>
      <button type="button" class="btn btn-success" @click="goto('/select')">
        <i class="fa fa-cog" aria-hidden="true"></i> Select
      </button>
      <button type="button" class="btn btn-info" @click="goto('/import')">
        <i class="fas fa-plus"></i> Import
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "WalletNavbar",

  methods: {
    goto(path) {
      this.$router.push({ path });
    },
  },
};
</script>
