<script>
    import { countries } from '../store/countries';
    import { Error } from '../components';
</script>


<section class="columns">
    {#await countries.fetchAll()}
        <div class="container">
            <progress class="progress is-small is-primary" max="100"></progress>
        </div>
    {:then _countries}
        <div class="column is-5">
            <table class="table is-hoverable is-bordered">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                    {#each Object.values(_countries) as { id, name }, i }
                        {#if i < 10}
                            <tr>
                                <td>{id}</td>
                                <td>{name}</td>
                            </tr>
                        {/if}
                    {/each}
                </tbody>
            </table>
        </div>
    {:catch error }
        <Error error={error} />
    {/await}
</section>

