import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

export default function (node, options) {
  const instance = tippy(node, options);
  return {
    destory() {
      // @ts-ignore
      instance.destroy();
    },
  };
}
