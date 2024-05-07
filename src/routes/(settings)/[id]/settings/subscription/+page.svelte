<script>
  import Loading from "$lib/Loading.svelte";
  import { onMount } from "svelte";
  let loaded = false;
  $: onMount(() => {
    loaded = true;
    
  });
</script>

<Loading {loaded} />
