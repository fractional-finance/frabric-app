<template>
<div class="container">
    <div class="columns">
        <div class="column">
          <OrderBook :orders="orders" :buy="true"/>
          <OrderBook :orders="orders" :buy="false"/>
        </div>
        <div class="column">
            <OrderPlacer/>
        </div>
    </div>
</div>

</template>

<script>
import { mapActions, mapGetters } from "vuex";
import OrderPlacer from "../views/dex/OrderPlacer.vue";
import OrderBook from "../views/dex/OrderBook.vue";

export default {
  name: "DEX",
  components: {
    OrderPlacer,
    OrderBook,
  },
  data() {
    return {
      orderBookMode: "buy",
    }
  },
  computed: {
    ...mapGetters({
      orders: "assetMarketOrders"
    }),
  },
  methods: {
    ...mapActions({
      fetchOrders: "fetchDexOrders",
    })
  },
  mounted() {
    const ASSET_ID = 0;
    this.fetchOrders({
      assetId: ASSET_ID,
    });
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/frabric-custom.scss";
@import "../../styles/_variables.sass";

h1, h2 {
    color: white;
    font-size: 32px;
    margin-bottom: 52px;
}

.has-gap {
    gap: 17px;
}

.is-simple-container {
    border-radius: 10px;
    border: 1px solid $mediumGray;
    padding: 23px 38px;
    margin-bottom: 30px;
}

.is-price-input {
    background: #2F2C38;
    border: none !important;
    border-radius: 15px;
    outline: none;
    display: block;
    width: 100%;
    margin: 15px 0px;
    padding: 18px 27px;
    font-size: 18px;
}

.has-small-flex-gap {
    gap: 17px;
}

.button {
    width: 100%;
    font-size: 22px;
    border-radius: 10px;
    color: white;
    font-weight: 600;
    border: none;
}

.buy-button {
    background: $mint;
}

.sell-button {
    background: $red;
}
</style>