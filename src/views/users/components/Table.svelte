<script>
    import {users, userSelected} from '../../../store/users';

    function handleClick(user) {
        userSelected.update(() => user);
    }
</script>
<style type="text/scss">
    td {
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .table.is-clickable tbody tr:not(.is-selected) {
        cursor: pointer;
        &:active {
         background-color: #e6fff1;
        }
    }

</style>

<table class="table is-hoverable is-bordered is-clickable">
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Company</th>
        </tr>
    </thead>
    <tbody>
        {#each $users as user}
        <tr on:click="{() => handleClick(user)}">
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.company}</td>
        </tr>
        {/each}
    </tbody>
</table>
