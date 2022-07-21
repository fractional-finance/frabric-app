<template>
<div class="columns">
    <div class="column is-one-quarter is-flex">
        <Blockies :seed="address"/>
    </div>
    <div class="column is-one-quarter">

    </div>
    <div class="column is-one-quarter">

    </div>
    <div class="column is-one-quarter">

    </div>
</div>
</template>

<script>
export default {
  name: "OrderListItem",
  computed: {

  },
  props: {
    order: {
      type: Object,
    }
  },
}
</script>