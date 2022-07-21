<template>
  <div>
    <button type="button" @click="onClick" :class="classes">
      {{ label }}
    </button>
  </div>
</template>

<script>
export default {
  name: "Button",

  props: {
    label: {
      type: String,
      required: false,
    },
    isPrimary: {
      type: Boolean,
      default: true,
    },
    extraClasses: {
      type: String,
      default: "",
    },
  },

  computed: {
    classes() {
      return `
        button
        ${this.isPrimary ? "is-primary" : ""}
        ${this.isMint ? "has-background-mint" : ""}
        ${this.extraClasses}
      `;
    },
  },

  methods: {
    onClick() {
      this.$emit("onClick");
    },
  },
};
</script>