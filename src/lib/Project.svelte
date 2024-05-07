<script>
  import { enhance } from "$app/forms";
  import { invited_users } from "$lib/stores";
  import Profile from "./Profile.svelte";
  import SLoading from "./S_Loading.svelte";
  export let active;
  const hide = () => {
    active = false;
  };
  let pwd = "";
  let showed = false;
  const toggle = () => {
    showed = !showed;
  };
  const generate = () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+";

    pwd = "";
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      pwd += charset[randomIndex];
    }
  };
  let invited = [];

  const invite = (id) => {
    const index = invited.indexOf(id);

    if (index !== -1) {
      invited.splice(index, 1);
    } else {
      invited.push(id);
    }
    invited_users.update(() => invited);
  };
  $:console.log($invited_users)
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
</script>

<form method="post" class="project" class:active>
  <div class="flex">
    <h1>Create a new project</h1>
    <p>
      Your project will be created without users so you have to invite your
      project members.
    </p>
  </div>
  <div class="flex row">
    <p>Name</p>
    <input name="name" type="text" placeholder="Project Name" />
  </div>
  <div class="flex row">
    <p>project password</p>
    <div class="password">
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="pswd-i">
        <input
          placeholder="Your Password"
          type={showed ? "text" : "password"}
          value={pwd}
          name="pwd"
        />
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <i
          class="{showed ? 'ri-eye-off-fill' : 'ri-eye-fill'} eye"
          on:click={toggle}
        ></i>
      </div>

      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="generate" on:click={generate}>
        <i class="ri-quill-pen-fill"></i> generate one
      </div>
    </div>
  </div>
  <div class="flex row">
    <p>invite you team</p>
    <div class="users">
      <div class="search">
        <input
          type="text"
          placeholder="Search user name"
          bind:value={searchTerm}
        />
        {#if loading}
          <button type="button" class="search-btn" style="padding: .5rem;">
            <SLoading color="#555555" />
          </button>
        {:else}
          <button type="button" class="search-btn" on:click={search}>
            <i class="ri-search-line"></i>
          </button>
        {/if}
      </div>

      <div class="output">
        {#each api_response as user}
          <div class="user-bx">
            <div class="user-info">
              <div class="profile">
                <Profile profile_data={user} />
              </div>
              <p>{user.full_name}</p>
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            {#if $invited_users.includes(user.id)}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <!-- svelte-ignore a11y-no-static-element-interactions -->
              <div class="remove" on:click={() => invite(user.id)}>
                remove
              </div>
              <!-- svelte-ignore a11y-no-static-element-interactions -->
            {:else}
              <!-- svelte-ignore a11y-no-static-element-interactions -->
              <div class="invite" on:click={() => invite(user.id)}>
                invite
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
  <input type="hidden" name="members" value={JSON.stringify($invited_users)} />
  <div class="bottom">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="cancel" on:click={hide}>cancel</div>
    <button class="submit" on:click={invited_users.update(() => invited)}
      >create new project</button
    >
  </div>
</form>

<style>
  .flex {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-bottom: 1px solid #2e2e2e;
    padding: 2rem;
  }
  .row {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .project {
    width: 60%;
    max-width: 600px;
    min-width: 300px;
    transform: translate(-50%, 5%);
    position: absolute;
    left: 50%;
    background-color: #232323;
    display: none;
    animation: project 0.2s;
    border-radius: 0.5rem;
    overflow: hidden;
    margin-bottom: 2rem;
    z-index: 998;
  }
  .project.active {
    display: block;
  }
  h1 {
    font-size: clamp(12px, 3vw, 16px);
    color: #ededed;
    font-weight: 500;
  }
  p {
    font-size: clamp(10px, 2vw, 13px);
    color: #ffffff80;
    text-transform: capitalize;
  }
  input {
    height: 35px;
    width: 60%;
    border-radius: 0.5rem;
    padding: 0 0.6rem;
    background-color: #313131;
    border: 1px solid #4b4b4b;
    color: #ededed;
  }
  .password {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    gap: 1rem;
    position: relative;
    width: 60%;
  }
  .generate {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    height: 35px;
    padding: 0 0.5rem;
    background-color: #657cf4;
    border-radius: 0.5rem;
    cursor: pointer;
    color: #fff;
    font-size: clamp(10px, 1.5vw, 16px);
    width: 70%;
    margin-left: auto;
  }
  .password input {
    width: 100%;
  }
  .eye {
    position: absolute;
    top: 10px;
    right: 20px;
    color: #606060;
    cursor: pointer;
  }
  .users {
    height: 300px;
    width: 60%;
    background-color: #313131;
    border-radius: 0.4rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .search {
    display: flex;
  }
  .search,
  .search input {
    height: 45px;
    width: 100%;

    border-bottom: 1px solid #494949;
    border-radius: 0;
  }
  .search input {
    height: 100%;
    border: none;
    width: 85%;
  }
  .search-btn {
    width: 15%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: #555555;
    cursor: pointer;
    background-color: transparent;
  }
  .output {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow-y: auto;
  }
  .user-bx {
    width: 100%;
    height: 35px;
    background-color: #414141;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .3rem clamp(0.5rem, 3vw, 1rem);
  }
  .user-bx:first-child{
    margin-top: 0.5rem;
  }
  .profile {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #2e2e2e;
    padding: 2px;
  }
  .user-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .user-info p {
    font-size: clamp(10px, 2.5vw, 13px);
  }
  .profile img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
  }
  .cancel,
  .submit,
  .invite,
  .remove {
    padding: 0.3rem 0.6rem;
    background-color: #313131;
    border-radius: 0.3rem;
    font-size: clamp(10px, 3vw, 12px);
    text-transform: capitalize;
    font-weight: 500;
    color: #ededed;
    border: 1px solid #4b4b4b;
    cursor: pointer;
  }
  .invite {
    background-color: transparent;
    transition: 0.1s;
  }
  .invite:hover {
    background-color: #313131;
  }
  .remove {
    background-color: #2c0f0f;
  }
  .submit {
    background-color: #657cf4;
    border: 1px solid #95a0d8;
  }
  @keyframes project {
    0% {
      transform: translate(-16vw, 80vh) skewX(16deg);
      width: 30%;
      height: 0%;
    }
    100% {
      transform: translate(-50%, 5%) skewX(0);
      width: 60%;
    }
  }
  @media (max-width: 900px) {
    .project {
      width: 95%;
      transform: translate(-50%, 5%);
      left: 50%;
    }
    @keyframes project {
      0% {
        transform: translate(-16vw, 80vh) skewX(16deg);
        width: 30%;
        height: 0%;
      }
      100% {
        transform: translate(-50%, 5%) skewX(0);
        width: 95%;
      }
    }
  }
  @media (max-width: 570px) {
    .flex {
      padding: 1.5rem;
      flex-direction: column;
    }
    .users {
      width: 80%;
    }
    input {
      height: 30px;
    }
    .generate {
      height: 30px;
    }
    .eye {
      top: 6px;
    }
    .project {
      transform: translate(-50%, 5%);
      left: 50%;
    }
    .bottom {
      padding: 1.5rem;
    }
    @keyframes project {
      0% {
        transform: translate(-16vw, 80vh) skewX(16deg);
        width: 30%;
        height: 0%;
      }
      100% {
        transform: translate(-50%, 5%) skewX(0);
        left: 50%;
        width: 100%;
      }
    }
  }
</style>
