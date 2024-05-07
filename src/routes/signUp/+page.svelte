<script>
  import Seo from "$lib/Seo.svelte";
  import { enhance } from "$app/forms";
  import "remixicon/fonts/remixicon.css";
  import Progress from "$lib/Progress.svelte";
  import Message from "$lib/Message.svelte";
  import { onMount } from "svelte";

  export let form;
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
  let message = false;
  const togMessage = () => {
    message = !message;
  };
  $: if (form?.success) {
    togMessage();
    setTimeout(() => {
      togMessage();
    }, 4500);
  }
</script>

<svelte:head>
  <Seo title="Sign Up" type="WebApp" description="coming soon" />
</svelte:head>
<Progress/>
<div class="page">
  {#if message}
    <Message message="Please verify your email" />
  {/if}
  <div class="left">
    <img src="bg-sign.svg" alt="" />
  </div>
  <div class="right">
    <div class="title">
      <h1>Get Started</h1>
      <h2>Create your account now.</h2>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="inputs">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <form action="" method="post">
        <div class="google">
          <i class="ri-google-fill"></i>
          continue with google
        </div>
        <div class="google">
          <i class="ri-facebook-circle-fill"></i>
          continue with facebook
        </div>
      </form>

      <div class="or"><p>or</p></div>
      <form method="post" use:enhance>
        <p class="message" class:error={!form?.success}>
          {form ? form.message : ""}
        </p>

        <div class="input">
          <p>Full name</p>
          <input
            placeholder="Your Full Name"
            type="text"
            name="fullName"
            value={form?.name || ""}
          />
        </div>

        <div class="input">
          <p>email</p>
          <input
            placeholder="example@gmail.com"
            type="email"
            name="email"
            value={form?.email || ""}
          />
        </div>
        <div class="input">
          <p>password</p>
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
        <button class="sign" type="submit">sign up</button>
      </form>
    </div>

    <p class="switch">have an account ? <a href="/login">sign in</a></p>
  </div>
</div>

<style>
  .message {
    color: rgb(7, 61, 7);
  }
  .error {
    color: rgb(122, 3, 3);
  }
  .page {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 2rem clamp(1.5rem, 5vw, 5rem);
    gap: clamp(1.5rem, 3vw, 3rem);
    height: 100%;
  }
  .left,
  .right {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 1rem;
  }
  .left img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }
  .right {
    display: flex;
    flex-direction: column;
  }
  h1 {
    font-size: clamp(25px, 3vw, 35px);
    color: #081226;
  }
  h2 {
    color: #808080;
    font-size: clamp(14px, 3vw, 18px);
    font-weight: 400;
    margin-top: 0.5rem;
  }
  .inputs,
  form {
    padding: 1.5rem 0px 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  form {
    padding: 0;
  }
  .google {
    width: 100%;
    height: 40px;
    border: 1px solid #d9d9d9;
    border-radius: 0.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: capitalize;
    font-size: clamp(13px, 2vw, 16px);
    gap: 0.5rem;
    color: #808080;
    cursor: pointer;
  }
  .google i {
    font-size: clamp(15px, 3vw, 18px);
  }
  .or {
    width: 100%;
    height: 2px;
    background-color: #d9d9d9;
    position: relative;
  }
  .or p {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 0 5px;
    color: #808080;
  }
  .input {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .input p {
    font-size: clamp(15px, 3vw, 18px);
    font-weight: 400;
    color: #808080;
  }

  .input input {
    width: 100%;
    height: 40px;
    border-radius: 0.5rem;
    border: 1px solid #d9d9d9;
    padding: 0 0.4rem;
  }
  .pswd-i {
    position: relative;
  }
  .eye {
    position: absolute;
    right: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    color: #081226;
    cursor: pointer;
  }
  .input input:focus {
    border: 1px solid #657cf4;
  }
  .password {
    display: grid;
    grid-template-columns: 1fr 0.5fr;
    align-items: center;
    gap: 1rem;
  }
  .generate {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    height: 100%;
    padding: 0 0.5rem;
    background-color: #657cf4;
    border-radius: 0.5rem;
    cursor: pointer;
    color: #ededed;
    font-size: clamp(12px, 1.5vw, 16px);
  }
  .sign {
    width: 100%;
    height: 50px;
    background-color: #657cf4;
    border-radius: 0.5rem;
    font-size: clamp(14px, 3vw, 18px);
    font-weight: 500;
    color: #ededed;
    cursor: pointer;
  }
  .switch {
    text-align: center;
    font-size: clamp(15px, 3vw, 18px);
    color: #9c9c9c;
    font-weight: 400;
  }
  .switch a {
    color: #657cf4;
    font-weight: 500;
  }
  @media (max-width: 900px) {
    .password {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 570px) {
    .left {
      display: none;
    }
    .page {
      grid-template-columns: 1fr;
    }
  }
</style>
