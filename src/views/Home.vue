<template>
  <div class="home-ct">
    <header>
      <slogan />
      <router-link to="query" class="order-query">
        <span>订单查询</span>
      </router-link>
    </header>
    <div class="intro"></div>
    <div class="start">
      <router-link class="start-btn" to="/new">开始使用</router-link>
    </div>
    <div class="features">
      <div class="submit-area">
        <div class="features-label">
          <img
            src="@/assets/images/feature-1.png"
            srcset="@/assets/images/feature-1@2x.png 2x"
            alt="装饰"
            class="decoration desk"
          />
          <span>提交你的作品</span>
        </div>
        <div class="row">
          <span>支持文字、图片、视频、音频、软件包</span>
        </div>
        <div class="img"></div>
      </div>
      <div class="get-area">
        <div class="features-label">
          <img
            src="@/assets/images/feature-2.png"
            srcset="@/assets/images/feature-2@2x.png 2x"
            alt="装饰"
            class="decoration desk"
          />
          <span>获得公证处证书</span>
        </div>
        <div class="row">
          <span>权威机构盖章，可直接用于创作证明或法律诉讼</span>
        </div>
        <div class="img"></div>
      </div>
      <div class="more-area">
        <div class="features-label">
          <img
            src="@/assets/images/feature-3.png"
            srcset="@/assets/images/feature-3@2x.png 2x"
            alt="装饰"
            class="decoration desk"
          />
          <span>以及更多可信查询</span>
        </div>
        <div class="row">
          <span>公正云/最高法院/国家授时中心</span>
        </div>
        <div class="img"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Slogan from "@/components/Slogan";

export default {
  name: "Home",
  components: {
    Slogan,
  },
};
</script>

<style scoped lang="scss">
.home-ct {
  header {
    padding: 40px 110px 29px 60px;
    @include clearfix();
    .order-query {
      width: 184px;
      height: 50px;
      float: right;
      line-height: 50px;
      text-align: center;
      border-radius: 14px;
      text-decoration: none;
      cursor: pointer;
      &:hover {
        transition: all 0.3s;
        @include bordered($main-text-color, 2px);
      }
      @include bordered(#ededed, 2px);
      span {
        font-size: 18px;
        color: $pure-black;
        font-weight: bold;
        text-decoration: none;
      }
    }
  }
  .intro {
    width: 100%;
    height: 237px;
    margin-top: 29px;
    background-image: image-set(
      url("../assets/images/home.png") 1x,
      url("../assets/images/home@2x.png") 2x
    );
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;
  }
  .start {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-top: 72px;
    padding-bottom: 166px;
    .start-btn {
      width: 273px;
      height: 64px;
      font-size: 24px;
      line-height: 64px;
      text-decoration: none;
      text-align: center;
      font-weight: bold;
      color: $pure-white;
      background: $pure-black;
      cursor: pointer;
      @include border-radius(14px);
    }
  }
  .features {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      .features-label {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        img {
          display: inline-block;
          margin-right: 10px;
        }
        span {
          font-size: 24px;
          font-family: AlibabaPuHuiTi_2_85_Bold;
          color: $main-text-color;
          line-height: 33px;
          letter-spacing: 1px;
          font-weight: bold;
        }
      }
      .row {
        span {
          font-size: 18px;
          font-family: AlibabaPuHuiTi_2_85_Bold;
          color: #4a4a4a;
          line-height: 25px;
        }
      }
    }
    .submit-area {
      .img {
        display: inline-block;
        width: 324px;
        height: 89px;
        margin-top: 65px;
        background-image: image-set(
          url("../assets/images/submit.png") 1x,
          url("../assets/images/submit@2x.png") 2x
        );
        background-size: contain;
        background-repeat: no-repeat;
        cursor: pointer;
      }
    }
    .get-area {
      .img {
        display: inline-block;
        width: 324px;
        height: 89px;
        margin-top: 65px;
        background-image: image-set(
          url("../assets/images/get.png") 1x,
          url("../assets/images/get@2x.png") 2x
        );
        background-size: contain;
        background-repeat: no-repeat;
        cursor: pointer;
      }
    }
    .more-area {
      .img {
        display: inline-block;
        width: 324px;
        height: 89px;
        margin-top: 65px;
        background-image: image-set(
          url("../assets/images/search.png") 1x,
          url("../assets/images/search@2x.png") 2x
        );
        background-size: contain;
        background-repeat: no-repeat;
        cursor: pointer;
      }
    }
  }
}
</style>
