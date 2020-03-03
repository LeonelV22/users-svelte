<script>
    import { getUsers } from '../../store/users';

    import { Error } from '../../components';

    import Table from './components/Table.svelte';
    import Details from './components/Details.svelte';
    import Pagination from './components/Pagination.svelte';
</script>

<section class="columns">
    {#await getUsers()}
        <div class="container">
            <progress class="progress is-small is-primary" max="100"></progress>
        </div>
    {:then }
        <div class="column is-5">
            <Table />
            <Pagination />
        </div>
        <div class="column is-7">
            <Details />
        </div>

    {:catch error }
        <Error error={error} />
    {/await}
</section>
