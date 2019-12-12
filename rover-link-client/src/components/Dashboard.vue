<template>
     <section id="joystick-area">
          <video id="stream" class="stream" ref="tele-video" width="100%" height="100%"  autoplay playsinline="true" webkit-playsinline="true" muted="muted"></video>
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
       },
       destroyed() {
             window.location.reload(); // simple hack to destroy all rover state
       }
    }

</script>

<style scoped>

</style>