<template>
  <div class="nav justify-content-center">
    <div class="btn-group">
      <button type="button" class="btn btn-primary" @click="goto('/')">
        <i class="fas fa-wallet"></i>
      </button>
      <button type="button" class="btn btn-warning" @click="goto('/send')">
        <i class="fas fa-paper-plane"></i>
      </button>
      <button type="button" class="btn btn-success" @click="goto('/select')">
        <i class="fa fa-cog" aria-hidden="true"></i>
      </button>
      <button type="button" class="btn btn-info" @click="goto('/import')">
        <i class="fas fa-plus"></i>
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
