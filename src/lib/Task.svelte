<script>
  export let name = "";
  export let des = "";
  export let id;
</script>

<div class="task">
  <div class="top">
    <h1 class="name">{name}</h1>
    <p class="des">{des}</p>
  </div>
  <div class="bottom">
    <p>6 months ago</p>
    <form method="post">
        <input name="delete" type="hidden" value={id}>
        <button class="delete"><i class="ri-delete-bin-5-fill"></i></button>
    </form>
  </div>
</div>

<style>
  .task {
    aspect-ratio: 1/1;
    width: 100%;
    max-width: 25rem;
    background-color: #fff;
    border-radius: 1rem;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    animation: app cubic-bezier(1, -0.17, 0.43, 1.02) 1s;
    position: relative;
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
  .delete{
    padding: .5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(122, 3, 3);
    color: #fff;
    border-radius: .2rem;
    cursor: pointer;
    font-size: clamp(12px, 3vw, 16px);
  }
  @keyframes app {
    0% {
      transform: scale(0.7);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
