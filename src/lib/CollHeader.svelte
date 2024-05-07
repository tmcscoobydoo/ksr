<script>
  const btns = [
    {
      icon: "ri-cursor-fill",
    },
    {
      icon: "ri-checkbox-blank-fill",
    },
    {
        icon: "ri-circle-fill"
    },
    {
        icon: "ri-text"
    },
    
  ];
</script>

<header class="horiz-header">
  <div class="left">
    {#each btns as { icon }}
      <div class="btn">
        <i class={icon}></i>
      </div>
    {/each}
  </div>
</header>

<style>
  .horiz-header {
    position: relative;
    height: 11vh;
    background-color: #f9f9f9;
    border-radius: 17px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    z-index: 999;
  }
  .left {
    height: 60%;
    display: flex;
    align-items: center;
  }
  .left .btn {
    height: 100%;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.3rem;
    color: #959595;
    cursor: pointer;
    font-size: clamp(15px, 5vw, 22px);
  }
  .left .btn:hover {
    background-color: #d9d9d9;
  }

  @media (max-width: 570px) {
    .horiz-header {
      height: 8vh;
      padding: 3% 10px;
    }
  }
</style>
