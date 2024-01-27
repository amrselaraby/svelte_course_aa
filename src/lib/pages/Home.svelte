<script>
  import VideoPlayer, { playAll, pauseAll } from "../VideoPlayer.svelte";
</script>

<button on:click={playAll}>Play all</button>
<button on:click={pauseAll}>Pause all</button>
<VideoPlayer src="mov_bbb.mp4" />
<VideoPlayer src="mov_bbb.mp4" />
<VideoPlayer src="mov_bbb.mp4" />
