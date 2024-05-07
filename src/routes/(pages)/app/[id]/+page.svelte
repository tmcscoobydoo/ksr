<script>
  import Seo from "$lib/Seo.svelte";
  import Profile from "$lib/Profile.svelte";
  import Duration from "$lib/Duration.svelte";
  import Loading from "$lib/Loading.svelte";
  import { onMount } from "svelte";
  export let data;
  const { project } = data;
  const { tasks } = data;
  const { users } = data;
  const date = new Date();
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  const today = new Date(`${year}-${month}-${day}`);
  let done = 0;
  let progress = 0;
  for (let index = 0; index < tasks?.length; index++) {
    const task = new Date(tasks[index].date);
    if (task <= today) {
      done++;
    } else {
      progress++;
    }
  }
  let loaded = false;
  $: onMount(() => {
    loaded = true;
  });
</script>

<Seo title="Tasks" description="coming soon ..." type="WebApp" />

<!-- ------right part work-------- -->
<div class="right-content" id="scroll">
  <div class="work">
    {#if loaded}
      <header>
        <div class="left-side">
          <div class="title">
            <h1>{project?.name}</h1>
            <p>
              <span>{tasks?.length} total,</span> total,proceed to resolve them
            </p>
          </div>
        </div>
        <div class="right-side">
          <div class="work-done">
            <h1>{done}</h1>
            <p>done</p>
          </div>
          <div class="work-in-progress">
            <h1>{progress}</h1>
            <p>in progress</p>
          </div>
        </div>
      </header>
      <div class="table">
        {#if tasks?.length > 0}
          <table class="work-info">
            <thead>
              <tr class="thead">
                <th class="header" style="text-align: left;">Tasks</th>
                <th class="header">Uploader</th>
                <th class="header">Status</th>
                <th class="header">Start Date</th>
                <th class="header">Finish Date</th>
              </tr>
            </thead>
            <tbody>
              {#if tasks}
                {#each tasks as { name, description, created_at, creator_id, date }}
                  <tr class="tr">
                    <td class="work-name">{name} : {description}</td>
                    <td>
                      <div class="teacher-info">
                        <div class="teacher-img">
                          <Profile
                            profile_data={users.find(
                              (obj) => creator_id === obj.id
                            )}
                          />
                        </div>
                        <div class="teacher-name">
                          {users.find((obj) => creator_id === obj.id)
                            ?.full_name}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="center">
                        <div
                          class={today >= new Date(date)
                            ? "statu done"
                            : "statu"}
                        >
                          <i
                            class={today >= new Date(date)
                              ? "ri-checkbox-circle-fill"
                              : "ri-time-fill"}
                          ></i>
                          {today >= new Date(date) ? "Done" : "In Progress"}
                        </div>
                      </div>
                    </td>
                    <td
                      ><div class="start-date">
                        <Duration time={created_at} />
                      </div></td
                    >
                    <td
                      ><div class="end-date">
                        {#if today == date}
                          today
                        {:else}
                          <Duration time={date} />
                        {/if}
                      </div></td
                    >
                  </tr>
                {/each}
              {/if}
            </tbody>
          </table>
        {:else}
          <div class="waiting">no tasks created yet</div>
        {/if}
      </div>
    {:else}
      <Loading loaded />
    {/if}
  </div>
  <div class="bottom-work">
    <div class="activity">
      <h1>activity</h1>
      <div class="tasks-lines">
        <div class="task-line">100</div>
        <div class="task-line">80</div>
        <div class="task-line">60</div>
        <div class="task-line">40</div>
        <div class="task-line">20</div>
        <div class="task-line">0</div>
      </div>
    </div>
    <div class="illustration">
      <img src="/homework-illustration.svg" alt="" />
    </div>
  </div>
</div>

<style>
  .table,
  table {
    width: 100%;
  }
  .table {
    overflow: auto;
  }
  .waiting {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #959595;
    text-transform: capitalize;
    height: 4rem;
    padding-top: 1rem;
    font-size: clamp(11px, 3vw, 14px);
  }
  .right-content {
    width: 100%;
    height: 100%;
    border-radius: 17px;
  }

  #scroll {
    overflow-y: auto;
  }

  .thead {
    border-bottom: 1px solid #9c9c9c;
  }

  .header {
    color: #959595;
    font-size: clamp(8px, 1.2vw, 13px);
    text-transform: capitalize;
    height: 6vh;
    font-weight: 500;
  }

  .work {
    /* height: 63%; */
    border-radius: 17px;
    padding: 3%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    min-height: 16rem;
  }

  .work header {
    flex: 30%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #9c9c9c;
    padding: 0 2%;
  }

  .work header .left-side {
    width: 30%;
  }
  .left-side .title h1 {
    font-weight: 600;
    text-transform: capitalize;
    font-size: clamp(12px, 1.8vw, 36px);
    color: #081226;
  }
  .left-side .title span {
    font-weight: 500;
    text-transform: capitalize;
    font-size: clamp(12px, 1.2vw, 17px);
    color: #081226;
  }
  .left-side .title p {
    font-weight: 500;
    text-transform: capitalize;
    font-size: clamp(8px, 1vw, 13px);
    color: #959595;
    line-height: 6vh;
    /* white-space: nowrap; */
  }

  .work header .right-side {
    width: 25%;
    display: flex;
    justify-content: flex-end;
    gap: 3vw;
  }
  .work-done,
  .work-in-progress {
    text-align: center;
  }
  .right-side .work-done h1,
  .right-side .work-in-progress h1 {
    font-weight: 500;
    font-size: clamp(10px, 2.2vw, 36px);
    color: #081226;
  }
  .right-side .work-done p,
  .right-side .work-in-progress p {
    font-weight: 500;
    font-size: clamp(10px, 1vw, 18px);
    color: #959595;
    text-transform: capitalize;
    line-height: 5vh;
  }

  .work-name {
    font-size: clamp(8px, 1.2vw, 12px);
    color: #081226;
    font-weight: 600;
    height: 25px;
  }
  .work-name:first-child {
    padding-top: 2vh;
  }

  .teacher-info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
  .teacher-info:first-child {
    margin-top: 1.5vh;
  }
  .teacher-img {
    width: 25px;
    height: 25px;
    overflow: hidden;
    border-radius: 50%;
  }
  .teacher-img img {
    width: 100%;
    height: 126%;
    object-fit: cover;
  }
  .teacher-name {
    font-size: clamp(8px, 1.2vw, 13px);
  }

  .center {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .statu {
    width: 80%;
    height: 25px;
    border-radius: 3px;
    background: rgba(145, 166, 224, 0.5);
    color: #7383ae;
    font-weight: 600;
    font-size: clamp(8px, 1.2vw, 11px);
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 5px 6px 5px;
    text-align: center;
  }
  .statu i {
    font-size: 1.5vw;
    color: #7383ae;
  }
  .statu.done {
    background: rgba(123, 198, 160, 0.5);
    color: #579e7a;
  }
  .statu.done i {
    color: #579e7a;
  }

  .statu:first-child {
    margin-top: 2vh;
  }

  .start-date,
  .end-date {
    font-size: clamp(8px, 1.2vw, 12px);
    color: #081226;
    height: 25px;
    font-weight: 500;
    text-align: center;
  }
  .start-date:first-child {
    margin-top: 2.8vh;
  }
  .end-date:first-child {
    margin-top: 2.3vh;
  }
  .end-date {
    text-transform: capitalize;
    background-color: #ededed;
    display: grid;
    place-items: center;
    padding: 0 5px;
    border-radius: 10px;
  }
  .bottom-work {
    margin-top: 20px;
    height: 60%;
    border-radius: 17px;
    display: flex;
    gap: 20px;
  }
  .activity {
    background-color: #fff;
    flex: 1;
    box-sizing: border-box;
    border-radius: 17px;
    padding: 30px 28px;
  }
  .activity h1 {
    font-size: clamp(8px, 1.5vw, 20px);
    font-weight: 600;
    color: #081226;
    text-transform: capitalize;
  }
  .tasks-lines {
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    row-gap: 2vh;
    padding-top: 2.1vh;
  }
  .task-line {
    font-size: clamp(8px, 1.1vw, 18px);
    position: relative;
    color: #c0c0c0;
  }
  .task-line::after {
    content: "";
    position: absolute;
    width: 90%;
    height: 1px;
    background-color: #c0c0c0;
    top: 50%;
    left: 10%;
  }

  .task-level {
    width: 20px;
    height: 80%;
    background-color: #081226;
    position: absolute;
  }

  .illustration {
    background: rgba(101, 124, 244, 0.5);
    flex: 1;
    border-radius: 17px;
    padding: 5% 5% 3%;
  }

  .illustration img {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 570px) {
    .bottom-work {
      height: 35%;
      gap: 0.5rem;
      margin-top: 0.5rem;
      flex-direction: column;
    }
    .statu {
      justify-content: center;
    }
    .statu i {
      display: none;
    }
    .start-date,
    .end-date {
      height: 20px;
    }
    .right-content {
      overflow-x: auto;
    }
    .right-side .work-done p,
    .right-side .work-in-progress p {
      line-height: 0.5rem;
      margin-top: 0.5rem;
    }
    .work header .left-side {
      width: 80%;
    }
    .work {
      padding: 4% 2%;
    }
    table {
      width: 150%;
    }
    td {
      margin: 0 0.5rem;
    }
  }
</style>
