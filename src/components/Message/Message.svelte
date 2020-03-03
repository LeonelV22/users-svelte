<script>
    export let title = '';
    export let message = '';
    export let size = 'small';
    export let level = 'primary';
</script>
<section class="hero is-{size} is-{level}">
    <div class="hero-body">
        <div class="container">
            {#if title}
            <h1 class="title">
                {title}
            </h1>
            {/if}
            {#if message}
            <h2 class="subtitle">
                {message}
            </h2>
            {/if}
        </div>
    </div>
</section>
