<script>
  import Counter from "./lib/Counter.svelte";

  let props = {
    initialCount: 5,
    maxCount: 10,
  };
</script>

<Counter {...props} x="y" />

<style>
</style>
