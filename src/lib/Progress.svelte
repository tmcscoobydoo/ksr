<script>
  import NProgress from "nprogress";
  import { navigating } from "$app/stores";
  import "nprogress/nprogress.css";
  $: {
    if ($navigating) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }
  NProgress.configure({
    // Full list: https://github.com/rstacruz/nprogress#configuration
    minimum: 0.16,
    showSpinner: false,
  });
</script>


