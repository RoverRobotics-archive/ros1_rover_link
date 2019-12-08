<template>
  <div id="app">
    <router-view/>
    <Snackbar />
  </div>
</template>

<style lang="scss">
@import "sass/main.scss";
</style>
<script>
  import Snackbar from "./components/Snackbar";
  import { mapActions } from "vuex";
  export default {
    components: {Snackbar},
  }

</script>