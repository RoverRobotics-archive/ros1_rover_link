<template>
    <div>
        <AdminHeader title="Developer Settings" />
        <section class="control-panel">
            <div class="control-item">
                <label class="control-item__label">ROS URL</label>
                <input v-model="rosURL" id="ros-url" class="control-item__input" type="text" name="ros-url" placeholder="ROS url" />
                <button @click="setROSURL(rosURL)" class="btn btn--setting">Update</button>
            </div>
             <div class="control-item">
                <label class="control-item__label">JANUS URL</label>
                <input v-model="janusURL" id="janus-url" class="control-item__input" type="text" name="ros-url" placeholder="Janus url" />
                <button @click="setJanusUrl(janusURL)" class="btn btn--setting">Update</button>
            </div>
        </section>
    </div>
</template>

<script>

    import { mapGetters, mapActions } from 'vuex';
    import AdminHeader from "../components/AdminHeader";
    export default {
        name: "DeveloperSettings",
        components: {AdminHeader},
        data() {
          return {
            rosURL: JSON.parse(window.localStorage.getItem('rosURL')) || `ws://${window.location.hostname}:9090`,
            janusURL: this.$store.getters.janusURL
          }
        },
        methods: {
            ...mapActions(['setROSURL','getROSURL', 'showNotification', 'setJanusUrl'])
        },
    }
</script>
