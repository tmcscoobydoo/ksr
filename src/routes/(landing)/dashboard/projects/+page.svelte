<script>
  import Seo from "$lib/Seo.svelte";
  import Project from "$lib/Project.svelte";
  import Duration from "$lib/Duration.svelte";
  export let data;
  const { allUsers } = data;
  const { projects } = data;

  let active = false;
  const show = () => {
    active = true;
  };
</script>

<Seo
  title="Projects"
  description="the best website to collaborate with your team.create , share and build your projects at scale."
  type="WebApp"
/>

<div class="page">
  {#if active}
    <Project bind:active users={allUsers} />
  {:else if projects?.length == 0}
    <div class="first">
      <p class="message">No projects</p>
      <p class="text">Get started by creating a new project.</p>

      <button class="add-project" on:click={show}>new project</button>
    </div>
  {:else}
    <button class="add-project" on:click={show}>new project</button>
    <div class="projects">
      {#each projects as { name, members, id, created_at }}
        <a href="/app/{id}" class="project">
          <div class="top">
            <p class="name">{name}</p>
            <i class="ri-arrow-right-s-line"></i>
          </div>
          <div class="bottom">
            <p><Duration time={created_at} /></p>
            <p>{members?.length}</p>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</div>

<style>
  .page {
    padding: 2rem 3rem;
    min-height: calc(100% - 64px);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 3rem;
  }
  .projects {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    width: 100%;
    gap: 1rem;
  }
  .project {
    padding: 1rem;
    width: 100%;
    max-width: 40vw;
    aspect-ratio: 2/1;
    background-color: #232323;
    border-radius: 0.5rem;
    border: 1px solid #4b4b4b;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    cursor: pointer;
    transition: 0.2s;
  }
  .project:hover {
    background-color: #303030;
  }
  .project:hover i {
    transform: translateX(20%);
  }
  .project .top {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .project .bottom {
    font-size: 0.8rem;
    color: #4b4b4b;
    display: flex;
    justify-content: space-between;
  }
  .project .top i {
    color: #4b4b4b;
    transition: 0.2s;
    font-size: 1.3rem;
  }
  .project .name {
    font-size: 0.875rem;
    font-weight: 500;
    color: #ededed;
  }
  .add-project {
    font-size: clamp(0.6rem, 3vw, 0.8rem);
    width: fit-content;
    color: #ededed;
    padding: 0.4rem 0.8rem;
    border-radius: 0.3rem;
    background-color: #657cf4;
    border: 1px solid #95a0d8;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  .add-project:hover {
    background-color: #4f66d6;
  }
  .first {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
  }
  .first .add-project {
    margin-top: 1rem;
  }
  .message {
    color: #ededed;
    font-size: clamp(12px, 3vw, 16px);
  }
  .text {
    font-size: clamp(10px, 3vw, 14px);
    color: #ffffff80;
  }
  @media (max-width: 900px) {
    .page {
      padding: 2rem 1rem;
    }
  }
  @media (max-width: 670px) {
    .project {
      max-width: 100%;
    }
  }
</style>
