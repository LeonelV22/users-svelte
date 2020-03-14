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
                    {#each Object.values(_countries) as country}
                        <tr>
                            <td>{country.id}</td>
                            <td>{country.name}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {:catch error }
        <Error error={error} />
    {/await}
</section>

