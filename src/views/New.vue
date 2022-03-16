<template>
  <div class="process-ct">
    <header>
      <slogan />
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
            <a class="how-text" @click.stop="triggerCalculate">
              点击计算作品指纹
              <img
                src="@/assets/images/click.svg"
                alt="点击"
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
        <div class="row" v-if="isInputVisible">
          <div
            class="drop-zone"
            @click="$refs.uploader.click()"
            @dragover.stop.prevent
            @drop.stop.prevent="onFilesDrop"
          >
            <div>
              <img src="@/assets/images/product.svg" alt="" />
              <p>点击或拖动文件，最大1.5GB</p>
            </div>
          </div>

          <input
            ref="uploader"
            class="hidden"
            type="file"
            multiple
            @change="onFilesSelect"
          />
        </div>
        <div class="row" v-if="isInputVisible">
          <p class="label">作品指纹计算结果</p>
          <ul v-if="fileQueue.length > 0" class="file-quene">
            <li v-for="({ file, sha256 }, i) in fileQueue" :key="i">
              <span label>{{ file.name }}</span> |
              <span>{{ getFileSize(file.size) }}</span> |
              <span>Type: {{ getFileType(file.name) }}</span> |
              <span>Time spent: {{ sha256.timeSpent.toFixed(2) }}s</span> |
              <br />
              <span
                v-if="sha256.completed"
                @click.stop="copyAction(sha256.hash)"
                style="color: #6362ff; cursor: pointer"
                >SHA256: {{ sha256.hash }}</span
              >
              <span v-else>
                <span>`%{{ sha256.progress }}`</span>
              </span>
            </li>
          </ul>
          <p class="un-selected" v-else>未选择任何文件</p>
        </div>
        <div class="start row">
          <button
            class="start"
            @click="startProcess"
            :class="{ disabled: hasSaved }"
          >
            开始存证 <spinner-icon v-if="loading" type="light" />
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
import { mapActions, mapGetters } from "vuex";

const SpinnerIcon = () => import("@/components/Spinner");
import Slogan from "@/components/Slogan";

const MAX_FILE_SIZE = 1024 * 1024 * 1024 * 1.5; // 1.5 GB

export default {
  name: "Process",
  components: {
    SpinnerIcon,
    Slogan,
  },
  data() {
    return {
      isInputVisible: false,
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
      fileSizeParam: 0,
      fileTypeParam: "ZIP",
    };
  },
  computed: {
    ...mapGetters(["fileQueue"]),
  },
  methods: {
    ...mapActions(["addFiles"]),
    checkFileType(suffix) {
      var result = "";
      // 匹配txt
      result = ["png", "jpg", "jpeg", "bmp", "gif", "svg", "WebP"].some(
        function (item) {
          return item == suffix;
        }
      );
      if (result) {
        result = "IMAGE";
        return result;
      }
      // 匹配txt
      result = ["txt"].some(function (item) {
        return item == suffix;
      });
      if (result) {
        result = "TXT";
        return result;
      }
      // 匹配 视频
      var videolist = [
        "mpeg4",
        "mp4",
        "m2v",
        "mkv",
        "rmvb",
        "avi",
        "flv",
        "mkv",
        "wmv",
        "mp3",
        "wav",
        "ogg",
        "flv",
        "swf",
        "webm",
        "mov",
      ];
      result = videolist.some(function (item) {
        return item == suffix;
      });
      if (result) {
        result = "VIDEO";
        return result;
      }
      // 其他 文件类型
      result = "ZIP";
      return result;
    },
    getFileType(value) {
      const _type = String(value).split(".").pop().toUpperCase();
      // 文件类型，为 IMAGE ，TXT，VIDEO，ZIP 任一，如果不是前三者则都为 ZIP
      this.fileTypeParam = this.checkFileType(
        (_type && _type.toLowerCase()) || ""
      );
      return _type;
    },
    getFileSize(bytes) {
      if (bytes === 0) return "0 B";
      var k = 1000, // or 1024
        sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        i = Math.floor(Math.log(bytes) / Math.log(k)),
        no = (bytes / Math.pow(k, i)).toPrecision(3);
      var _size = no + " " + sizes[i];
      this.fileSizeParam = no * 1024;
      return _size;
    },
    scrollTo(node) {
      document.querySelector(node).scrollIntoView({
        behavior: "smooth",
      });
    },
    triggerCalculate() {
      this.isInputVisible = !this.isInputVisible;
      this.$nextTick(() => {
        this.scrollTo(".start");
      });
    },
    copyAction(val = "") {
      this.$copyText(val).then(() => {
        this.$toast("已复制到粘贴板");
      });
    },
    validateAndAdd(files) {
      const validFiles = files.filter((file) => {
        if (file.size < MAX_FILE_SIZE) return true;
        this.$toast.warning(`File '${file.name}' is ignored (> 1.5 GB)`);
        return false;
      });
      console.log(validFiles);
      this.addFiles(validFiles);
    },
    onFilesSelect() {
      const files = Array.from(this.$refs.uploader.files || []);
      this.$refs.uploader.value = "";
      this.validateAndAdd(files);
    },
    onFilesDrop(e) {
      const files = Array.from(e.dataTransfer.files || []);
      this.validateAndAdd(files);
    },
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
        file_length: this.fileSizeParam,
        memo: this.productname,
        phone: this.phone,
        file_type: this.fileTypeParam,
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
        .file-quene {
          li {
            text-align: left;
          }
        }
        .un-selected {
          padding: 15px 0;
        }
        .hidden {
          display: none !important;
        }
        .drop-zone {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 220px;
          cursor: pointer;
          background: #f1f3f7;
          border: 3px dashed #8590a6;
          border-radius: 20px;
          &:hover {
            transition: all 0.25s;
            border-color: $func-button-bg;
          }
          p {
            font-size: 18px;
            margin-top: 15px;
            color: #8590a6;
          }
          img {
            display: inline-block;
            width: 48px;
            color: #8590a6;
            vertical-align: middle;
          }
        }
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
                width: 24px;
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
