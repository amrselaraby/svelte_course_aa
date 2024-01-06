<script>
  import Button from "./lib/Button.svelte";
  import FaAngellist from "svelte-icons/fa/FaAngellist.svelte";
  import FaAllergies from "svelte-icons/fa/FaAllergies.svelte";
</script>

<Button size="large" shadow on:click|once={() => alert(true)} disabled>
  <div let:isLeftHovered style:width="20px" slot="leftContent">
    {#if isLeftHovered}
      <FaAngellist />
    {:else}
      <FaAllergies />
    {/if}
  </div>
  Some Text
</Button>

<style>
</style>
