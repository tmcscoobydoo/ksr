<script>
      import { formatDistanceToNow } from 'date-fns';
      export let time;
</script>
{formatDistanceToNow(new Date(time), { addSuffix: true })}