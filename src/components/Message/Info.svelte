<script>
    import Message from './Message.svelte';

    export let infoMessage = '';
    export let level = 'primary';

</script>
<Message message={infoMessage} level="{level}"/>
