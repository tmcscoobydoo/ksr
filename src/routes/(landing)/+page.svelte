<script>
  import Seo from "$lib/Seo.svelte";
  import { Application } from "@splinetool/runtime";
  import { onMount } from "svelte";

  let canvas;
  onMount(() => {
    const app = new Application(canvas);
    app.load('https://prod.spline.design/apevlfes0u9IuUH9/scene.splinecode');
  });
</script>

<div class="hero">
  <div class="text">
    <h1>from beginner<br /> to professional</h1>
    <p>
      the best website to collaborate with your team.<br />create , share and
      build your projects at scale.
    </p>
    <a href="/dashboard/projects" class="start"
      >get started<i class="ri-arrow-right-s-line"></i></a
    >
  </div>
  <canvas bind:this={canvas}></canvas>
</div>
<Seo
  title=""
  description="the best website to collaborate with your team.create , share and build your projects at scale."
  type="WebApp"
/>
<svelte:head>
  <script
    type="module"
    src="https://unpkg.com/@splinetool/viewer@1.0.11/build/spline-viewer.js"
  ></script>
  <script
    type="module"
    src="https://unpkg.com/@splinetool/viewer@1.0.11/build/spline-viewer.js"
  ></script>

  <title>T-WORK</title>
</svelte:head>

<style>
  .hero {
    display: grid;
    height: calc(100svh - 65px);
    grid-template-columns: 1fr 1fr;
    color: #f4fffad0;
    --tw-gradient-to: gray;
    text-transform: capitalize;
    align-items: center;
    padding-right: 2rem;
  }
  canvas {
    width: 100%;
    aspect-ratio: 1/1;
    max-height: calc(100svh - 65px);
    height: fit-content;
    padding: 8rem;
  }
  .hero .text {
    padding: 0 0 0px clamp(1rem, 5vw, 5rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem;
  }
  .hero .text h1 {
    font-size: clamp(25px, 4.5vw, 65px);
    font-weight: 500;
    background: linear-gradient(
      to right bottom,
      #fff 30%,
      hsla(0, 0%, 100%, 0.5)
    );
    -webkit-text-stroke: 0.4px #ffffff80;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: unset;
  }
  .hero .text p {
    font-size: clamp(13px, 1.5vw, 17px);
    color: #ffffff80;
    font-weight: 400;
  }
  .start {
    padding: 0.7rem 2rem;
    background-color: #657cf4;
    border-radius: 0.5rem;
    color: #ededed;
    font-weight: 500;
    display: flex;
    align-items: baseline;
    justify-content: center;
    font-size: clamp(12px, 3vw, 16px);
    gap: 0.2rem;
    margin-top: 0.5rem;
  }
  @media (max-width: 570px) {
    .hero {
      display: flex;
      flex-direction: column-reverse;
      justify-content: flex-end;
      gap: 4rem;
      padding-right: 0;
      padding-top: 2rem;
    }
   
  }
</style>
