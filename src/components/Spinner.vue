<template>
  <img
    class="spin"
    :class="{
      light: type === 'light',
      dark: type === 'dark',
      primary: type === 'primary',
    }"
    src="@/assets/images/loader.svg"
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
  width: 16px;
  height: 16px;
  vertical-align: middle;
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
