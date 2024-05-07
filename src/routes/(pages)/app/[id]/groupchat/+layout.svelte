<script>
  import Seo from "$lib/Seo.svelte";
  import Loading from "$lib/Loading.svelte";
  import { onMount } from "svelte";
  export let data;
  const { users } = data;
  
  function setFocusToTextBox(elem) {
    elem.focus();
  }
  let inp;
  let loaded = false;
  onMount(() => {
    loaded = true;
    inp = document.querySelector(".header-search");
  });
</script>

<Seo title="Chat" description="coming soon" type="webApp" />
{#if loaded}
  <div class="page">
    <div class="bx" id="all-messages">
      <div class="unread">
        <button class="search" on:click={setFocusToTextBox(inp)}
          >Search a freind</button
        >
        <h1>unread</h1>
        <div class="profile-bx">
          <div class="profile">
            <div class="pic-num">
              <div class="pic">
                <img src="/logo.png" alt="" />
              </div>
              <div class="num">6</div>
            </div>

            <div class="name-message">
              <div class="name">
                adam boukhris <div class="active"></div>
              </div>
              <div class="message">this is a message hehehe</div>
            </div>
          </div>
          <div class="date">12:30</div>
        </div>
      </div>
      <div class="hr"></div>
      <h1>All Messages</h1>
      <div class="all-messages">
        <div class="profile-bx">
          <div class="profile">
            <div class="pic-num">
              <div class="pic">
                <img src="/logo.png" alt="" />
              </div>
              <div class="num">6</div>
            </div>

            <div class="name-message">
              <div class="name">
                adam boukhris <div class="active"></div>
              </div>
              <div class="message">this is a message hehehe</div>
            </div>
          </div>
          <div class="date">12:30</div>
        </div>
        <div class="profile-bx">
          <div class="profile">
            <div class="pic-num">
              <div class="pic">
                <img src="/logo.png" alt="" />
              </div>
              <div class="num">6</div>
            </div>

            <div class="name-message">
              <div class="name">
                adam boukhris <div class="active"></div>
              </div>
              <div class="message">this is a message hehehe</div>
            </div>
          </div>
          <div class="date">12:30</div>
        </div>
      </div>
    </div>
    <div class="right-page">
      <slot />
    </div>
  </div>
{:else}
  <Loading loaded={false} />
{/if}

<style>
  .page {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: clamp(8px, 2vw, 20px);
  }
  .right-page {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bx {
    height: 100%;
    width: 100%;
    background-color: #fff;
    border-radius: 1rem;
    overflow: hidden;
  }
  .search {
    height: 35px;
    width: auto;
    margin: 0 1.5rem;
    border: 2px solid #d3d3d3;
    border-radius: 0.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(11px, 3vw, 14px);
    color: #9c9c9c;
    font-weight: 500;
    cursor: pointer;
  }
  .bx#all-messages {
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
  }
  .bx#all-messages .unread,
  .all-messages {
    padding: 0.5rem 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .hr {
    width: 60%;
    height: 1px;
    background-color: #9c9c9c;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .bx#all-messages h1 {
    color: #686868;
    text-transform: capitalize;
    font-size: clamp(11px, 3vw, 13px);
    font-weight: 500;
    margin-bottom: 1rem;
    margin-left: 1.5rem;
  }
  .bx#all-messages .profile-bx {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    padding: 0.5rem 1.5rem;
  }
  .bx#all-messages .profile-bx:hover {
    background-color: #d3d3d3;
  }
  .bx#all-messages .profile {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .bx#all-messages .profile-bx .pic,
  .header .pic {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #e2e2e2;
    overflow: hidden;
    padding: 0.1rem;
  }
  .profile-bx .pic img,
  .header .pic img {
    width: 100%;
    object-fit: cover;
    height: 100%;
  }
  .name-message {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  .name-message .name {
    color: #1c1c1c;
    font-size: 13px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
  .name-message .name .active {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #2f9422;
  }
  .name-message .message {
    color: #9c9c9c;
    font-size: 13px;
  }
  .profile-bx .date {
    font-size: 11px;
    color: #767676;
    font-weight: 500;
  }
  .profile-bx .pic-num {
    position: relative;
  }
  .profile-bx .num {
    position: absolute;
    padding: 2px;
    border-radius: 50%;
    background-color: #657cf4;
    left: 50%;
    bottom: -18%;
    border: 1px solid #fff;
    height: 17px;
    width: 17px;
    display: flex;
    font-size: 12px;
    justify-content: center;
    align-items: center;
    color: #ededed;
  }

  @media (max-width: 1000px) {
    .page {
      grid-template-columns: 0.9fr 1.2fr;
    }
    @media (max-width: 570px) {
      .page {
        grid-template-columns: 1fr;
        gap: 0.5rem;
      }
    }
  }
</style>
