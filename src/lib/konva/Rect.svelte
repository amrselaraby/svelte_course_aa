<script>
  import Konva from "konva";
  import { getContext, onDestroy } from "svelte";

  import { layerKey } from "./context.keys";

  //   export let x = undefined;
  //   export let y = undefined;
  //   export let fill = undefined;
  //   export let width = undefined;
  //   export let height = undefined;
  //   export let stroke = undefined;
  //   export let strokeWidth = undefined;
  const rect = new Konva.Rect($$props);
  $: rect.setAttrs($$props);
  const layer = getContext(layerKey);

  onDestroy(() => {
    rect.destroy();
  });
  layer.add(rect);
</script>
