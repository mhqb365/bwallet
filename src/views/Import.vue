<template>
  <div>
    <div class="form-group">
      <label>Private key</label>
      <input v-model="privateKey" type="text" class="form-control" />
    </div>
    <button type="button" class="btn btn-primary" @click="savePrivateKey">
      <i class="fa fa-plus-square-o" aria-hidden="true"></i> Save
    </button>
  </div>
</template>

<script>
import tronWeb from "../configs/tronweb.config";

export default {
  name: "WalletImport",

  data() {
    return {
      privateKey: "",
      wallet: JSON.parse(localStorage.getItem("wallets")) || [],
    };
  },

  mounted() {
    // console.log(this.wallet);
  },

  methods: {
    savePrivateKey() {
      if (!this.privateKey)
        return this.$notify({ title: "Enter private key", type: "error" });
      const address = tronWeb.address.fromPrivateKey(this.privateKey);
      this.wallet.push({
        privateKey: this.privateKey,
        address,
      });
      localStorage.setItem("wallets", JSON.stringify(this.wallet));
      localStorage.setItem("selected", 0);
      this.privateKey = "";
      this.$notify("Success");
    },
  },
};
</script>

<style lang="scss" scoped></style>
