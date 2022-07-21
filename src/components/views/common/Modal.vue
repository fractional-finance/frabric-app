<template>
    <div class="modal is-active">
    <div class="modal-background" @click="$emit('closeModal')"></div>
    <div class="modal-content modal-content-container">
        <div class="box has-background-darkNavy has-radius-lg">
        <h3 class="title has-text-mediumBlue is-size-3">{{ title }}</h3>
            <slot></slot>
        </div>
    </div>
    </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    title: {
      type: String,
      required: false,
    },
  },
}
</script>

<style scoped>

  .box {
    padding: 40px;
  }

  .modal-background {
    background: black;
    opacity: 0.6;
    backdrop-filter: blur(20px);
  }
  .modal-content-container {
    width: unset;
    max-width: 1167px;
    font-family: 'Poppins', sans-serif;
}
</style>