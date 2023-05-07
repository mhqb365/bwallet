<template>
  <div>
    <div class="text-center mb-3">
      <QRCodeVue3
        :value="this.wallet.address"
        :width="200"
        :height="200"
        :dotsOptions="{ type: 'square' }"
        :cornersSquareOptions="{ type: 'square' }"
      />
    </div>

    <ul class="list-group text-center">
      <li class="list-group-item">
        {{ silceAddress(wallet.address) }}
        <button
          type="button"
          v-clipboard:copy="wallet.address"
          v-clipboard:success="copySuccess"
          class="btn btn-sm mx-1"
        >
          ❏
        </button>
        <a :href="explorer + '/#/address/' + wallet.address" target="_blank">
          <button type="button" class="btn btn-sm mx-1">↗</button>
        </a>
      </li>
      <li class="list-group-item">{{ wallet.balance }} TRX</li>
      <li class="list-group-item small">
        ≈{{ fiatBalance.toLocaleString("en-US") }}
        <select
          v-model="fiatSelected"
          @change="changeFiatSelected"
          style="border: none"
        >
          <option>USD</option>
          <option>VND</option>
        </select>
      </li>
      <li class="list-group-item small">{{ wallet.bandwidth }} ⛽</li>
    </ul>
  </div>
</template>

<script>
import tronWeb from "../configs/tronweb.config";
import axios from "axios";
import QRCodeVue3 from "qrcode-vue3";
import EXPLORER from "../configs/explorer.config";

export default {
  name: "WalletHome",
  components: {
    QRCodeVue3,
  },

  data() {
    return {
      price: {},
      selected: Number(localStorage.getItem("selected")) || 0,
      wallets: JSON.parse(localStorage.getItem("wallets")),
      wallet: {
        privateKey: "",
        address: "",
        balance: 0,
        bandwidth: 0,
      },
      fiatSelected: localStorage.getItem("fiatSelected") || "USD",
      explorer: EXPLORER,
    };
  },

  computed: {
    fiatBalance() {
      let fiatBal = 0;
      if (this.fiatSelected === "USD")
        fiatBal = this.wallet.balance * this.price.usd;
      for (const item in this.price.fiatRate) {
        if (this.fiatSelected === this.price.fiatRate[item].symbol)
          fiatBal =
            this.wallet.balance *
            this.price.usd *
            this.price.fiatRate[item].rate;
      }
      return fiatBal;
    },
  },

  mounted() {
    this.getPrice();
    // console.log(this.wallets);
    if (!this.wallets)
      return this.$notify({
        title: "Not have wallet, please import first",
        type: "error",
      });
    this.wallet = this.wallets[this.selected];
    this.getBalance(this.wallet.address);
  },

  methods: {
    silceAddress(address) {
      return address.slice(0, 5) + "..." + address.slice(-4);
    },
    async getPrice() {
      const { data } = await axios.get(
        "https://api-dashboard.mhqb365.com/price"
      );
      // console.log(data);
      this.price = data;
    },
    async getBalance(address) {
      this.wallet.balance = await tronWeb.trx.getBalance(address);
      this.wallet.balance = Number(tronWeb.fromSun(this.wallet.balance));
      this.wallet.bandwidth = await tronWeb.trx.getBandwidth(address);
    },
    changeFiatSelected(e) {
      localStorage.setItem("fiatSelected", e.target.value);
    },
    copySuccess() {
      this.$notify("Copy success");
    },
  },
};
</script>

<style lang="scss" scoped></style>
