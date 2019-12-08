<template>
    <div>
        <div v-for="(message,i ) in notificationMessages" class="snackbar" v-bind:class="{ 'snackbar--warning': message.type === 'warning' , 'snackbar--danger': message.type === 'danger' }" v-bind:style="{ top:  (90 - i * 10) + '%' }">
           {{message.message}}

        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    export default {
        name: "Snackbar",
       computed: mapGetters(['notificationShow', 'notificationMessages'])

    }

</script>

