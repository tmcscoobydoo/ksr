<script>
  import Seo from "$lib/Seo.svelte";
  import Create from "$lib/Create.svelte";
  import Task from "$lib/Task.svelte";
  import Duration from "$lib/Duration.svelte";
  export let form;
  export let data;
  const { tasks } = data;
  const { loggedUser } = data;
  let active = false;
  //use push inside of tasks when new one was created
  $: if (form?.success) {
    active = false;
  }
  $: name = form?.name;
  $: des = form?.description;
  const show = () => {
    active = true;
  };
</script>

<Seo title="Upload Tasks" description="coming soon ..." type="WebApp" />
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="container">
  {#if tasks}
    {#each tasks as { id, name, description, created_at }}
      <div class="task">
        <div class="top">
          <h1 class="name">{name}</h1>
          <p class="des">{description}</p>
        </div>
        <div class="bottom">
          <p><Duration time={created_at} /></p>
          <form method="post">
            <input name="delete" type="hidden" value={id} />
            <button class="delete"><i class="ri-delete-bin-5-fill"></i></button>
          </form>
        </div>
      </div>
    {/each}
  {/if}

  {#if form?.success}
    <Task {name} {des} id={form.task_id} />
  {/if}
  {#if active}
    <Create bind:active id={loggedUser.id} />
  {/if}

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="create" on:click={show}>
    <i class="ri-file-copy-fill"></i>
  </div>
</div>

<style>
  .container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: clamp(1rem, 3vw, 2rem);
    overflow-y: auto;
  }
  .task,
  .create {
    aspect-ratio: 1/1;
    width: 100%;
    max-width: 25rem;
    background-color: #fff;
    border-radius: 1rem;
    padding: 1.5rem;
  }
  .task {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .create {
    position: relative;
    background-color: transparent;
    border: 0.7rem solid rgba(179, 179, 179, 0.55);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(179, 179, 179, 0.55);
    cursor: pointer;
  }
  .create i {
    position: absolute;
    font-size: 6rem;
  }
  .task .top {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    word-wrap: break-word;
  }
  .task .top .name {
    font-size: clamp(13px, 3vw, 18px);
    font-weight: 500;
  }
  .task .top .des {
    font-size: clamp(10px, 3vw, 15px);
    color: #3e3e3e;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    font-size: clamp(11px, 3vw, 15px);
    color: #3e3e3e;
    align-items: center;
  }
  .delete {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(122, 3, 3);
    color: #fff;
    border-radius: 0.2rem;
    cursor: pointer;
    font-size: clamp(12px, 3vw, 16px);
  }
</style>
