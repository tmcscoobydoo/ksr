<script>
  import { enhance } from "$app/forms";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { intlFormatDistance } from "date-fns";
  import Profile from "$lib/Profile.svelte";
  export let data;
  const { loggedUser } = data;
  $: ({ supabase } = data);
  $: user = data.user;
  $: messages = data.messages;

  const date = (date) => {
    return intlFormatDistance(date, new Date(), { locale: "en" });
  };
  $: console.log(messages);
  $: onMount(() => {
    const dbmessages = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        (payload) => {
          messages.push(payload.new);
          messages = messages;
          scrollToBottom(divElement, height);
        }
      )
      .subscribe();
  });
  function scrollToBottom(element, height) {
    if (!element) {
      console.error("scrollToBottom: element not found");
      return;
    }
    console.log(element);
    console.log(height);
    element.scroll({
      top: height,
      behavior: "smooth", // Smooth scrolling
    });
  }
  let divElement;
  $: height = "";
  onMount(() => {
    scrollToBottom(divElement, height);
  });
  $:console.log(height)
</script>

<div class="page">
  <div class="bx messages">
    <div class="header">
      <div class="left">
        <div class="pic-num">
          <div class="pic">
            <Profile profile_data={user} />
          </div>
        </div>
        <p>{user.full_name}</p>
      </div>
      <div class="right"><i class="ri-settings-5-fill"></i></div>
    </div>
    <div class="chat-bx" bind:this={divElement} bind:clientHeight={height}>
      {#each messages as { id, sender, receiver, message, created_at }}
        <div class="message-infos" class:recived={$page.params.user == sender}>
          <div class="time">{date(created_at)}</div>
          <div class="message">{message}</div>
        </div>
      {/each}
    </div>
    <form method="post" class="send" use:enhance>
      <input type="hidden" name="me" value={loggedUser.id} />
      <input type="text" name="message" placeholder="Aa" autocomplete="off" />
      <div class="buttons">
        <div class="btn"><img src="/img.svg" alt="imgs" /></div>
        <button class="btn plane"><img src="/send.svg" alt="" /></button>
      </div>
    </form>
  </div>
  <div class="bx profile-info">
    <div class="profile-bx"></div>
  </div>
</div>

<style>
  .page {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: clamp(8px, 2vw, 20px);
    height: 100%;
    width: 100%;
  }
  .bx {
    height: 100%;
    width: 100%;
    background-color: #fff;
    border-radius: 1rem;
    overflow: hidden;
  }
  .header .pic {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #e2e2e2;
    overflow: hidden;
  }
  .header .pic img {
    width: 100%;
    object-fit: cover;
    height: 100%;
  }
  .header {
    background-color: #657cf4;
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
  }
  .header .left {
    display: flex;
    align-items: center;
    gap: 0.7rem;
  }
  .header .left p {
    color: #ededed;
    font-size: clamp(11px, 3vw, 13px);
    font-weight: 500;
  }
  .header .right {
    color: #e9e9e9;
    font-size: clamp(13px, 3vw, 18px);
    cursor: pointer;
  }
  .chat-bx {
    height: calc(74vh - 3rem);
    max-height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    overflow-y: auto;
  }
  .bx.messages {
    position: relative;
    padding-bottom: 4rem;
  }
  .chat-bx + .send {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 2rem);
    height: 6%;
    background-color: #d9d9d9;
    border-radius: 0.5rem;
    display: flex;
    justify-content: space-between;
    padding: 0 0.7rem;
    gap: 1rem;
  }
  .send input {
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
  .send .buttons {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    height: 100%;
  }
  .send .buttons .btn {
    height: calc(100% - 30%);
    aspect-ratio: 1/1;
    padding: 5%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .send .buttons .btn img {
    width: 100%;
    height: 100%;
  }
  .send .buttons .btn.plane {
    background-color: #657cf4;
    border-radius: 0.2rem;
    padding: 0%;
  }

  .message-infos {
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 0.5rem;
  }
  .message-infos.recived {
    align-items: start;
  }
  .message-infos .time {
    color: #9c9c9c;
    font-size: clamp(10px, 2vw, 14px);
  }
  .message-infos .message {
    padding: 0.8rem;
    border-radius: 0.7rem 0.7rem 0px 0.7rem;
    background: rgba(101, 124, 244, 0.71);
    font-size: clamp(11px, 3vw, 14px);
    color: #1c1c1c;
  }
  .message-infos.recived .message {
    border-radius: 0rem 0.7rem 0.7rem 0.7rem;
    background-color: #d9d9d9;
  }
  .bx.profile-info {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
  }
  .bx.profile-info .profile-bx {
    width: 100%;
    aspect-ratio: 1/1;
    background-color: #92a2f7;
    border-radius: 0.5rem;
    padding: 1rem;
  }
  @media (max-width: 1000px) {
    .page {
      grid-template-columns: 1fr;
    }
    .bx.profile-info {
      display: none;
    }
  }
</style>
