<script>
  import Seo from "$lib/Seo.svelte";
</script>

<Seo
  title="Pricing"
  description="the best website to collaborate with your team.create , share and build your projects at scale."
  type="WebApp"
/>
<div class="big-title">
  <h1>pricing</h1>
  <h2>Predictable pricing, no surprises</h2>
  <p>
    Start building for free, collaborate with a team, then scale to millions of
    users.
  </p>
</div>
<div class="layout">
  <div class="plan">
    <div class="con">
      <div class="flex">
        <h1>free</h1>
        <p class="des">Perfect for passion & simple projects.</p>
      </div>
      <div class="flex">
        <div class="price">$0<span>/ month</span></div>
      </div>
      <div class="flex no">
        <p class="title">get started with:</p>
        <div class="features">
          <div class="feature">
            <i class="ri-check-line"></i>
            <p>Limit of 2 projects</p>
          </div>
          <div class="feature">
            <i class="ri-check-line"></i>
            <p>Limit of 10 members per project</p>
          </div>
          <div class="feature">
            <i class="ri-check-line"></i>
            <p>100 messages per day</p>
          </div>
          <div class="feature">
            <i class="ri-check-line"></i>
            <p>Upload size 10MB</p>
          </div>
          <div class="feature">
            <i class="ri-check-line"></i>
            <p>profile picture type: JPG, PNG</p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex">
      <a href="/login">get started</a>
    </div>
  </div>
  <div class="recommanded">
    <div class="title">Most Popular</div>
    <div class="plan">
      <div class="con">
        <div class="flex">
          <h1>PRO</h1>
          <p class="des">For serious projects with the option to scale.</p>
        </div>
        <div class="flex">
          <div class="price">$4<span>/ month</span></div>
        </div>
        <div class="flex no">
          <p class="title">Everything in the Free plan, plus:</p>
          <div class="features">
            <div class="feature">
              <i class="ri-check-line"></i>
              <p>Up to 100 projects</p>
            </div>
            <div class="feature">
              <i class="ri-check-line"></i>
              <p>Limit of 35 members per project</p>
            </div>
            <div class="feature">
              <i class="ri-check-line"></i>
              <p>Unlimited messages</p>
            </div>
            <div class="feature">
              <i class="ri-check-line"></i>
              <p>Upload size 3GB</p>
            </div>
            <div class="feature">
              <i class="ri-check-line"></i>
              <p>profile picture type: JPG,PNG,GIF,SVG</p>
            </div>
            <div class="feature">
              <i class="ri-check-line"></i>
              <p>Profile customisation</p>
            </div>

            <div class="feature">
              <i class="ri-check-line"></i>
              <p>Realtime collaboration</p>
            </div>
            <div class="feature">
              <i class="ri-check-line"></i>
              <p>Ai calender organiser</p>
            </div>
            <div class="feature">
              <i class="ri-check-line"></i>
              <p>Support team 24/7</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex">
        <a href="/login">get started</a>
      </div>
    </div>
  </div>
  <div class="plan">
    <div class="con">
      <div class="flex">
        <h1>team</h1>
        <p class="des">
          Collaborate with different permissions and access patterns.
        </p>
      </div>
      <div class="flex">
        <div class="price">$25<span>/ month</span></div>
      </div>
      <div class="flex no">
        <p class="title">Everything in the Free plan, plus:</p>
        <div class="features">
          <div class="feature">
            <i class="ri-check-line"></i>
            <p>Unlimited projects</p>
          </div>
          <div class="feature">
            <i class="ri-check-line"></i>
            <p>Unlimited members per project</p>
          </div>
          <div class="feature">
            <i class="ri-check-line"></i>
            <p>Upload size 15GB</p>
          </div>
          <div class="feature">
            <i class="ri-check-line"></i>
            <p>Privet firewall security for your data</p>
          </div>
          <div class="feature">
            <i class="ri-check-line"></i>
            <p>Free 10GB cloud</p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex">
      <a href="">get started</a>
    </div>
  </div>
  <div class="plan">
    <div class="con">
      <div class="flex">
        <h1>ENTERPRISE</h1>
        <p class="des">For large-scale projects managing serious workloads.</p>
      </div>
      <div class="flex">
        <div class="price">Contact us</div>
      </div>
      <div class="flex no">
        <p class="title">Customizable:</p>
        <div class="features">
          <div class="feature">
            <p>coming soon...</p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex">
      <a href="">get started</a>
    </div>
  </div>
</div>

<style>
  .big-title {
    width: 100%;
    padding: 3rem 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem clamp(2rem, 10vw, 6rem);
  }
  .big-title h1 {
    font-size: clamp(12px, 3vw, 16px);
    color: #657cf4;
    font-weight: 400;
    text-transform: capitalize;
  }
  .big-title h2 {
    font-size: clamp(20px, 3vw, 35px);
    color: #ededed;
    font-weight: 500;
  }
  .big-title p {
    font-size: clamp(14px, 3vw, 18px);
    color: #ffffff80;
  }
  .flex {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    border-bottom: 1px solid #2e2e2e;
    padding-bottom: 1rem;
  }

  .flex:last-child {
    border-top: 1px solid #2e2e2e;
    padding-top: 1rem;
  }
  .flex.no {
    border-bottom: 0;
    border-top: 0;
  }
  .layout {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-content: center;
    align-items: center;
    height: auto;
    gap: 1rem;
    padding: 2rem clamp(2rem, 10vw, 6rem);
    margin-top: 2rem;
  }
  .plan {
    background-color: #232323;
    padding: 2.5rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    border-radius: 0.5rem;
    border: 1px solid #2e2e2e;
    height: 100%;
  }
  .con {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .plan h1 {
    font-size: clamp(13px, 3vw, 20px);
    text-transform: uppercase;
    font-weight: 500;
    color: #657cf4;
  }
  .plan .des {
    font-size: clamp(10px, 2vw, 13px);
    color: #ffffff80;
  }
  .price {
    font-size: clamp(20px, 3vw, 40px);
    font-weight: 500;
    background: linear-gradient(to right bottom, #fff 12%, hsl(0deg 0% 0.08%));
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: unset;
    margin: 1rem 0;
  }
  .price span {
    background: #7d7d7d;
    background-clip: text;
    -webkit-text-stroke: 0;
    font-size: clamp(13px, 3vw, 15px);
    margin-left: 0.3rem;
    font-weight: 400;
  }
  .flex .title {
    font-weight: 500;
    font-size: clamp(11px, 3vw, 13px);
    color: #7d7d7d;
  }
  .flex a {
    color: #ededed;
    padding: 0.5rem 0.5rem;
    border-radius: 0.5rem;
    background-color: #657cf4;
    border: 1px solid #95a0d8;
    cursor: pointer;
    font-size: clamp(13px, 3vw, 15px);
    font-weight: 500;
    text-transform: capitalize;
    text-align: center;
    transition: background-color 0.2s;
    margin: 1rem 0;
  }
  .flex a:hover {
    background-color: #4f66d6;
  }
  .recommanded .flex .title {
    font-weight: 500;
    font-size: clamp(11px, 3vw, 13px);
    color: #7d7d7d;
    padding: 0;
    text-align: start;
  }
  .flex .features {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .flex .features .feature {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #ededed;
    font-size: clamp(10px, 3vw, 13px);
  }
  .flex .features .feature i {
    color: #657cf4;
    font-size: clamp(15px, 3vw, 18px);
  }
  .recommanded .plan {
    border: 1px solid transparent;
    height: calc(100% - (2rem + 3px));
  }
  .recommanded {
    border: 2px solid #657cf4;
    border-radius: 0.5rem;
    background-color: #657cf4;
    margin-top: -2rem;
    height: calc(100% + 2.5rem);
  }
  .recommanded .title {
    font-size: clamp(13px, 3vw, 15px);
    padding: 0.5rem 1rem;
    text-align: center;
    color: #1c1c1c;
    font-weight: 500;
  }
  @media (max-width: 1200px) {
    .layout {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 700px) {
    .layout {
      grid-template-columns: 1fr;
      padding: 2rem clamp(2rem, 12vw, 5rem);
    }
    .recommanded {
      margin-top: 0;
    }
  }
</style>
