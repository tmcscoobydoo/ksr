<script>
  import "remixicon/fonts/remixicon.css";
  import { onMount } from "svelte";
  import { sideBarS, admin } from "$lib/stores";
  import Sidebar from "$lib/Sidebar.svelte";
  import Header from "$lib/Header.svelte";
  import Progress from "$lib/Progress.svelte";
  export let data;
  const { loggedUser } = data;
  const { freinds } = data;
  let loaded = false;
  const loading = () => {
    loaded = !loaded;
  };
  $: onMount(async () => {
    loading();
  });
</script>
<Progress/>
<div class="page">
  <div
    class="left-part"
    style="width: {$sideBarS ? '13rem' : 'clamp(3rem,10vw,5rem)'};"
  >
    <Sidebar />
  </div>
  <div class="right-part">
    <Header UserData={loggedUser} {freinds} />
    <slot />
  </div>
</div>

<style>
  .page {
    width: 100%;
    height: 100%;
    padding: clamp(8px, 2vw, 20px) clamp(8px, 2vw, 20px) clamp(8px, 2vw, 20px) 0;
    display: flex;
    gap: 20px;
    background-color: #d3d3d3;
  }

  .left-part {
    height: 100%;
    transition: width 0.5s ease-in-out;
  }
  .right-part {
    flex: 3.3;
    height: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    position: relative;
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
