<template>
  <div class="slogan">
    <img src="@/assets/images/logo.png" alt="面包多" />
    <span class="slogan-text"> mianbaoduo.com 出品 </span>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.slogan {
  position: absolute;
  left: 60px;
  top: 40px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  min-width: 242px;
  height: 56px;
  background: $pure-white;
  box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.12);
  border-radius: 43px;
  .slogan-text {
    color: $main-text-color;
    font-size: 16px;
    font-weight: bold;
    white-space: nowrap;
  }
  img {
    display: inline-block;
    width: 38px;
    height: 38px;
  }
}
</style>
