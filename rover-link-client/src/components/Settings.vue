<template>
    <div>
        <AdminHeader title="Control Panel" />
        <section class="control-panel">
             <div class="control-item">
                <router-link to="/app/rover-link">
                    <div class="control-item--bg">
                        <font-awesome-icon icon="gamepad" size="6x"/>
                        <span>Rover App</span>
                    </div>
                </router-link>
            </div>
            <div class="control-item">
                <router-link to="/settings/wifi">
                    <div class="control-item--bg">
                        <font-awesome-icon icon="wifi" size="6x"/>
                        <span>Network Manager</span>
                    </div>
                </router-link>
            </div>
            <div class="control-item">
                <router-link to="/settings/developer">
                    <div class="control-item--bg">
                        <font-awesome-icon icon="wrench" size="6x"/>
                        <span>Developer Settings</span>
                    </div>
                </router-link>
            </div>
         </section>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import AdminHeader from "./AdminHeader";
    export default {
        name: "Settings.vue",
        components: {AdminHeader},
        computed: {

        }
        // pass map getters to computed
    }
</script>

<style scoped>

</style>