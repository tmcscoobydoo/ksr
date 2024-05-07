<script>
  export let profile_data = false;
  export let new_pic = false;
  $: letter  = profile_data ? profile_data.full_name[0] : "";;
  let imageUrl = profile_data?.profile_pic;
  $: if (new_pic) {
    imageUrl = new_pic;
  }
</script>

{#if imageUrl}
  <img src={imageUrl} alt={profile_data?.full_name} />
{:else}
  <div class="photo" style="background-color:#{profile_data?.profile_color};">
    {letter}
  </div>
{/if}

<style>
  .photo {
    font-size: 2rem;
    font-weight: 500;
    text-transform: capitalize;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    pointer-events: none;
    color: #1c1c1c;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
  @media (max-width: 570px) {
    .photo {
      font-size: 1rem;
    }
  }
</style>
