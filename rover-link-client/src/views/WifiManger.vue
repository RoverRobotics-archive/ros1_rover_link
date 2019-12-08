<template>
    <section class="wifi-manager">
        <AdminHeader title="Network Manager" />
        <div class="networks">
            <button @click="rescan()" class="networks__rescan btn">Rescan For Networks</button>
            <table class="table">
                <tr>
                    <th>IN-USE</th>
                    <th>SSID</th>
                    <th>BARS</th>
                    <th>SECURITY</th>
                    <th>CONNECT</th>
                </tr>
                <tr v-for="ssid in ssids">
                    <th>
                        {{ssid[0]}}
                    </th>
                     <th>
                        {{ssid[1]}}
                    </th>
                     <th>
                        {{ssid[6]}}
                    </th>
                    <th>
                        {{ssid[7]}}
                    </th>
                    <th>
                        <button class="btn" @click="openConnectionModal(ssid[1])">connect</button>
                    </th>
                </tr>
            </table>
        </div>
        <div ref="connection-model" v-bind:class="{ 'model-active': modelOpen}" class="modal">
          <!-- Modal content -->
          <div class="modal-content">
            <span @click="closeConnectionModel()" class="close">&times;</span>
            <input v-model="connectPassword" class="model-password" type="password" placeholder="Enter Password"/>
            <button @click="connect()" class="model-submit btn">Connect</button>
          </div>
    </div>
    </section>

</template>

<script>
    import AdminHeader from "../components/AdminHeader";
    export default {
        name: "WifiManger",
        components: {AdminHeader},
        data: function () {
            return {
                modelOpen: false,
                connectPassword: '',
                connectSSID: ''
            }
        },
         mounted: function () {
            this.$store.dispatch("getSSIDS")
        },
        computed: {
            ssids() {
              return this.$store.getters.ssidList
            },
            scanning() {
                return this.$store.getters.scanning
            }
        },
        methods: {
            rescan() {
                this.$store.dispatch('rescanForSSIDS')
            },
            openConnectionModal(ssid) {
              this.modelOpen = true
              this.connectSSID = ssid
            },
            closeConnectionModel() {
              this.modelOpen = false
            },
            connect() {
                const creds = {
                    'ssid': this.connectSSID,
                    'password': this.connectPassword
                }
                this.$store.dispatch('connectWifi', creds)
                this.closeConnectionModel()
            }
        }
    }
</script>

<style scoped>

</style>