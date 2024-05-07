<script>
  import Profile from "./Profile.svelte";
  import { page } from "$app/stores";
  import S_Loading from "./S_Loading.svelte";
  export let freinds;
  export let UserData;
  const currentDate = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);
  let api_response = [];

  let searchTerm = [];
  $: if (searchTerm.length == 0) {
    api_response = [];
  }
  const { id } = $page.params;
  let loading = false;
  const search = async () => {
    if (searchTerm.length > 0) {
      loading = true;

      const response = await fetch(`/app/${id}?search=${searchTerm}`);
      let data = await response.json();
      api_response = data;
      if (api_response.length === 0) {
        api_response = undefined;
      }
      loading = false;
    }
  };
  const invite = async (id) => {
    const response = await fetch(`/app/${id}?invite=${id}|${UserData.uuid}`);
    let data = await response.json();
  };
</script>

<header class="horiz-header">
  <div class="horiz-header-left">
    <div class="input-box">
      {#if api_response?.length > 0 && searchTerm?.length > 0}
        <div class="search-result">
          {#each api_response as user}
            <div class="profile-bx">
              <a class="profile-left" href={`/app/${id}/groupchat/${user.id}`}>
                <div class="cover"><Profile profile_data={user} /></div>
                <p>{user.full_name}</p>
              </a>

              {#if freinds.some((freind) => freind.id === user.id)}
                <button class="btn freind" on:click={invite(user.id)}>
                  <i class="ri-user-follow-line"></i>
                  <div class="text">Already a freind</div>
                </button>
              {:else}
                <button class="btn invite" on:click={invite(user.id)}>
                  <i class="ri-user-add-line"></i>
                  <div class="text">Click to invite</div>
                </button>
              {/if}
            </div>
          {/each}
        </div>
      {:else if api_response == undefined}
        <div class="search-result">No Data Found</div>
      {/if}

      <input
        class="header-search"
        type="text"
        placeholder="Search Here"
        bind:value={searchTerm}
      />
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->

      {#if loading}
        <div class="loading">
          <S_Loading color="#BABABA" />
        </div>
      {:else}
        <lord-icon
          class="search-icon"
          src="https://cdn.lordicon.com/rlizirgt.json"
          trigger="hover"
          colors="primary:#BABABA"
          state="hover"
          style="width: clamp(10px, 3vh , 25px);"
          on:click={search}
        >
        </lord-icon>
      {/if}
    </div>
    <p>{formattedDate}</p>
  </div>
  <div class="horiz-header-right">
    <div class="tuto">
      <lord-icon
        src="https://cdn.lordicon.com/nocvdjmh.json"
        trigger="morph"
        colors="primary:#657CF4"
        state="hover-1"
        style="width: 100%;height: 100%;"
      >
      </lord-icon>
    </div>
    <div class="profile-pic">
      <Profile profile_data={UserData} />
      <div class="profile-name">
        <h1 class="full-name">{UserData?.full_name}</h1>
        <h2 class="user-email">{UserData?.email}</h2>
      </div>
    </div>
  </div>
</header>

<style>
  .horiz-header {
    position: relative;
    height: clamp(5rem, 9vh, 6rem);
    background-color: #f9f9f9;
    border-radius: 17px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 24px;
    z-index: 999;
  }

  .horiz-header-left {
    flex: 1.2;

    display: flex;
    align-items: center;
    gap: 4%;
  }
  .input-box {
    width: 50%;
    height: 7vh;
    display: flex;
    align-items: center;
    position: relative;
  }
  .search-result {
    position: absolute;
    width: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    top: 100%;
    background-color: #f3f3f3;
    border-radius: 0.5rem;
    box-shadow:
      rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
      rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    color: #7d7d7d;
    font-size: clamp(11px, 3vw, 14px);
  }
  .profile-bx {
    width: 100%;
    padding: 0.3rem 0.5rem;
    background-color: #ededed;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }
  .profile-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
  .btn {
    height: 100%;
    aspect-ratio: 1/1;
    border-radius: 0.3rem;
    background-color: #00c853;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.3rem;
    cursor: pointer;
    color: #ededed;
  }
  .btn.freind {
    background-color: #aaaaaa;
  }
  .text {
    position: absolute;
    top: 2rem;
    transform: translateX(-50%);
    left: 50%;
    font-size: clamp(11px, 3vw, 13px);
    background-color: #00c853;
    padding: 0.3rem 0.5rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    opacity: 0;
    transition: 0.3s 0.3s;
    pointer-events: none;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    z-index: 2;
  }
  .btn:hover .text {
    opacity: 1;
  }
  .text::after {
    content: "";
    position: absolute;
    width: 10%;
    aspect-ratio: 1.7/1;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    background-color: #00c853;
    left: 50%;
    top: -17%;
    transform: translateX(-50%);
    border-radius: 0.5rem;
  }
  .freind .text {
    background-color: #aaaaaa;
  }
  .freind .text::after {
    background-color: #aaaaaa;
  }
  .profile-bx .cover {
    width: 30px;
    height: 30px;
    background-color: rgb(134, 134, 134);
    border-radius: 50%;
    overflow: hidden;
  }

  .header-search {
    padding: 13px 50px 13px 23px;
    border: none;
    outline: none !important;
    background: rgba(188, 188, 188, 0.2);
    border-radius: 20px;
    font-size: 13px;
    color: #1c1c1c;
    width: 100%;
    height: 85%;
  }
  ::placeholder {
    color: #bababa;
  }
  .search-icon,
  .loading {
    position: absolute;
    right: 16px;
    cursor: pointer;
  }
  .loading {
    width: clamp(10px, 3vh, 25px);
    aspect-ratio: 1/1;
  }
  .horiz-header-left p {
    color: #7d7d7d;
    word-wrap: break-word;
    font-size: clamp(10px, 2vw, 14px);
  }

  .horiz-header-right {
    flex: 0.3;
    height: 50%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: .3rem;
  }
  .tuto {
    width: 26%;
    height: 80%;
    cursor: pointer;
  }
  .profile-pic {
    width: 45px;
    height: 45px;
    cursor: pointer;
    position: relative;
    border-radius: 50%;
  }

  .profile-name {
    width: 230px;
    height: 100px;
    background-color: #f9f9f9;
    position: absolute;
    top: 60px;
    right: -30px;
    border-radius: 17px;
    filter: drop-shadow(-3px 0px 13px rgba(114, 114, 114, 0.25));
    opacity: 0;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .profile-name::after {
    content: "";
    position: absolute;
    height: 42px;
    width: 33px;
    border-radius: 2px;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="21" height="17" viewBox="0 0 21 17" fill="none"><path d="M7.18885 3.88544C8.68924 1.67168 9.43944 0.564803 10.5 0.564803C11.5606 0.564803 12.3108 1.67168 13.8112 3.88544L17.9593 10.0058C19.82 12.7512 20.7504 14.1239 20.1867 15.187C19.623 16.25 17.9647 16.25 14.6482 16.25H6.35185C3.03529 16.25 1.37701 16.25 0.813311 15.187C0.249609 14.1239 1.17997 12.7512 3.04069 10.0058L7.18885 3.88544Z" fill="%23F9F9F9"/></svg>');
    background-position: center bottom;
    background-repeat: no-repeat;
    right: 36px;
    top: -35px;
    cursor: pointer;
  }
  .profile-pic:hover .profile-name,
  .profile-name:hover {
    opacity: 1;
    pointer-events: all;
    row-gap: 5px;
  }
  .full-name {
    font-size: 15px;
    color: #1c1c1c;
    font-weight: 600;
  }

  .user-email {
    font-size: 13px;
    font-weight: 400;
    color: #000000;
    opacity: 0.5;
  }
  @media (max-width: 570px) {
    .horiz-header {
      height: 8vh;
      padding: 3% 10px;
    }
    .header-search {
      padding: 8px 7px 8px 10px;
    }
    .profile-pic {
      width: 34px;
      height: 34px;
    }
    .profile-name {
      right: -32%;
    }
    .profile-name::after {
      right: 5%;
    }
    .input-box {
      height: 100%;
      width: 20%;
      clip-path: circle();
    }
    .search-icon {
      right: 12px;
    }
  }
</style>
