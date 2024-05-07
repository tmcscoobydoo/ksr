<script>
  import "remixicon/fonts/remixicon.css";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { sideBarS } from "$lib/stores";
  import Sidebar from "$lib/Sidebar.svelte";
  import CollHeader from "$lib/CollHeader.svelte";
  import Loading from "$lib/Loading.svelte";
  import Seo from "$lib/Seo.svelte"
  export let data;
  const { loggedUser } = data;
  let loaded = false;
  const loading = () => {
    loaded = !loaded;
  };
 
  $: onMount(() => {
    loading();
    if (!loggedUser) {
      console.log("not logged");
      goto("/login");
    }
  });

</script>
<Seo title="Collaboration"/>

<div class="page">
  <div
    class="left-part"
    style="width: {$sideBarS ? '13rem' : 'clamp(3rem,10vw,5rem)'};"
  >
    <Sidebar />
  </div>
  <div class="right-part">
    <CollHeader/>
    {#if !loaded}
      <Loading />
    {:else}
      <div class="work"></div>
    {/if}
  </div>
</div>

<style>
  .page {
    width: 100%;
    height: 100%;
    padding: clamp(8px, 2vw, 20px) clamp(8px, 2vw, 20px) 0 0;
    display: flex;
    gap: 20px;
    background-color: #d3d3d3;
    background-size: 16px 16px;
    background-image: linear-gradient(to right, #1c1c1c17 1px, transparent 1px),
      linear-gradient(#1c1c1c17 1px, transparent 1px);
  }

  .left-part {
    height: 100%;
    transition: width 0.5s ease-in-out;
    padding-bottom: clamp(8px, 2vw, 20px);
  }
  .right-part {
    flex: 3.3;
    height: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }
  .work{
    height: 100%;
    width: 100%;
    background-color: rgba(105, 105, 105, 0.205);
  }
  @media (max-width: 570px) {
    /* .left-part {
      display: none;
    } */
    .page {
      gap: 0.5rem;
    }
    .right-part {
      row-gap: 0.5rem;
    }
  }
</style>


