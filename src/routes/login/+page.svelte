<script>
  import Seo from "$lib/Seo.svelte";
  import { enhance } from "$app/forms";
  import "remixicon/fonts/remixicon.css";
  import { goto } from "$app/navigation";
  import Progress from "$lib/Progress.svelte";
  export let form;
  let pwd = "";
  let showed = false;
  const toggle = () => {
    showed = !showed;
  };
  $: if (form?.success) {
    goto("/dashboard/projects");
  }
</script>

<svelte:head>
  <Seo title="Sign In" type="WebApp" description="coming soon" />
</svelte:head>
<Progress/>
<div class="page">
  <div class="left">
    <img src="bg-sign.svg" alt="" />
  </div>
  <div class="right">
    <div class="title">
      <h1>Welcome Back!</h1>
      <h2>Login to your account now.</h2>
    </div>
    <div class="inputs">
      <form method="post">
        <!-- formaction="?/login&provider=google" -->
        <button type="button" class="google">
          <i class="ri-google-fill"></i>
          continue with google
        </button>

        <button type="button" class="google">
          <i class="ri-facebook-circle-fill"></i>
          continue with facebook
        </button>
      </form>

      <div class="or"><p>or</p></div>
      <form method="post" use:enhance>
        <p class="message" class:error={!form?.success}>
          {form ? form.message : ""}
        </p>

        <div class="input">
          <p>email</p>
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={form?.email || ""}
          />
        </div>
        <div class="input">
          <p>password</p>
          <div class="password">
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="pswd-i">
              <input
                type={showed ? "text" : "password"}
                placeholder="Your Password"
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
          </div>
        </div>
        <button class="sign" type="submit">sign in</button>
      </form>
    </div>

    <p class="switch">have an account ? <a href="/signUp">sign up</a></p>
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
    background-color: #fff;
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
    grid-template-columns: 1fr;
    align-items: center;
    gap: 1rem;
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
      grid-template-columns: 1fr;
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
