<template>
  <div>
    <div class="form-group">
      <label>Private key</label>
      <input v-model="privateKey" type="text" class="form-control" />
    </div>
    <button type="button" class="btn btn-primary" @click="savePrivateKey">
      Save
    </button>
  </div>
</template>

<script>
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
      if (!this.privateKey) return alert("Enter private key");
      this.wallet.push({
        privateKey: this.privateKey,
      });
      localStorage.setItem("wallets", JSON.stringify(this.wallet));
      localStorage.setItem("selected", 0);
      this.privateKey = "";
      alert("Success");
    },
  },
};
</script>

<style lang="scss" scoped></style>
