<script>
  export let size = "small";
  export let shadow = false;
  export let bgColor = undefined;
  export let textColor = undefined;
  let isLeftHovered = false;
  // export let disabled = false;
</script>

<button
  on:click
  {...$$restProps}
  style:background-color={bgColor}
  style:color={textColor}
  class:size-sm={size === "small"}
  class:size-lg={size === "large"}
  class:shadow
>
  {#if $$slots.leftContent}
    <div
      class="left-content"
      on:mouseenter={() => (isLeftHovered = true)}
      on:mouseleave={() => (isLeftHovered = false)}
    >
      <slot name="leftContent" {isLeftHovered} />
    </div>
  {/if}
  <slot {isLeftHovered}>Fallback</slot>
</button>

<style lang="scss">
  button {
    display: flex;
    align-items: center;
    border: none;
    background-color: #ff3e00;
    color: white;

    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    .left-content {
      margin-right: 10px;
    }
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    &:hover {
      background-image: linear-gradient(rgba(0, 0, 0, 0.4) 0 0);
    }
    &:active {
      background-image: linear-gradient(rgba(255, 255, 255, 0.1) 0 0);
    }
    &.size-sm {
      padding: 15px 20px;
    }
    &.size-lg {
      padding: 20px 25px;
      font-size: 20px;
    }
    &.shadow {
      box-shadow: 0 0 10px rgba($color: #fff, $alpha: 0.3);
    }
  }
</style>
