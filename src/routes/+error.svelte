<script>
  import { page } from "$app/stores";
 
</script>

<div class="page">
  {#if $page.status == 404}
    <p>page in development</p>
    <a href="/">home</a>
  {:else}
    <p>error<strong>{$page.status}</strong></p>
    <a href="/">home</a>
  {/if}
</div>

<style>
  .page {
    width: 100%;
    height: 100%;
    background-color: #1c1c1c;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    gap: 1rem;
  }

  p {
    font-size: clamp(15px, 3vw, 25px);
  }
  a {
    color: #fff;
    text-decoration: underline;
  }
</style>
