<template>
    <header>
        <div class="admin-header">
            <router-link to="/">
                <img class="admin-header__logo" src="../assets/rover-white.svg" />
            </router-link>
            <h1 class="admin-header__title">{{this.title}}</h1>
        </div>
    </header>
</template>

<script>
    import Header from "./Header";
    export default {
        name: "AdminHeader",
        components: {Header},
        props: ['title'],
    }
</script>

<style scoped>

</style>