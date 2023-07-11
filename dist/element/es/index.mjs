import * as o from "./components/index.mjs";
import { Search as a } from "./components/search/index.mjs";
const t = {
  install: (e) => {
    for (const r in o)
      e.use(o[r]);
  }
};
export {
  a as Search,
  t as default
};
