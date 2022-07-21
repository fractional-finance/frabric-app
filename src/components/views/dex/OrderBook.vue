<template>
<div class="container">
    <h3>{{buy ? "Buy Orders" : "Sell Orders"}}</h3>
    <ul>
        <li
            v-for="order in ordersToShow"
            v-bind:key="order.id">
            <OrderListItem :order="order"/>
        </li>
    </ul>
</div>
</template>

<script>
import OrderListItem from "./OrderListItem.vue";
export default {
  name: "OrderBook",
  components: {
    OrderListItem,
  },
  computed: {
    ordersToShow: () => {
        this.props.orders.filter(order => order.type === 'buy');
    }
  },
  props: {
    buy: {
      type: Boolean,
      default: true,
    },
    orders: {
        type: Array,
    }
  }
}
</script>