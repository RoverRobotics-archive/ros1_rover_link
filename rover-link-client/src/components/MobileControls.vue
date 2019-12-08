<template>
    <div>
<!--        <div class="controls">-->
<!--            <button data-val="87"  v-touch:start="touchDown"  v-touch:end="touchUp" class="rover__control">Control</button>-->
<!--&lt;!&ndash;            <button data-val="65"  v-touch:start="touchDown"  v-touch:end="touchUp" class="controls__left">Left</button>&ndash;&gt;-->
<!--&lt;!&ndash;            <button data-val="83"  v-touch:start="touchDown"  v-touch:end="touchUp" class="controls__down">Down</button>&ndash;&gt;-->
<!--&lt;!&ndash;            <button data-val="68"  v-touch:start="touchDown"  v-touch:end="touchUp" class="controls__right">Right</button>&ndash;&gt;-->
<!--        </div>-->
    </div>
</template>

<script>
    import { mapActions } from "vuex"
    export default {
        name: "MobileControls",
        methods: {
            touchDown(e) {
              this.$store.dispatch("mobileControl", e.target.dataset.val)
            },
            touchUp() {
                this.$store.dispatch("mobileControl", "stop")
            }


        }
    }
</script>

<style scoped>

</style>