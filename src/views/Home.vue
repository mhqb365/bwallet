<template>
  <div>
    <div class="text-center mb-4">
      <QRCodeVue3
        :value="wallets[selected].address"
        :width="200"
        :height="200"
        :dotsOptions="{ type: 'square' }"
        :cornersSquareOptions="{ type: 'square' }"
      />
    </div>

    <ul class="list-group text-center">
      <li class="list-group-item">
        {{ silceAddress(wallets[selected].address) }}
        <button
          type="button"
          v-clipboard:copy="wallets[selected].address"
          v-clipboard:success="copySuccess"
          class="btn btn-sm mx-1"
        >
          <i class="fas fa-copy"></i>
        </button>
        <a
          :href="explorer + '/#/address/' + wallets[selected].address"
          target="_blank"
        >
          <button type="button" class="btn btn-sm mx-1">
            <i class="fas fa-external-link-square-alt"></i>
          </button>
        </a>
      </li>
      <li class="list-group-item">
        {{ balance.toLocaleString("en-US") }} TRX
        <button v-if="loading" type="button" class="btn btn-sm mx-1">
          <i class="fas fa-sync fa-spin"></i>
        </button>
        <button v-else type="button" class="btn btn-sm mx-1" @click="update">
          <i class="fas fa-sync"></i>
        </button>
      </li>
      <li class="list-group-item small">
        ≈{{ fiatBalance.toLocaleString("en-US") }}
        <select
          v-model="fiatSelected"
          @change="changeFiatSelected"
          class="select-fiat"
        >
          <option>USD</option>
          <option>VND</option>
        </select>
      </li>
      <li class="list-group-item small">
        {{ bandwidth }}
        <i class="fas fa-fire-alt"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import tronWeb from "../configs/tronweb.config";
import QRCodeVue3 from "qrcode-vue3";
import EXPLORER from "../configs/explorer.config";

export default {
  name: "WalletHome",
  components: {
    QRCodeVue3,
  },

  data() {
    return {
      loading: false,
      wallets: JSON.parse(localStorage.getItem("wallets")),
      selected: Number(localStorage.getItem("selected")) || 0,
      balance: 0,
      bandwidth: 0,
      fiatSelected: localStorage.getItem("fiatSelected") || "USD",
      explorer: EXPLORER,
    };
  },

  computed: {
    price() {
      return this.$store.state.price;
    },
    fiatBalance() {
      let fiatBal = 0;
      if (this.fiatSelected === "USD") fiatBal = this.balance * this.price.usd;
      for (const item in this.price.fiatRate) {
        if (this.fiatSelected === this.price.fiatRate[item].symbol)
          fiatBal =
            this.balance * this.price.usd * this.price.fiatRate[item].rate;
      }
      return fiatBal;
    },
  },

  mounted() {
    if (!this.wallets)
      return this.$notify({
        title: "Not have wallet, please import first",
        type: "error",
      });
    this.getBalance(this.wallets[this.selected].address);
  },

  methods: {
    async getBalance(address) {
      try {
        this.loading = true;
        this.balance = await tronWeb.trx.getBalance(address);
        this.balance = Number(tronWeb.fromSun(this.balance));
        this.bandwidth = await tronWeb.trx.getBandwidth(address);
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    silceAddress(address) {
      return address.slice(0, 5) + "..." + address.slice(-4);
    },
    changeFiatSelected(e) {
      localStorage.setItem("fiatSelected", e.target.value);
    },
    copySuccess() {
      this.$notify("Copy success");
    },
    update() {
      this.getBalance(this.wallets[this.selected].address);
    },
  },
};
</script>

<style scoped>
.select-fiat {
  background-color: white;
  border: none;
}
</style>
