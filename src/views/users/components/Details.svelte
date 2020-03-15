<script>
    import { userSelected, userCountry, updateUser } from '../../../store'
    import { Info } from '../../../components';

    let name = '';
    let company = '';

    $: setUser($userSelected)

    function setUser(userSelected) {
        name = userSelected.name;
        company = userSelected.company;
    }

    function resetUser() {
        setUser($userSelected)
    }

    function handleSaveUser() {
        updateUser({
            ...$userSelected,
            name,
            company
        })
    }

</script>

{#if !$userSelected.id}
    <Info infoMessage='No user selected' />
{:else}
    <div class="subtitle">User {$userSelected.name}</div>
    <div class="field is-horizontal">
        <div class="field-label is-normal">
            <label class="label">Name</label>
        </div>
        <div class="field-body">
            <div class="field">
                <div class="control">
                    <input class="input" bind:value="{name}" >
                </div>
            </div>
        </div>
    </div>
    <div class="field is-horizontal">
        <div class="field-label is-normal">
            <label class="label">Company</label>
        </div>
        <div class="field-body">
            <div class="field">
                <div class="control">
                    <input class="input" bind:value="{company}" >
                </div>
            </div>
        </div>
    </div>
    {#if $userCountry}
        <pre>Country {$userCountry.code}</pre>
    {/if}
    <div class="buttons are-small">
        <button class="button" on:click={handleSaveUser}>Save</button>
        <button class="button" on:click={resetUser}>Reset</button>
    </div>
{/if}
