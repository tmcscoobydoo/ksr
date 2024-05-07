<script>
  import { sideBarS, admin } from "./stores";

  import { page } from "$app/stores";
  $: params = $page.params.id;
  $: lastWord = $page.url.href.split("/").pop();
  $: if (lastWord == $page.params.id) {
    lastWord = "tasks";
  }
  let menuBtns = [
    {
      iconSrc: "https://cdn.lordicon.com/qtxqkhzr.json",
      label: "calendar",
      access: true,
    },
    {
      iconSrc: "https://cdn.lordicon.com/zkacxjoa.json",
      label: "upload tasks",
      access: true,
    },
    {
      iconSrc: "https://cdn.lordicon.com/zncllhmn.json",
      label: "tasks",
      access: false,
    },
    {
      iconSrc: "https://cdn.lordicon.com/msetysan.json",
      label: "notifications",
      access: true,
    },
    {
      iconSrc: "https://cdn.lordicon.com/pkmkagva.json",
      label: "group chat",
      access: true,
    },
    {
      iconSrc: "https://cdn.lordicon.com/iazmohzf.json",
      label: "collaboration",
      access: true,
    },
  ];
  let toggled = false;
  const toggleF = () => {
    toggled = !toggled;
    sideBarS.update(() => toggled);
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<header class="vert-header" class:toggled>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="logo" on:click={toggleF}><img src="/logo.svg" alt="" /></div>
  <div class="menu">
    <div class="menu-btns">
      {#each menuBtns as { iconSrc, label, access }}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        {#if access || $admin}
          <a
            href={label == "tasks"
              ? `/app/${params}`
              : `/app/${params}/${label.replace(/\s/g, "")}`}
            class:active={lastWord == label.replace(/\s/g, "")}
            class="menu-btn"
            id="menu-btn"
          >
            <lord-icon
              src={iconSrc}
              trigger="hover"
              colors="primary:{lastWord == label.replace(/\s/g, '')
                ? '#fff'
                : '#959595'}"
              style="height: clamp(15px, 5vw, 22px)"
            >
            </lord-icon>
            {label}
          </a>
        {/if}
      {/each}

      <div class="indicator-bg"></div>
    </div>
  </div>
  <div class="general">
    <a href={`/${params}/settings`} class="menu-btn">
      <lord-icon
        src="https://cdn.lordicon.com/dycatgju.json"
        trigger="hover"
        colors="primary:#959595"
        style="height: clamp(15px, 5vw, 22px)"
      >
      </lord-icon>
      settings
    </a>
    <a href="/support" class="menu-btn">
      <lord-icon
        src="https://cdn.lordicon.com/vacmyjrh.json"
        trigger="hover"
        colors="primary:#959595"
        state="hover-2"
        style="height: clamp(15px, 5vw, 22px)"
      >
      </lord-icon>
      support
    </a>
  </div>
  <form class="logout" action="/logout">
    <button class="menu-btn">
      <i class="ri-logout-box-r-fill"></i>
      logout
    </button>
  </form>
</header>

<style>
  i {
    font-size: clamp(15px, 5vw, 22px);
    padding: 0.7rem;
  }
  header {
    width: 100%;
    height: 100%;
    background-color: #f9f9f9;
    border-radius: 0 1rem 1rem 0;
  }

  /* -- ---------vert-header------- -- */

  .logo {
    width: calc(100% - 20%);
    height: 11%;
    display: grid;
    place-items: center;
    padding-top: 5px;
    margin-right: auto;
    margin-left: auto;
    border-bottom: 1px solid #cbcbcb;
    cursor: pointer;
  }
  .logo img {
    height: 50%;
  }
  .menu {
    width: 100%;
    height: 54%;
    padding-top: 3vh;
    padding-bottom: 1.5vh;
    border-bottom: 1px solid #cbcbcb;
  }

  .menu-btns {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  .menu-btn {
    display: flex;
    justify-content: center;

    gap: 0;
    align-items: center;
    font-size: 0;
    font-weight: 500;
    color: #959595;
    text-transform: capitalize;
    cursor: pointer;
    z-index: 2;
    transition: all 0.5s;
    padding-left: 0%;
    height: 3rem;

    border-radius: 0.8rem;
    width: 85%;
  }
  header.toggled .menu-btn {
    font-size: clamp(11px, 3vw, 15px);
    justify-content: flex-start;
    gap: 10px;
    padding-left: 9%;
    width: 95%;
  }
  .menu-btn.active {
    color: #f9f9f9;
    position: relative;
    background-color: #657cf4;
  }
  .menu-btn.active ~ .indicator-bg {
    width: 14%;
    height: 35px;
    background-color: #657cf4;
    position: absolute;
    z-index: 1;
    left: 12px;
    border-radius: 39px;
    transition: all 0.5s;
    display: none;
  }

  .general {
    width: 100%;
    height: 21%;
    padding-top: 4.5vh;
    padding-bottom: 4.5vh;
    border-bottom: 1px solid #cbcbcb;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 5vh;
  }
  .general .menu-btn,
  .logout .menu-btn {
    width: 100%;
  }
  .logout {
    width: 100%;
    height: 12%;
    display: flex;
    align-items: center;
  }
  @media (max-width: 570px) {
  }
</style>
