<script>
  import Konva from "konva";
  import { onDestroy, onMount, setContext } from "svelte";
  import { stageKey } from "./context.keys";
  //   export let width;
  //   export let height;

  $: if (stage) stage.setAttrs($$props);
  let container;
  let stage;
  setContext(stageKey, {
    getStage: () => stage,
  });
  onMount(() => {
    stage = new Konva.Stage({
      container,
      ...$$props,
    });
  });
  onDestroy(() => {
    if (stage) stage.destroy();
  });
</script>

<div bind:this={container}>
  {#if stage}
    <slot />
  {/if}
</div>
