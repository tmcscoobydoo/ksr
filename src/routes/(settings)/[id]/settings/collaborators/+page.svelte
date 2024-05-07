<script>
  import Profile from "$lib/Profile.svelte";
  import { fade, slide } from "svelte/transition";
  import S_loading from "$lib/S_loading.svelte";
  import Seo from "$lib/Seo.svelte";
  let api_response = [];

  let searchTerm = [];
  $: if (searchTerm.length == 0) {
    api_response = [];
    loading = false;
  }
  let loading = false;
  const search = async () => {
    if (searchTerm.length > 0) {
      loading = true;

      const response = await fetch(`/dashboard/projects?search=${searchTerm}`);
      let data = await response.json();
      api_response = data;
      if (api_response.length === 0) {
        api_response = undefined;
      }
      loading = false;
    }
  };
  let invited = [];

  const invite = (id) => {
    const index = invited.indexOf(id);

    if (index !== -1) {
      invited.splice(index, 1);
      invited = invited;
    } else {
      invited.push(id);
      invited = invited;
    }
  };
</script>
<Seo title="Collaboration" type="WebApp" description="coming soon..." />
<div class="page">
  <form method="post" class="wrapper">
    <i class="ri-user-add-line"></i>
    <p>You haven't invited any collaborators yet</p>
    <div class="invite-bx">
      <div class="input">
        <input type="text" bind:value={searchTerm} />
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        {#if loading}
          <div class="loading">
            <S_loading color="#1c1c1c" />
          </div>
        {:else}
          <i class="ri-search-line" on:click={search}></i>
        {/if}
      </div>
      <div class="output">
        {#each api_response as user (user.id)}
          <div class="user-bx" transition:slide>
            <div class="user-info">
              <div class="profile">
                <Profile profile_data={user} />
              </div>
              <p>{user.full_name}</p>
            </div>
            {#if invited.indexOf(user.id) != -1}
              <!-- svelte-ignore a11y-no-static-element-interactions -->
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div class="remove" on:click={() => invite(user.id)}>remove</div>
              <!-- svelte-ignore a11y-no-static-element-interactions -->
            {:else}
              <!-- svelte-ignore a11y-no-static-element-interactions -->
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div class="invite" on:click={() => invite(user.id)}>invite</div>
            {/if}
          </div>
        {/each}
      </div>
      <button>
        submit
      </button>
      <input type="hidden" name="invited" value={JSON.stringify(invited)}>
    </div>
  </form>
</div>

<style>
  .page {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .wrapper {
    width: 60%;
    padding:  calc(2rem + 2vw) 0 1rem;
    border: 2px solid #bbbbbb;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    color: #a1a1a1;
    transition: 0.5s;
  }
  .wrapper i {
    font-size: clamp(25px, 2.7vw, 45px);
  }
  .wrapper p {
    font-size: clamp(12px, 1.3vw, 20px);
    font-weight: 500;
    text-align: center;
  }
  .invite-bx {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .input {
    width: 60%;
    margin: 0 auto;
    height: 35px;
    border-radius: 0.3rem;
    border: 2px solid #bbbbbb;
    position: relative;
  }
  .input input {
    width: 100%;
    height: 100%;
    padding: 0 1rem 0 0.3rem;
    color: #1c1c1c;
  }
  .input i , .loading{
    position: absolute;
    right: 5%;
    top: 50%;
    transform: translateY(-50%);
    font-size: clamp(12px, 2vw, 20px);
    cursor: pointer;
  }
  .loading{
    height: 70%;
    aspect-ratio: 1/1;
  }
  .output {
    height: 100%;
    min-width: 60%;
    max-height: 38vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow-y: auto;
    transition: 0.5s;
  }
  .user-bx {
    width: 100%;
    height: 35px;
    background-color: #e9e9e9;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.3rem clamp(0.5rem, 3vw, 1rem);
    border-radius: 0.4rem;
  }
  .user-bx:first-child {
    margin-top: 0.5rem;
  }
  .profile {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #8d8d8d;
    padding: 2px;
  }
  .user-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .user-info p {
    font-size: clamp(10px, 2.5vw, 13px);
    color: #1c1c1c;
    font-weight: 600;
  }

  .invite,
  .remove {
    padding: 0.3rem 0.6rem;
    background-color: #8d8d8d;
    border-radius: 0.3rem;
    font-size: clamp(10px, 3vw, 12px);
    text-transform: capitalize;
    font-weight: 500;
    color: #414141;
    border: 1px solid #868686;
    cursor: pointer;
  }
  .invite {
    background-color: transparent;
    transition: 0.1s;
  }
  .invite:hover {
    background-color: #c7c7c7;
  }
  .remove {
    background-color: #2c0f0f;
  }
  button{
    width: fit-content;
    margin-left: auto;
    margin-right: 1rem;
    padding: .4rem .7rem;
    border-radius: .3rem;
    background-color: #657cf4;
    color: #ededed;
    cursor: pointer;
  }
</style>
