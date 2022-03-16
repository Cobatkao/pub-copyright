<template>
  <div class="process-ct">
    <header>
      <div class="slogan">
        <img src="@/assets/images/logo.png" />
        <span class="slogan-text"> mianbaoduo.com 出品 </span>
      </div>
      <div class="main"></div>
    </header>
    <div class="divider" />
    <div class="form">
      <div class="lf">
        <div class="row">
          <p class="label">姓名</p>
          <input
            type="text"
            v-autowidth="{
              maxWidth: '633px',
              minWidth: '633px',
              comfortZone: 0,
            }"
            v-model="name"
            placeholder="请输入创作者姓名"
          />
        </div>
        <div class="row">
          <p class="label">手机号码</p>
          <input
            type="number"
            v-autowidth="{
              maxWidth: '633px',
              minWidth: '633px',
              comfortZone: 0,
            }"
            v-model="phone"
            @blur="onNumberInputBlur"
            placeholder="请输入创作者手机号"
          />
        </div>
        <div class="row">
          <p class="label">身份证号</p>
          <input
            type="text"
            v-autowidth="{
              maxWidth: '633px',
              minWidth: '633px',
              comfortZone: 0,
            }"
            v-model="idCardNum"
            @blur="onInputBlur"
            placeholder="请输入创作者身份证"
          />
        </div>
        <div class="row">
          <p class="label">作品名称</p>
          <input
            type="text"
            v-autowidth="{
              maxWidth: '633px',
              minWidth: '633px',
              comfortZone: 0,
            }"
            v-model="productname"
            placeholder="请输入作品名称"
          />
        </div>
        <div class="row">
          <p class="how label">
            <span>作品指纹</span>
            <a class="how-text">
              如何获得
              <img
                src="@/assets/images/question.png"
                srcset="@/assets/images/question@2x.png 2x"
                alt="装饰"
                class="decoration desk"
              />
            </a>
          </p>
          <input
            type="text"
            v-autowidth="{
              maxWidth: '633px',
              minWidth: '633px',
              comfortZone: 0,
            }"
            v-model="fingerprint"
            placeholder="请输入作品指纹"
          />
        </div>
        <div class="start row">
          <button @click="startProcess" :class="{ disabled: hasSaved }">
            开始存证 <spinner-icon v-if="loading" type="primary" />
          </button>
        </div>
      </div>
      <div class="rt">
        <div class="tp box">
          <div class="tip">特别提醒</div>
          <p>
            严禁上传他人著作权作品、以及违法、反动、危害社会公共安全等不良信息，否则可能会被国家机构直接追责。
          </p>
        </div>
        <div class="bt box">
          <p>
            1.存证类型为全文，即会将你的作品全文生成文本文件，并将之作为存证文件
          </p>
          <p>2.存证类型为数字内容，则会将数字内容作为存证文件</p>
          <p>
            3.目前仅开放原创文艺作品、文学作品、课程使用，其他类目请等待我们后续计划。
          </p>
          <a class="more">
            了解更多
            <img
              src="@/assets/images/more.png"
              srcset="@/assets/images/more@2x.png 2x"
              alt="装饰"
              class="decoration desk"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Fetch from "@/utils/request";
import config from "@/config";
const SpinnerIcon = () => import("@/components/Spinner");

export default {
  name: "Process",
  coponents: {
    SpinnerIcon,
  },
  data() {
    return {
      loading: false,
      hasSaved: false,
      name: "",
      phone: "",
      idCardNum: "",
      productname: "",
      fingerprint: "",
      idCardReg: new RegExp(
        /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/
      ),
      phoneReg: new RegExp(/^(?:(?:\+|00)86)?1[3-9]\d{9}$/),
      isIdValid: false,
      isPhoneValid: false,
      order_id: null,
    };
  },
  methods: {
    onNumberInputBlur() {
      this.isPhoneValid = this.phoneReg.test(this.phone);
      if (!this.isPhoneValid) {
        this.$toast("请输入正确的手机号");
      }
    },
    onInputBlur() {
      this.isIdValid = this.idCardReg.test(this.idCardNum);
      if (!this.isIdValid) {
        this.$toast("请输入正确的身份证号");
      }
    },
    startProcess() {
      if (this.hasSaved) return this.$toast.warning("请勿重复保存");
      if (
        !this.name ||
        !this.phone ||
        !this.idCardNum ||
        !this.productname ||
        !this.fingerprint
      )
        return this.$toast.warning("请完善存证信息");
      if (!this.isIdValid) return this.$toast.warning("请输入正确的身份证");
      if (!this.isPhoneValid)
        return this.$toast.warning("请输入正确的手机号码");
      this.loading = true;
      Fetch.post(`${config.fetchUrl}open_pre_create`, {
        cert_name: this.name,
        cert_no: this.idCardNum,
        file_hash: this.fingerprint,
        file_length: 2048,
        memo: this.productname,
        phone: this.phone,
        file_type: "ZIP",
      })
        .then(({ info, order_id }) => {
          this.order_id = order_id;
          this.loading = false;
          this.hasSaved = true;
          if (info === "ok") {
            this.$toast.success("存证保存成功，正在唤起支付");
            setTimeout(() => {
              this.$payModal({ order_id, id: null });
            }, 800);
          } else {
            this.$toast.error("存证保存失败");
          }
        })
        .catch((error) => {
          this.loading = false;
          console.warn(error && error.message);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.process-ct {
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
    .main {
      width: 701px;
      height: 166px;
      background-image: image-set(
        url("../assets/images/query.png") 1x,
        url("../assets/images/query@2x.png") 2x
      );
      background-size: contain;
      background-repeat: no-repeat;
      cursor: pointer;
    }
  }
  .divider {
    width: 100%;
    height: 1px;
    background-color: #dddddd;
  }
  .form {
    display: flex;
    justify-content: space-between;
    width: 1000px;
    padding-top: 59px;
    margin: 0 auto;
    .lf {
      .row {
        margin-bottom: 24px;
        &.start {
          display: flex;
          justify-content: left;
        }
        button {
          width: 160px;
          height: 45px;
          margin-top: 26px;
          font-weight: bold;
          color: $pure-white;
          text-align: center;
          line-height: 45px;
          background: #000000;
          border-radius: 14px;
          cursor: pointer;
          border: 1px solid #191919;
        }
        .label {
          text-align: left;
          font-size: 14px;
          font-family: PingFangHK-Semibold, PingFangHK;
          font-weight: bold;
          color: $label-text-color;
          line-height: 20px;
          margin-bottom: 11px;
          &.how {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .how-text {
              display: flex;
              align-items: center;
              color: $button-copy-button;
              cursor: pointer;
              img {
                display: inline-block;
                width: 16px;
                margin-left: 3px;
              }
            }
          }
        }
        input {
          height: 50px;
          padding-left: 20px;
          line-height: 50px;
          background: $pure-white;
          border-radius: 5px;
          @include bordered(#edeef0, 1px);
        }
      }
    }
    .rt {
      margin-left: 30px;
      .box {
        background: $tip-bg;
        border-radius: 10px;
        padding: 20px;
        margin-bottom: 20px;
        position: relative;
        .more {
          position: absolute;
          left: 20px;
          bottom: 20px;
          color: $tip-text-color;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          img {
            display: inline-block;
            width: 10px;
          }
        }
        .tip {
          color: $pure-white;
          width: 77px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          margin-bottom: 20px;
          background: $tip-text-color;
        }
        p {
          margin-bottom: 20px;
          text-align: left;
          font-size: 14px;
          font-weight: bold;
          font-family: AlibabaPuHuiTi_2_85_Bold;
          color: #4a4a4a;
          line-height: 24px;
          letter-spacing: 1px;
        }
        &.tp {
          width: 337px;
          height: 161px;
        }
        &.bt {
          width: 337px;
          height: 311px;
        }
      }
    }
  }
}
</style>
