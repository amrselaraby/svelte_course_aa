<script>
  import { getContext, onMount } from "svelte";
  import { v4 as uuid } from "uuid";
  import formKey from "./form-key";
  export let name;
  export let type = "text";
  export let label = undefined;
  export let validate = undefined;
  let isDirty = false;
  const id = uuid();
  const formStore = getContext(formKey);

  onMount(() => {
    if (validate && validate($formStore.values[name])) {
      $formStore.errors[name] = validate($formStore.values[name], label);
    }
  });
</script>

<div class="field">
  {#if label}
    <label for={id}>{label}</label>
  {/if}
  <input
    {id}
    {name}
    {type}
    placeholder={label}
    value={$formStore.values[name] || ""}
    on:input={(e) => {
      isDirty = true;
      const value = e.currentTarget.value;
      console.log(validate(value));
      if (validate && validate(value)) {
        $formStore.errors[name] = validate(value, label);
      } else {
        delete $formStore.errors[name];
      }
      $formStore.values[name] = value;
    }}
  />
  {#if $formStore.errors[name] && (isDirty || $formStore.showErrors)}
    <p class="error">{$formStore.errors[name]}</p>
  {/if}
</div>

<style>
  div.field {
    margin-bottom: 10px;
  }
  p.error {
    color: red;
    font-size: 14px;
    margin: 5px 0 0;
  }
  label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
  }
  input {
    height: 30px;
    width: 250px;
    max-width: 100%;
  }
</style>
