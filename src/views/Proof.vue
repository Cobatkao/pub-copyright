<template>
  <div class="proof-ct">
    <header>
      <slogan />
    </header>
    <div v-if="visible" class="title">
      <span class="back" @click="$router.go(-1)">
        <img src="@/assets/images/left.svg" alt="装饰" title="关闭" />
      </span>
      <span class="title-text"
        >原创保护文件PRO / {{ detail.memo || "未命名" }}</span
      >
    </div>
    <div class="divider"></div>
    <div class="main" v-if="visible">
      <div class="lf">
        <div class="row">
          <span class="label">作品名称</span>
          <div class="content">{{ detail.memo }}</div>
        </div>
        <div class="row">
          <span class="label">存证主体</span>
          <div class="content">{{ detail.cert_name }}</div>
        </div>
        <div class="row">
          <span class="label">登记时间</span>
          <div v-if="detail && detail.create_time" class="content">
            {{ formatDate(detail.create_time) || "未提供" }}
          </div>
        </div>
        <div class="row">
          <span class="label">统一证据编号</span>
          <div class="content over-h">{{ detail.tx_hash }}</div>
        </div>
        <div class="row">
          <span class="label">作品指纹</span>
          <div class="copyable-text">
            <div class="content over-h">
              {{ detail.file_hash }}
            </div>
            <span class="copy" @click="copyAction(detail.file_hash)">复制</span>
          </div>
        </div>
        <div class="row">
          <span class="label">时间戳认证标识</span>
          <div class="copyable-text">
            <div class="content over-h">{{ detail.sn || "/" }}</div>
            <span class="copy" @click="copyAction(detail.sn)">复制</span>
          </div>
        </div>
        <div class="row">
          <span class="label">时间戳认证存证</span>
          <div class="copyable-text">
            <div class="content over-h">{{ detail.ctsr || "/" }}</div>
            <span class="copy" @click="copyAction(detail.ctsr)">复制</span>
          </div>
        </div>
        <div class="cutter"></div>
        <div class="operate-btns">
          <button class="download-file" @click="downCertificate">
            下载公正文件
          </button>
          <button class="download-pack">下载证据包</button>
        </div>
      </div>
      <div class="rt">
        <div class="certificate">
          <iframe
            v-if="detail && detail.certificate_url"
            width="100%"
            height="450"
            scrolling="no"
            frameBorder="0"
            :src="`${detail && detail.certificate_url}#page=1&toolbar=0`"
          >
            当前浏览器不支持PDF预览，请点击下方预览证书或使用Chrome浏览器进行
          </iframe>
        </div>
        <div class="func-btns">
          <button class="help">获得帮助</button>
          <a
            v-if="detail.certificate_url"
            :href="detail.certificate_url"
            target="_blank"
            class="preview"
            >预览证书</a
          >
        </div>
        <ul class="mentions">
          <li><span>最高法核验地址: https://sfl.cour.com</span></li>
          <li><span>公证云核验地址: https://sfl.cour.com</span></li>
          <li><span>国家授时中心核验地址: https://sfl.cour.com</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import * as Fetch from "@/utils/request";
import config from "@/config";
import dayjs from "dayjs";
import downloadFile from "@/utils/download";

import Slogan from "@/components/Slogan";

const store = require("store");

export default {
  name: "Proof",
  components: {
    Slogan,
  },
  data() {
    return {
      detail: null,
      visible: false,
    };
  },
  beforeDestroy() {
    store.remove("proof");
  },
  async created() {
    // await this.fetchProofDetail();
    this.visible = false;
    this.detail = store.get("proof");
    if (this.detail) {
      this.visible = true;
    } else {
      this.$toast.error("数据获取失败");
    }
  },
  methods: {
    downCertificate() {
      if (!this.detail.certificate_url)
        return this.$toast.error("证书地址出错，无certificate_url");
      downloadFile(this.detail.certificate_url, "公证文件");
    },
    copyAction(val = "") {
      this.$copyText(val).then(() => {
        this.$toast("已复制到粘贴板");
      });
    },
    fetchProofDetail() {
      Fetch.post(`${config.fetchUrl}get_open_copyright`, {
        order_id: this.$route.query.order_id,
      }).then(({ data }) => {
        this.detail = data;
        if (data.length === 0) {
          this.$toast("该订单号下没有存证记录");
        }
      });
    },
    formatDate(time) {
      return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
    },
  },
};
</script>

<style scoped lang="scss">
.proof-ct {
  header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 44px 110px 29px 41px;
    margin-bottom: 60px;
    position: relative;
    .slogan {
      position: absolute;
      left: 60px;
      top: 40px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      min-width: 242px;
      height: 56px;
      background: $pure-white;
      box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.12);
      border-radius: 43px;
      .slogan-text {
        color: $main-text-color;
        font-size: 15px;
        font-weight: bold;
        white-space: nowrap;
      }
      img {
        display: inline-block;
        width: 38px;
        height: 38px;
      }
    }
  }
  .title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    max-width: 1000px;
    margin: 0 auto;
    text-align: center;
    .back {
      display: inline-block;
      margin-right: 20px;
      font-size: 28px;
      color: $label-text-color;
      font-weight: bold;
      cursor: pointer;
      img {
        display: inline-block;
        color: $plain-text-color;
        width: 20px;
        height: 20px;
        vertical-align: middle;
      }
    }
    .title-text {
      font-size: 28px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #191919;
      line-height: 40px;
    }
  }
  .divider {
    width: 100%;
    height: 1px;
    margin-top: 26px;
    margin-bottom: 35px;
    background-color: #f2f2f2;
  }
  .main {
    display: flex;
    justify-content: space-between;
    max-width: 1000px;
    margin: 0 auto;
    .lf {
      width: 600px;
      height: 715px;
      padding: 30px;
      background: #ffffff;
      @include border-radius(10px);
      @include bordered(#edeef0, 1px);
      .row {
        text-align: left;
        margin-bottom: 27px;
        .label {
          display: inline-block;
          font-size: 14px;
          font-family: PingFangHK-Semibold, PingFangHK;
          font-weight: 600;
          color: $label-text-color;
          line-height: 20px;
          margin-bottom: 10px;
        }
        .copyable-text {
          display: flex;
          justify-content: space-between;
          .copy {
            display: inline-block;
            white-space: nowrap;
            margin-left: 30px;
            color: $button-copy-button;
            text-decoration: underline;
            font-weight: bold;
            cursor: pointer;
          }
        }
        .content {
          font-size: 18px;
          font-family: PingFangHK-Semibold, PingFangHK;
          font-weight: 600;
          color: $plain-text-color;
          line-height: 25px;
        }
      }
      .cutter {
        width: 100%;
        height: 1px;
        margin-top: 30px;
        margin-bottom: 30px;
        background-color: #f2f2f2;
      }
      .operate-btns {
        display: flex;
        justify-content: space-between;
        align-items: center;
        button {
          width: 256px;
          height: 44px;
          line-height: 44px;
          text-align: center;
          @include border-radius(14px);
          font-weight: bold;
          border: none;
          outline: none;
          cursor: pointer;
          &.download-pack {
            background-color: $pure-white;
            color: $pure-black;
            @include bordered(#edeef0, 1px);
          }
          &.download-file {
            color: $pure-white;
            background-color: $pure-black;
          }
        }
      }
    }
    .rt {
      .certificate {
        margin-bottom: 1.5rem;
        > * {
          border: none;
        }
      }
      .func-btns {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
        button,
        a {
          width: 160px;
          height: 40px;
          line-height: 39px;
          font-weight: bold;
          text-align: center;
          color: $func-button-color;
          background-color: $func-button-bg;
          @include border-radius(14px);
          border: none;
          outline: none;
          cursor: pointer;
          &.preview {
            text-decoration: none;
          }
        }
      }
      .mentions {
        display: flex;
        flex-direction: column;
        width: 340px;
        height: 121px;
        background: $pure-white;
        @include border-radius(10px);
        @include bordered(#edeef0, 1px);
        li {
          flex: 1;
          font-size: 14px;
          font-family: PingFangHK-Medium, PingFangHK;
          font-weight: 500;
          color: $plain-text-color;
          line-height: 20px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-left: 13px;
          &:not(:last-child) {
            border-bottom: 1px solid #edeef0;
          }
        }
      }
    }
  }
}
</style>
