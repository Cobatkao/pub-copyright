<template>
  <div class="proof-ct">
    <header>
      <div class="slogan">
        <img src="@/assets/images/logo.png" />
        <span class="slogan-text"> mianbaoduo.com 出品 </span>
      </div>
    </header>
    <div class="title">
      <span class="back" @click="$router.go(-1)">
        <img src="@/assets/images/left.svg" alt="装饰" title="关闭" />
      </span>
      <span class="title-text">原创保护文件PRO / 文件1</span>
    </div>
    <div class="divider"></div>
    <div class="main">
      <div class="lf">
        <div class="row">
          <span class="label">作品名称</span>
          <div class="content">正面切图</div>
        </div>
        <div class="row">
          <span class="label">存证主体</span>
          <div class="content">沈腾</div>
        </div>
        <div class="row">
          <span class="label">登记时间</span>
          <div class="content">2021-04-13 23:27:32</div>
        </div>
        <div class="row">
          <span class="label">统一证据编号</span>
          <div class="content over-h">00038157813937987hc8cdcbb</div>
        </div>
        <div class="row">
          <span class="label">作品指纹</span>
          <div class="copyable-text">
            <div class="content over-h">
              ojdedkhdkjeldjewkdjlk8309840dkhqwekdhkqwjojdedkhdkjeldjewkdjlk8309840dkhqwekdhkqwjojdedkhdkjeldjewkdjlk8309840dkhqwekdhkqwjojdedkhdkjeldjewkdjlk8309840dkhqwekdhkqwj
            </div>
            <span class="copy" @click="copyAction()">复制</span>
          </div>
        </div>
        <div class="row">
          <span class="label">时间戳认证标识</span>
          <div class="copyable-text">
            <div class="content over-h">wdyig8723d8237y9832ue2389</div>
            <span class="copy" @click="copyAction()">复制</span>
          </div>
        </div>
        <div class="row">
          <span class="label">时间戳认证凭证</span>
          <div class="copyable-text">
            <div class="content over-h">
              wdyig8723d8237y9832ue2389wqdwqdnlwqjdwjwdyig8723d8237y9832ue2389wqdwqdnlwqjdwjwdyig8723d8237y9832ue2389wqdwqdnlwqjdwjwdyig8723d8237y9832ue2389wqdwqdnlwqjdwjwdyig8723d8237y9832ue2389wqdwqdnlwqjdwj
            </div>
            <span class="copy" @click="copyAction()">复制</span>
          </div>
        </div>
        <div class="cutter"></div>
        <div class="operate-btns">
          <button class="download-file">下载公正文件</button>
          <button class="download-pack">下载证据包</button>
        </div>
      </div>
      <div class="rt">
        <img src="" alt="" class="sample" />
        <div class="func-btns">
          <button class="help">获得帮助</button>
          <button class="preview">预览证书</button>
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
export default {
  name: "Proof",
  methods: {
    copyAction(val = "") {
      console.log("val", val);
      this.$copyText(val).then(() => {
        this.$toast("已复制到粘贴板");
      });
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
      .sample {
        display: inline-block;
        vertical-align: center;
        width: 340px;
        height: 494px;
        margin-bottom: 30px;
      }
      .func-btns {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
        button {
          width: 160px;
          height: 40px;
          line-height: 38px;
          font-weight: bold;
          text-align: center;
          color: $func-button-color;
          background-color: $func-button-bg;
          @include border-radius(14px);
          border: none;
          outline: none;
          cursor: pointer;
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
