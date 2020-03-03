<script>
    import Message from './Message.svelte';

    export let error = {};

</script>
<Message message={error} level="danger"/>
