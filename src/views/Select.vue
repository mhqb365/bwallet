<template>
  <div>
    <div v-for="(wallet, index) in wallets" class="mb-3">
      <div class="form-check-inline">
        <label class="form-check-label">
          <input
            type="radio"
            class="form-check-input"
            name="optradio"
            :checked="selected === index"
            :id="index"
            @change="changeSelected"
          />
          {{ wallet.address }}
        </label>
      </div>
    </div>

    <button type="button" class="btn btn-danger" @click="resetWallet">
      <i class="fas fa-trash"></i> Reset
    </button>
  </div>
</template>

<script>
export default {
  name: "WalletSelect",

  data() {
    return {
      wallets: this.$store.state.wallets,
      selected: this.$store.state.selected,
    };
  },

  mounted() {
    if (!this.wallets) return;
  },

  methods: {
    changeSelected(e) {
      // console.log(e.target.id);
      localStorage.setItem("selected", e.target.id);
      this.$store.dispatch("getSelected");
    },
    resetWallet() {
      localStorage.clear();
      window.location.href = "/";
    },
  },
};
</script>
