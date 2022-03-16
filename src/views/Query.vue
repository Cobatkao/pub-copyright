<template>
  <div class="query-ct">
    <header>
      <div class="slogan">
        <img src="@/assets/images/logo.png" />
        <span class="slogan-text"> mianbaoduo.com 出品 </span>
      </div>
      <div class="main"></div>
    </header>
    <div class="divider" />
    <div class="query">
      <div class="query-row">
        <div class="lf">
          <img
            src="@/assets/images/category.png"
            srcset="@/assets/images/category@2x.png 2x"
            alt="装饰"
            class="decoration desk"
          />
          <span class="text">订单查询</span>
        </div>
        <div class="md">
          <input
            type="text"
            v-autowidth="{
              maxWidth: '540px',
              minWidth: '540px',
              comfortZone: 0,
            }"
            v-model="orderId"
            placeholder="输入订单号"
          />
          <button @click="startQuery">查询</button>
        </div>
        <div class="rt">
          <a class="how-text">
            如何找到订单号
            <img
              src="@/assets/images/question.png"
              srcset="@/assets/images/question@2x.png 2x"
              alt="装饰"
              class="decoration desk"
            />
          </a>
        </div>
      </div>
    </div>
    <div class="result">
      <div v-for="item in resList" :key="item.id" class="item">
        <div class="item-tp">
          <div class="status-dot" />
          <div class="time">2019.08.29 14:30:23</div>
        </div>
        <div class="item-md">
          <span class="product-name">{{ item.memo || "未命名" }}</span>
        </div>
        <div class="item-bt">
          <div class="lf">
            <p class="type">文件类型：{{ item.file_type | fileType }}</p>
            <p class="id">{{ item.order_id }}</p>
          </div>
          <div class="rt">
            <button class="check" @click="jumpProof(item)">
              <span>查看证据</span> <spinner v-if="loading" type="dark" />
            </button>
            <button class="download">
              <img
                @click.stop="cancel"
                src="@/assets/images/download.svg"
                alt="装饰"
                title="关闭"
              />
            </button>
          </div>
        </div>
      </div>
      <!-- <p class="empty" v-else>未找到查询记录</p> -->
    </div>
  </div>
</template>

<script>
import * as Fetch from "@/utils/request";
import config from "@/config";
import dayjs from "dayjs";

const Spinner = () => import("@/components/Spinner");

const store = require("store");

export default {
  name: "Query",
  components: {
    Spinner,
  },
  data() {
    return {
      id: "",
      orderId: null,
      resList: [],
      loading: false,
    };
  },
  filter: {
    fileType(str) {
      switch (str) {
        case "VIDEO":
          return "视频";
        case "TXT":
          return "TXT文件";
        case "IMAGE":
          return "图片";
        default:
          return "ZIP压缩文件";
      }
    },
  },
  methods: {
    jumpProof(item) {
      this.loading = true;
      if (store.get("proof")) {
        store.remove("proof");
      }
      store.set("proof", item);
      setTimeout(() => {
        this.$router.push({
          path: "/proof",
          query: {
            order_id: this.orderId,
          },
        });
      }, 1200);
    },
    startQuery() {
      Fetch.post(`${config.fetchUrl}get_open_copyright`, {
        order_id: this.orderId,
      }).then(({ data }) => {
        this.resList = data;
        if (data.length === 0) {
          this.$toast("该订单号下没有存证记录");
        }
      });
    },
    formatDate(time) {
      return dayjs(time).format("YYYY-MM-DD");
    },
  },
};
</script>

<style scoped lang="scss">
.query-ct {
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
  .query {
    display: flex;
    justify-content: space-between;
    width: 1000px;
    padding-top: 59px;
    margin: 0 auto;
    .query-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      .lf {
        display: flex;
        align-items: center;
        img {
          display: inline-block;
          width: 18px;
          margin-right: 8px;
        }
        .text {
          font-size: 22px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: $pure-black;
          line-height: 28px;
        }
      }
      .md {
        margin: 0 20px 0 22px;
        button {
          width: 84px;
          height: 40px;
          margin-left: -4px;
          line-height: 40px;
          text-align: center;
          color: $pure-white;
          background: $pure-black;
          border-radius: 5px;
          font-weight: bold;
          outline: none;
          border: none;
          cursor: pointer;
        }
        input {
          height: 40px;
          line-height: 40px;
          padding-left: 15px;
          background: $pure-white;
          border-radius: 5px;
          @include bordered(#edeef0, 1px);
        }
      }
      .rt {
        .how-text {
          display: flex;
          align-items: center;
          color: $button-copy-button;
          font-weight: bold;
          cursor: pointer;
          text-decoration: underline;
          img {
            display: inline-block;
            width: 16px;
            margin-left: 3px;
          }
        }
      }
    }
  }
  .result {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 1000px;
    margin: 0 auto;
    .empty {
      margin: 0 auto;
      padding: 180px;
      color: $main-text-color;
      font-size: 18px;
    }
    .item {
      padding-top: 30px;
      padding-bottom: 30px;
      border-bottom: 1px solid #f2f2f2;
      .item-tp {
        display: flex;
        justify-content: space-between;
        margin-bottom: 11px;
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #2faf62;
        }
        .time {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #9b9b9b;
          line-height: 17px;
        }
      }
      .item-md {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 20px;
        .product-name {
          font-size: 18px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #000000;
          line-height: 22px;
        }
      }
      .item-bt {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        .lf {
          .type {
            margin-bottom: 6px;
          }
          p {
            text-align: left;
            font-size: 16px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: $label-text-color;
            line-height: 20px;
          }
        }
        .rt {
          display: flex;
          justify-content: flex-end;
          button {
            cursor: pointer;
          }
          .check {
            padding: 0 10px;
            height: 30px;
            margin-right: 14px;
            line-height: 30px;
            text-decoration: none;
            background: #f2f2f2;
            border-radius: 15px;
            border: 1px solid #f2f2f2;
            span {
              color: $main-text-color;
            }
          }
          .download {
            width: 28px;
            height: 28px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: $main-text-color;
            border-radius: 50%;
            background: #f2f2f2;
            border: none;
            outline: none;
            img {
              display: inline-block;
              width: 14px;
              height: 14px;
              color: #191919;
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
}
</style>
