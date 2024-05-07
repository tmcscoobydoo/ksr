<script>
  import "remixicon/fonts/remixicon.css";
  import { user_data } from "$lib/stores";
  import { goto } from "$app/navigation";
  import { page, navigating } from "$app/stores";
  import Progress from "$lib/Progress.svelte";
  
  let url;
  if ($navigating?.from.url.href) {
    url = $navigating?.from.url.pathname;
  } else {
    url = "/";
  }
  $: params = $page.params.id;
  $: Purl = $page.url.pathname.split("/").slice(-1);
  export let data;
  const { loggedUser } = data;
  let userData = loggedUser;

  $: if (!loggedUser) {
    console.log("not logged");
    goto("/login");
  }
  user_data.update(() => userData);
  let btns = [
    {
      id: 1,
      className: "ri-arrow-left-line",
      text: "projects",

      link: "/",
    },
    {
      id: 2,
      className: "ri-user-line",
      text: "general",
    },
    {
      id: 3,
      className: "ri-group-line",
      text: "collaborators",
    },
    {
      id: 4,
      className: "ri-wallet-3-line",
      text: "subscription",
    },
  ];
  function handleClick(id) {
    btns = btns.map((btn) => {
      return {
        ...btn,
        active: btn.id === id,
      };
    });
  }
</script>
<Progress/>
<div class="settings">
  <header>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    {#each btns as { className, text, active, id }}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!--  -->
      <a
        href={text == "general"
          ? `/${params}/settings/`
          : text == "projects"
            ? url
            : `/${params}/settings/${text}`}
        class="menu-btn"
        class:active={Purl == text || (Purl == "settings" && text == "general")}
        on:click={handleClick(id)}
      >
        <i class={className}></i>
        <p>{text}</p>
      </a>
    {/each}
  </header>
  <slot />
</div>

<style>
  .settings {
    width: 100%;
    height: 100%;
    border-radius: 17px;
    background-color: #fff;
    display: flex;
  }
  header {
    height: 100svh;
    width: clamp(350px, 30%, 500px);
    background-color: #f3f3f3;
    padding: 2rem 0.5rem;
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
  }
  .menu-btn {
    width: 100%;
    padding: 0.6rem 1rem;

    display: flex;
    align-items: center;
    border-radius: 0.5rem;
    gap: 0.5rem;
    cursor: pointer;
  }
  .menu-btn:hover,
  .menu-btn.active {
    background-color: #e9e9e9;
  }
  .menu-btn.active {
    border: 1px solid #d4d4d4;
  }
  .menu-btn p,
  .menu-btn i {
    margin-top: 0;
    color: #081226;
    font-weight: 500;
    font-size: clamp(12px, 3vw, 17px);
    text-transform: capitalize;
  }

  .menu-btn i {
    font-size: clamp(15px, 3vw, 20px);
  }
  @media (max-width: 570px) {
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 70px;
      flex-direction: row;
      padding: 0 1rem;
    }
    .menu-btn {
      padding: 0.3rem 0.5rem;
      gap: 0.2rem;
    }
  }
</style>
