<template>
  <i
    class="spin awesome-font-loader"
    :class="{
      light: type === 'light',
      dark: type === 'dark',
      primary: type === 'primary',
    }"
  />
</template>

<script>
export default {
  name: "SpinnerIcon",
  props: {
    type: {
      required: false,
      default: "primary",
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes move {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.spin {
  display: inline-block;
  animation: move 0.65s infinite linear;

  &.light {
    color: #ffffff;
  }

  &.dark {
    color: #909399;
  }

  &.primary {
    color: #fdab0e;
  }
}
</style>
