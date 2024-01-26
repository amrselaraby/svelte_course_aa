<script>
  import settings from "../stores/settings";
  import direction from "../stores/direction";
</script>

<h2>Settings</h2>

<button
  on:click={() => {
    settings.toggleColorScheme();
  }}>Toggle color scheme</button
>
<button
  on:click={() => {
    settings.updateSetting("language", Math.random());
  }}>Update Language</button
>

<button
  on:click={() => {
    settings.reset();
  }}>Reset Settings</button
>
<br />
{$direction}
<br />
{$settings.colorScheme}
<br />
{$settings.language}
<br />
<label for="colorScheme">
  <input
    type="radio"
    name="colorScheme"
    value="dark"
    bind:group={$settings.colorScheme}
  /> Dark
</label>

<label for="colorScheme">
  <input
    type="radio"
    name="colorScheme"
    value="light"
    bind:group={$settings.colorScheme}
  /> Light
</label>

<select bind:value={$settings.language}>
  <option value="en">English</option>
  <option value="ar">Arabic</option>
</select>
