<script>
  import "remixicon/fonts/remixicon.css";
  import Progress from "$lib/Progress.svelte";
  export let data;
  const { allUsers } = data;
  const users  = allUsers >= 1000 ? Math.round(allUsers / 1000 * 10) /10 : allUsers
  let active = false;
  const toggle = () => {
    active = !active;
  };
  const btns = [
    {
      name: "courses",
    },
    {
      name: "jobs",
    },
    {
      name: "pricing",
    },
    {
      name: "about",
    },
  ];
</script>
<Progress/>
<div class="page" class:active>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <header class:active>
    <div class="left">
      <a href="/" class="logo">
        <img src="/logo.png" alt="" />
        <p>ksr_ad</p>
      </a>
      <nav>
        {#each btns as { name }}
          <a href={`/${name}`} on:click={toggle}>{name}</a>
        {/each}
      </nav>
    </div>
    <div class="right">
      <div class="users">
        <i class="ri-user-3-line"></i>
        {allUsers >= 1000 ? `${users}k` : users}
      </div>
      <a href="/dashboard/projects" class="dashboard"> dashboard </a>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="toggle" on:click={toggle}>
      <div class="btn">
        <i class="ri-menu-line"></i>
      </div>
    </div>
  </header>
  <slot />
</div>

<style>
  .page {
    width: 100%;
    height: 100svh;
    background-color: #1c1c1c;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    /* padding-bottom: 2rem; */
  }

  header {
    width: 100%;
    border-bottom: 1px solid #313131;
    height: 64px;
    padding: 0 clamp(1rem, 6vw, 5rem);
    display: flex;
    justify-content: space-between;
  }
  .toggle {
    display: none;
  }
  .left,
  .right {
    display: flex;
    align-items: center;
    gap: 3rem;
  }
  .right {
    gap: 1rem;
  }
  .logo {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .logo img {
    height: 50%;
  }
  .logo p {
    font-size: 20px;
    color: #ededed;
    font-weight: 600;
  }
  nav {
    display: flex;
    gap: 2rem;
  }
  nav a {
    text-transform: capitalize;
    font-weight: 500;
    font-size: clamp(0.675rem, 3vw, 0.875rem);
    color: #ededed;
  }
  nav a:hover {
    color: #657cf4;
  }
  .users {
    padding: 0.5rem 0.8rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: clamp(0.6rem, 3vw, 0.8rem);
    color: #ededed;
  }
  .users:hover {
    background-color: #2e2e2e;
  }
  .dashboard {
    font-size: clamp(0.6rem, 3vw, 0.8rem);
    color: #ededed;
    padding: 0.4rem 0.8rem;
    border-radius: 0.5rem;
    background-color: #657cf4;
    border: 1px solid #95a0d8;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  .dashboard:hover {
    background-color: #4f66d6;
  }
  @media (max-width: 830px) {
    .page.active {
      overflow: hidden;
    }
    nav {
      position: absolute;
      left: 0;
      top: 64px;
      background-color: #1c1c1c;
      flex-direction: column;
      width: 100%;
      padding: 2rem 1rem;
      height: calc(100svh - 64px);
      z-index: 999;
    }
    nav a {
      height: 45px;
      display: flex;
      align-items: center;
      padding: 0 0.5rem;
      border-radius: 0.5rem;
    }
    nav a:hover {
      background-color: #232323;
    }
    .right {
      position: absolute;
      left: 50%;
      bottom: 2rem;
      transform: translateX(-50%);
      width: 100%;
      justify-content: center;
      z-index: 999;
    }
    .right,
    nav {
      display: none;
    }
    .dashboard {
      width: 60%;
      text-align: center;
      padding: 0.5rem 0.8rem;
    }
    .toggle {
      height: 100%;
      aspect-ratio: 1/1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .toggle .btn {
      height: 60%;
      aspect-ratio: 1/1;
      border-radius: 0.3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 21px;
      color: rgb(124, 124, 124);
      cursor: pointer;
    }
    .toggle .btn:hover {
      background-color: #232323;
    }
    header.active .right,
    header.active nav {
      display: flex;
    }
    nav a:first-child {
      animation: links 0.3s ease-in-out;
    }
    nav a:nth-child(2) {
      animation: links 0.5s ease-in-out;
    }
    nav a:nth-child(3) {
      animation: links 0.7s ease-in-out;
    }
    nav a:nth-child(4) {
      animation: links 0.9s ease-in-out;
    }
    nav a:last-child {
      animation: links 1.1s ease-in-out;
    }
    @keyframes links {
      0% {
        transform: translateY(10px);
        opacity: 0;
      }
      100% {
        transform: translateY(0px);
        opacity: 1;
      }
    }
  }
  @media (max-width: 570px) {
    .logo img {
      height: 35%;
    }
    .logo p {
      font-size: 15px;
    }
    nav {
      display: none;
    }
  }
</style>
