<template>
  <div class="py-2">
    <div class="clearfix">
      <span class="float-left small">
        TRX:
        {{ $store.state.price.usd }} USD ({{
          $store.state.price.change24h > 0
            ? "+" + $store.state.price.change24h
            : $store.state.price.change24h
        }})
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BwalletPriceBar",
};
</script>
