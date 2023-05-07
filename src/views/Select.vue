<template>
  <div>
    <div v-for="(wallet, index) in wallets">
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
  </div>
</template>

<script>
export default {
  name: "WalletSelect",

  data() {
    return {
      selected: Number(localStorage.getItem("selected")) || 0,
      wallets: JSON.parse(localStorage.getItem("wallets")),
    };
  },

  mounted() {
    if (!this.wallets)
      return this.$notify({
        title: "Not have wallet, please import first",
        type: "error",
      });
  },

  methods: {
    changeSelected(e) {
      // console.log(e.target.id);
      localStorage.setItem("selected", e.target.id);
    },
  },
};
</script>

<style lang="scss" scoped></style>
