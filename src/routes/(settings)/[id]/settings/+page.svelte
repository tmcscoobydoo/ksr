<script>
  import Seo from "$lib/Seo.svelte";
  import { enhance } from "$app/forms";
  import "remixicon/fonts/remixicon.css";
  import Profile from "$lib/Profile.svelte";
  import { user_data } from "$lib/stores";
  import Loading from "$lib/Loading.svelte";
  import { onMount } from "svelte";
  
  let message = false;
  let new_img;
  function handleFileChange(event) {
    const file = event.target.files[0];
    if (
      file &&
      (file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/gif")
    ) {
      new_img = URL.createObjectURL(file);
      message = false;
    } else {
      message = "please uploade a png , jpeg or gif file";
    }
  }
  let loaded = false;
  $: onMount(() => {
    loaded = true;
  });
</script>

<Loading {loaded} />
<div class="tools">
  <div class="top">
    <h1>general</h1>
    <p>Manage your general account information here</p>
  </div>
  <form method="post" use:enhance enctype="multipart/form-data">
    <div class="part">
      <p class="title">profile picture</p>
      <div class="profile">
        <Profile profile_data={$user_data} new_pic={new_img} />
        <input name="pic" type="file" on:change={handleFileChange} />
        <i class="ri-camera-fill"></i>
      </div>
      {#if message}
        <p class="error">{message}</p>
      {/if}
    </div>
    <div class="part">
      <p class="title">full name</p>
      <input
        name="name"
        type="text"
        placeholder="Update Your Name"
        value={$user_data?.full_name}
      />
    </div>
    <div class="part">
      <p class="title">email</p>
      <input
        name="email"
        type="text"
        placeholder="Update Your Email"
        value={$user_data?.email}
      />
    </div>

    <div class="part">
      <p>your password</p>
      <div class="password">
        <i class="ri-key-2-fill"></i>
        <p class="title">change password</p>
      </div>
    </div>

    <button>save changes</button>
  </form>
</div>

<svelte:head>
  <Seo title="Settings" type="WebApp" description="coming soon..." />
</svelte:head>

<style>
  .error {
    color: rgb(122, 3, 3);
  }
  .tools {
    width: 100%;
    height: 100%;
    padding: 2rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .top {
    width: 100%;
    padding-bottom: 1.5rem;
    border-bottom: 2px solid #cbcbcb;
  }
  h1 {
    font-size: clamp(20px, 3vw, 26px);
    font-weight: 500;
    text-transform: capitalize;
  }
  p,
  i {
    font-size: clamp(13px, 3vw, 17px);
    font-weight: 400;
    margin-top: 0.5rem;
    color: #959595;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .part {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .profile {
    clip-path: circle();
    overflow: hidden;
    width: 7rem;
    height: 7rem;
    cursor: pointer;
    position: relative;
  }

  .profile input {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: transparent;
    font-size: 0px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    border: none;
  }
  .profile i {
    display: none;
  }
  .profile:hover input {
    backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(1px);
    background: rgba(255, 255, 255, 0.2);
  }
  .profile:hover i {
    display: block;
    position: absolute;
    top: 45%;
    left: 50%;
    font-size: 2rem;
    transform: translate(-50%, -50%);
  }
  .title {
    text-transform: capitalize;
  }
  input,
  button {
    width: 40%;
    height: 100%;
    height: 35px;
    border-radius: 0.5rem;
    border: 1px solid #cbcbcb;
    padding: 0 0.5rem;
  }
  input:focus {
    border: 1px solid #657cf4;
  }
  button {
    background-color: #657cf4;
    color: #fff;
    border: 2px solid #4e6bff;
    cursor: pointer;
  }
  .password {
    border: 1px solid #cbcbcb;
    width: 40%;
    height: 100%;
    border-radius: 0.5rem;
    height: 35px;
    padding: 0 0.5rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
  .password p,
  .password i {
    margin-top: 0;
  }
  @media (max-width: 570px) {
    .tools {
      margin-top: 70px;
    }
    input,
    .password {
      width: 60%;
    }
  }
</style>
