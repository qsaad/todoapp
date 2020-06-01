<template>
    <div>
        <v-app>
         <v-toolbar color="teal lighten-2" fixed app>
                <v-btn to="/" icon large>
                    <v-avatar size="32px" tile>
                      <img
                        src="../assets/images/QSAAD_Logo.png"
                        alt="QSAAD"
                      >
                    </v-avatar>
                </v-btn>

            </v-toolbar>

        <v-content class="pt-0">
                <v-container>
                    <v-layout justify-center align-start>
                        <v-flex xs12>
                            <keep-alive>
                                <component :is="currentComponent"></component>
                            </keep-alive>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-content>
    </v-app>
    </div>
</template>
<script>

import FootingElevation from './modules/FootingElevation.vue'

export default{
        data(){
            return{
                //currentComponent: 'modules-list',
                currentComponent: 'footing-elevation',
            }
        },

        components:{
            FootingElevation
        },
        methods: {
            swapComponent(component) {
                this.currentComponent = component;
            }, //SWAP COMPONENT
        } //METHODS
    }
</script>

<style scoped>

</style>