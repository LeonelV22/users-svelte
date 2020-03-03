<script>
    import { userSelected, userCountry } from '../../../store'
    import { Info } from '../../../components';
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
                    <input class="input" value="{$userSelected.name}" >
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
                    <input class="input" value="{$userSelected.company}" >
                </div>
            </div>
        </div>
    </div>
    {#if $userCountry}
        <pre>Country {$userCountry.code}</pre>
    {/if}
{/if}
