import Vue from "vue";
import payModal from "@/components/payModal/PayModal";

let componentInstance = null;

let ModalConstructor = Vue.extend(payModal);

function createModal(options) {
  componentInstance = new ModalConstructor();
  // 合并选项
  Object.assign(componentInstance, options);
  document.body.appendChild(componentInstance.$mount().$el);
}

function caller(options) {
  // 单例 全局只存在一个登录弹窗
  if (!componentInstance) {
    createModal(options);
    // 该show方法与组件内的show方法一致  传入的callback在组件销毁时调用
    // 由于手动挂载的组件无法获取原型上的方法 这里需要手动传入上下文ctx
    return componentInstance.show(() => {
      componentInstance = null;
    });
  }
}

export default {
  install(Vue) {
    // 调起登录弹窗，方法返回Promise  then为登录成功  catch为关闭弹窗
    Vue.prototype.$payModal = caller;
  },
};
