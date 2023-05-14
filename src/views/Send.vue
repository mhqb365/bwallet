<template>
  <div>
    <div class="form-group">
      <label>To</label>
      <input v-model="to" type="text" class="form-control" />
    </div>
    <div class="form-group">
      <label>Amount</label>
      <input v-model="amount" type="number" class="form-control" />
    </div>
    <button type="button" class="btn btn-primary" @click="send">
      <i class="fas fa-paper-plane"></i> Send
    </button>
  </div>
</template>

<script>
import tronWeb from "../configs/tronweb.config";

export default {
  name: "WalletSend",

  data() {
    return {
      wallets: this.$store.state.wallets,
      selected: Number(localStorage.getItem("selected")) || 0,
      to: "",
      amount: 0,
    };
  },

  mounted() {},

  methods: {
    async send() {
      if (!this.to)
        return this.$notify({
          title: "Enter receiving address",
          type: "error",
        });
      if (!this.amount || this.amount <= 0)
        return this.$notify({ title: "Enter amount to send", type: "error" });
      const balance = await tronWeb.trx.getBalance(
        this.wallets[this.selected].address
      );
      if (this.amount >= balance)
        return this.$notify({ title: "Insufficient balance", type: "error" });

      await tronWeb.setPrivateKey(this.wallets[this.selected].privateKey);
      await tronWeb.trx.sendTransaction(
        this.to,
        tronWeb.toSun(Number(this.amount).toFixed(6))
      );
      this.$notify("Success");
    },
  },
};
</script>

<style lang="scss" scoped></style>
