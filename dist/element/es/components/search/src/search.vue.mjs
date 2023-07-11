import { defineComponent as n, openBlock as o, createElementBlock as r, toDisplayString as c } from "vue";
const m = /* @__PURE__ */ n({
  name: "m-search",
  __name: "search",
  props: {
    column: {},
    type: {}
  },
  setup(e) {
    const t = e;
    return (p, a) => (o(), r("div", null, "我是搜索" + c(t.type), 1));
  }
});
export {
  m as default
};
