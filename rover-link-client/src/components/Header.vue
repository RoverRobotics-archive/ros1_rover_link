<template>
    <header class="header">
        <ul class="header-widgets">
            <li class="header-widgets__widget header-widgets__widget--settings">
                <router-link to="/">
                    <svg>
                        <use xlink:href="../assets/solid.svg#cog"></use>
                    </svg>
                </router-link>
            </li>
            <li class="header-widgets__widget">
                 <label for="linear-velocity">
                     <svg>
                        <use xlink:href="../assets/solid.svg#arrow-up"></use>
                    </svg>
                     <span>Linear</span>
                 </label>
                 <input onkeydown="return false;" @input="updateLinearVelocity" id="linear-velocity" type="range" min="1" max="100" value="25" class="range-widget"/>
                <span>{{this.$store.getters.linearSpeed}}%</span>
            </li>
            <li class="header-widgets__widget">
                 <label for="angular-velocity">
                    <svg>
                        <use xlink:href="../assets/solid.svg#redo-alt"></use>
                    </svg>
                     <span>Angular</span>
                 </label>
                 <input onkeydown="return false;" @input="updateAngularVelocity" id="angular-velocity" type="range" min="1" max="100" value="25" class="range-widget"/>
                 <span>{{this.$store.getters.angularSpeed}}%</span>
            </li>
             <li class="header-widgets__widget">
                <div class="battery">
                    <div class="battery__inner" v-bind:class="{battery__charging:(this.$store.getters.batterySOC)}" v-bind:style="{width: this.$store.getters.slowRateData.reg_robot_rel_soc_a + '%'}">
                    </div>
                </div>
                 <span class="battery-percentage"> {{this.$store.getters.slowRateData.reg_robot_rel_soc_a}}%</span>
            </li>
        </ul>
    </header>
</template>

<script>
    export default {
        name: "Header",

        methods: {
            updateLinearVelocity(e) {
                this.$store.dispatch("updateLinearSpeed", e.target.value);
            },
              updateAngularVelocity(e) {
                this.$store.dispatch("updateAngularSpeed", e.target.value);
            }
        }
    }
</script>
