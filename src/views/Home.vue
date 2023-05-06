<template>
  <div>
    <ul class="list-group text-center">
      <li class="list-group-item">
        <QRCodeVue3
          :value="this.wallet.address"
          :width="200"
          :height="200"
          :dotsOptions="{ type: 'square' }"
          :cornersSquareOptions="{ type: 'square' }"
        />
      </li>
      <li class="list-group-item">{{ silceAddress(wallet.address) }}</li>
      <li class="list-group-item">
        {{ wallet.balance.toLocaleString("en-US") }} TRX | ≈{{
          fiatBalance.toLocaleString("en-US")
        }}
        <select
          v-model="fiatSelected"
          @change="changeFiatSelected"
          style="border: none"
        >
          <option>USD</option>
          <option>VND</option>
        </select>
      </li>
      <li class="list-group-item">{{ wallet.bandwidth }} ⛽</li>
    </ul>
  </div>
</template>

<script>
import tronWeb from "../configs/tronweb.config";
import axios from "axios";
import QRCodeVue3 from "qrcode-vue3";

export default {
  name: "WalletHome",
  components: {
    QRCodeVue3,
  },

  data() {
    return {
      price: {},
      selected: localStorage.getItem("selected") || 0,
      wallets: JSON.parse(localStorage.getItem("wallets")) || {},
      wallet: {
        privateKey: "",
        address: "",
        balance: 0,
        bandwidth: 0,
      },
      fiatSelected: localStorage.getItem("fiatSelected") || "USD",
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
    if (!this.wallets[0]) alert("Not have wallet, please import first");
    this.wallet.privateKey = this.wallets[this.selected].privateKey;
    this.wallet.address = tronWeb.address.fromPrivateKey(
      this.wallets[this.selected].privateKey
    );
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
  },
};
</script>

<style lang="scss" scoped></style>