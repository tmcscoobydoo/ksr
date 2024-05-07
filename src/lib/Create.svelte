<script>
  import { enhance } from "$app/forms";
  export let id;
  export let active;
  const hide = () => {
    active = false;
  };
</script>

<form method="post" class="project active" class:active use:enhance>
  <div class="flex">
    <h1>Create a new task</h1>
    <p>Your can edit later your task.</p>
  </div>
  <div class="flex row">
    <p>Name</p>
    <input name="name" type="text" placeholder="Task Name" maxlength="30" required/>
  </div>
  <div class="flex row">
    <p>Description</p>
    <input name="description" type="text" placeholder="Task Description" maxlength="100" required/>
  </div>
  <div class="flex row">
    <p>Finish Date</p>
    <input name="date" type="date" required />
  </div>

  <div class="bottom">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="cancel" on:click={hide}>cancel</div>
    <button class="submit">create new task</button>
  </div>
  <input type="hidden" name="id" value={id}>
</form>

<style>
  .flex {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-bottom: 1px solid #4d4d4d80;
    padding: 2rem;
  }
  .row {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .project {
    width: 60%;
    max-width: 600px;
    min-width: 300px;
    transform: translate(-50%, 5%);
    position: absolute;
    left: 50%;
    background-color: #fff;
    display: none;
    animation: project 0.2s;
    border-radius: 0.5rem;
    overflow: hidden;
    margin-bottom: 2rem;
    z-index: 998;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;
  }
  .project.active {
    display: block;
  }
  h1 {
    font-size: clamp(12px, 3vw, 16px);
    color: #232323;
    font-weight: 500;
  }
  p {
    font-size: clamp(10px, 2vw, 13px);
    color: #7d7d7d;
    text-transform: capitalize;
  }
  input {
    height: 35px;
    width: 60%;
    border-radius: 0.5rem;
    padding: 0 0.6rem;
    background-color: #ffffff;
    border: 1px solid #657cf4;
    color: #2c2c2c;
  }
  input:focus{
    border: 1px solid #4055bd;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
  }
  .cancel,
  .submit {
    padding: 0.3rem 0.6rem;
    background-color: #313131;
    border-radius: 0.3rem;
    font-size: clamp(10px, 3vw, 12px);
    text-transform: capitalize;
    font-weight: 500;
    color: #ededed;
    border: 1px solid #4b4b4b;
    cursor: pointer;
  }
  .submit {
    background-color: #657cf4;
    border: 1px solid #95a0d8;
  }
  @keyframes project {
    0% {
      transform: translate(-16vw, 80vh) skewX(16deg);
      width: 30%;
      height: 0%;
    }
    100% {
      transform: translate(-50%, 5%) skewX(0);
      width: 60%;
    }
  }
  @media (max-width: 900px) {
    .project {
      width: 95%;
      transform: translate(-50%, 5%);
      left: 50%;
    }
    @keyframes project {
      0% {
        transform: translate(-16vw, 80vh) skewX(16deg);
        width: 30%;
        height: 0%;
      }
      100% {
        transform: translate(-50%, 5%) skewX(0);
        width: 95%;
      }
    }
  }
  @media (max-width: 570px) {
    .flex {
      padding: 1.5rem;
      flex-direction: column;
    }
    input {
      height: 30px;
    }
   
    .project {
      transform: translate(-50%, 5%);
      left: 50%;
    }
    .bottom {
      padding: 1.5rem;
    }
    @keyframes project {
      0% {
        transform: translate(-16vw, 80vh) skewX(16deg);
        width: 30%;
        height: 0%;
      }
      100% {
        transform: translate(-50%, 5%) skewX(0);
        left: 50%;
        width: 100%;
      }
    }
  }
</style>
