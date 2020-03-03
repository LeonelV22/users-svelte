<script>
    import './style.scss';
    import { Router, Route } from "svelte-routing";

    import { NavBar, Error } from './components';
    import Users from './views/users/Users.svelte';

    export let url = '';
</script>

<Router {url}>
    <NavBar />
    <main>
        <Route path="/" component={Users} />
        <Route path="/users" component={Users} />
        <Route path="**" > <Error error="NOT FOUND" /> </Route>
    </main>
</Router>
