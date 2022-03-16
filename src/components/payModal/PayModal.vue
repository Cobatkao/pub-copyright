<template>
  <div class="pay-modal-container">
    <div class="pay-form">
      <div class="pay-pancel">
        <p class="title">
          <img src="@/assets/images/ali_pay.svg" alt="" />支付宝 /
          <img src="@/assets/images/wechat_pay.svg" alt="" />微信 扫码付款
        </p>
        <!-- <p class="price">
          <span class="original"> 25￥ </span>
          <span class="current"> 9.9￥ </span>
        </p> -->
        <p class="tip">支付后将立即开始版权版权证据存证</p>
        <img
          class="close-btn"
          @click.stop="cancel"
          src="@/assets/images/close.svg"
          alt="装饰"
          title="关闭"
        />
        <div class="qr-code">
          <img :src="qrCodeUrl" @load="onImageLoaded" @error="onImageError" />
        </div>
        <!-- <p class="bonus-label">面包多补贴</p>
        <p class="bonus-content">
          当作品出售达到100元时，面包多将退还当前作品第一次证据存证的费用<a
            href="https://mianbaoduo.com/help/#/copyrightpro?id=面包多补贴"
            target="_blank"
            >了解详情
          </a>
        </p> -->
      </div>
    </div>
  </div>
</template>

<script>
import * as Fetch from "@/utils/request";
import generateQrcode from "@/utils/generateQrcode";
import config from "@/config";

export default {
  name: "PayModal",
  beforeDestroy() {
    this.clearPolling();
  },
  data() {
    return {
      order_id: "",
      id: "",
      maxPollingTimes: 40,
      currentTimes: 0,
      pollingIdArray: [],
      payState: 0,
      responseData: null,
    };
  },
  watch: {
    isPaid: function (flag) {
      flag && this.paySuccess();
    },
  },
  computed: {
    qrCodeUrl() {
      return generateQrcode(`${config.makeCodeUrl}${this.order_id}`);
    },
    isPaid() {
      return this.payState !== 0;
    },
  },
  methods: {
    async getCopyRightStatus(order_id) {
      await Fetch.post(`${config.fetchUrl}get_open_copyright`, {
        order_id,
      }).then(({ data }) => {
        if (data.length === 0) return this.$toast("该订单号下没有存证记录");
        this.responseData = data;
      });
    },
    paySuccess() {
      this.hideModal();
      this.$toast.success("付款成功");
    },
    pollingGetPayState() {
      const id = setInterval(() => {
        this.getPayState();
      }, 1500);
      this.pollingIdArray.push(id);
    },
    clearPolling() {
      this.currentTimes = 0;
      // eslint-disable-next-line no-restricted-syntax
      for (const key of this.pollingIdArray) {
        clearInterval(key);
      }
      this.pollingIdArray = [];
    },
    async getPayState() {
      this.currentTimes += 1;
      if (this.currentTimes === this.maxPollingTimes) {
        this.$toast.error("获取付款状态超时，刷新重试");
        this.hideModal();
        this.clearPolling();
        return;
      }
      try {
        await this.getCopyRightStatus(this.order_id);
        this.payState = this.responseData[0].state - 0;
      } catch (error) {
        this.$toast.error((error && error.message) || "获取付款状态失败");
        this.hideModal();
        this.clearPolling();
      }
    },
    onImageLoaded() {
      this.pollingGetPayState();
    },
    onImageError() {
      this.$toast.error("付款二维码生成失败，请刷新重试或");
    },
    show(cb) {
      this.cb = cb;
      return new Promise((resolve, reject) => {
        document.body.style.overflow = "hidden";
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    // 销毁弹窗
    hideModal() {
      typeof this.cb === "function" && this.cb();
      document.body.removeChild(this.$el);
      document.body.style.overflow = "";
      this.$destroy();
    },
    cancel() {
      this.hideModal();
    },
  },
};
</script>

<style lang="scss" scoped>
.pay-modal-container {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);

  .pay-form {
    position: relative;
    width: 318px;
    background-color: #fff;
    border-radius: 2px;
  }

  .pay-pancel {
    position: relative;
    padding: 22px;

    .price {
      text-align: right;
      margin-bottom: 8px;
      margin-top: 4px;

      & > span {
        display: inline-block;
      }

      .original {
        color: #4a4a4a;
        font-size: 14px;
        text-decoration: line-through;
        margin-right: 3px;
      }

      .current {
        color: #ff5c63;
        font-size: 18px;
        font-weight: bold;
      }
    }

    .title {
      margin-bottom: 8px;
      font-size: 18px;
      font-weight: 600;
      color: #333;

      img {
        display: inline-block;
        vertical-align: middle;
        width: 18px;
        margin-right: 5px;
      }
    }

    .tip {
      margin-top: 15px;
      font-size: 13px;
      color: $label-text-color;
    }

    .qr-code {
      display: inline-block;
      width: 100%;
      text-align: center;
      margin-top: 1rem;
      margin-bottom: 1rem;

      img {
        width: 180px !important;
        height: 180px !important;
        display: inline-block;
        vertical-align: middle;
      }
    }

    .bonus-label {
      text-align: center;
      color: $tip-text-color;
      font-size: 14px;
      margin-bottom: 0.25rem;
    }

    .bonus-content {
      color: $label-text-color;
      font-size: 13px;

      > a {
        color: $tip-text-color;
      }
    }

    .close-btn {
      display: inline-block;
      width: 18px;
      position: absolute;
      top: 22px;
      right: 22px;
      color: #bbb;
      font-weight: 600;
      cursor: pointer;

      &:hover {
        -webkit-transition-property: -webkit-transform;
        -webkit-transition-duration: 0.6s;
        -moz-transition-property: -moz-transform;
        -moz-transition-duration: 0.6s;
        -webkit-animation: rotate 0.6s linear infinite;
        -moz-animation: rotate 0.6s linear infinite;
        -o-animation: rotate 0.6s linear infinite;
        animation: rotate 0.6s linear infinite;
      }
    }
  }
}
</style>
