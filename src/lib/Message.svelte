<script>
    export let message;
</script>
<div class="container">
    {message}
    <div class="time">

    </div>
</div>

<style>
    .container{
        position: absolute;
        top: 2rem;
        right: 5%;
        /* transform: translateX(-50%); */
        padding: 1rem 2rem;
        font-size: clamp(11px , 3vw , 14px);
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        border-radius: 0.5rem;
        color: #141414;
        font-weight: 500;
        border: 1px solid #657cf4;
        overflow: hidden;
        animation: translate ease-in-out 0.4s;
        animation: end .5s ease-in-out 4s;
    }
    .time{
        position: absolute;
        left: 0;
        bottom: 0;
        height: 2px;
        width: 100%;
        background-color: #657cf4;
        animation: time 4s ease-in-out;
    }
    @keyframes translate{
        0%{
            transform: translate(0% , 5%);
            opacity: 0;
        }
        100%{
            transform: translate(0% , 0%);
            opacity: 1;
        }
    }
    @keyframes time{
        0%{
            width: 0%;
        }
        100%{
            width: 100%;
        }
    }
    @keyframes end{
        0%{
            transform: translate(0% , 0%);
            opacity: 1;
        }
        100%{
            transform: translate(0% , -5%);
            opacity: 0;
        }
    }
    

</style>