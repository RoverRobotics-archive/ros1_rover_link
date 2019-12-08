<template>
     <section class="rover-control">
          <video class="stream" ref="tele-video" width="100%" height="100%" id="vid" autoplay playsinline="true" webkit-playsinline="true" muted="muted"></video>
          <MobileControls />
     </section>

</template>

<script>
    import MobileControls from "./MobileControls";
    export default {
        name: "Dashboard",
         components: {MobileControls},
         mounted() {
              this.$store.dispatch('teleopConnect', this.$refs['tele-video']);
      },
     created() {
          this.$store.dispatch('initROS');
       }
    }

</script>

<style scoped>

</style>