<script>
    import { getUsers, pagination } from '../../../store/users'

    function handlePagination(page, shouldTrigger = () => true) {
        if (shouldTrigger($pagination.currentPage, page)) {
            return getUsers(page)
        }
        return false;
    }

    $: isFirstPage = $pagination.currentPage === 1;
    $: isLastPage = $pagination.currentPage === $pagination.lastPage;
</script>
<style type="text/scss">
    .pagination-previous, .pagination-next, .pagination-link {
        &.disabled {
             background-color: #dbdbdb;
             border-color: #dbdbdb;
             box-shadow: none;
             color: #7a7a7a;
             opacity: 0.5;
             cursor: not-allowed;
         }
    }
</style>

<nav class="pagination is-small" role="navigation" aria-label="pagination">
    <div class="pagination-previous"
         class:disabled="{isFirstPage}"
         on:click={
         () => handlePagination($pagination.currentPage - 1, () => !isFirstPage)
        }>
        Previous
    </div>
    <div class="pagination-next"
         class:disabled="{isLastPage}"
         on:click={() => handlePagination($pagination.currentPage + 1, () => !isLastPage)}
    >
        Next page
    </div>
    <ul class="pagination-list">
        <li>
            <div class="pagination-link"
                 class:is-current={isFirstPage}
                 on:click={() => handlePagination(1, () => !isFirstPage)}
            >
                1
            </div>
        </li>
        {#if !isFirstPage && !isLastPage}
            <li>
                <div class="pagination-link is-current">{$pagination.currentPage}</div>
            </li>
        {/if}
        <li>
            <span class="pagination-ellipsis">&hellip;</span>
        </li>
        <li>
            <div class="pagination-link"
                 class:is-current={isLastPage}
                 on:click={() => handlePagination($pagination.lastPage, () => !isLastPage)}
            >
                {$pagination.lastPage}
            </div>
        </li>
    </ul>
</nav>
