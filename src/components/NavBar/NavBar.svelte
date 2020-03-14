<script>
    import { Link } from 'svelte-routing';
    function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
        const isActive = href === '/' ? isCurrent : isPartiallyCurrent || isCurrent;
        let classes = 'navbar-item ';
        if (isActive) {
            classes = classes.concat('is-active');
        }
        return { class: classes };
    }
</script>

<style>
    .navbar {
        background-color: #dbd9de;
    }
</style>
<nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-menu">
        <div class="navbar-start">
            <Link to="/users" {getProps}>Users</Link>
            <Link to="/countries" {getProps}>Countries</Link>
        </div>
    </div>
</nav>
