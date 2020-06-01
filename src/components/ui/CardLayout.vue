<template>
    <div>
    <v-container>
        <v-layout justify-center>
            <v-flex xs12>
                <v-toolbar color="green lighten-2">
                    <v-toolbar-title><strong><slot name="card_header"></slot></strong></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-title><strong><slot name="card_group"></slot></strong></v-toolbar-title>
                </v-toolbar>
                <v-card>
                    <!-- <v-card-text class="title teal darken-2 white--text pt-2 pb-2"><strong><slot name="card_header"></slot></strong></v-card-text> -->
                    <v-container fluid grid-list-lg class="pt-0">
                        <v-layout row wrap justify-center>
                            <v-flex xs12>
                                <v-card flat tile >
                                    <slot name="card_content"></slot>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <v-card-text class="green lighten-4 text-xs-left pt-0">
                        <strong>FOOTNOTES</strong>
                        <slot name="card_footer"></slot>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
    </div><!-- ROOT -->
</template>

<script>
export default{
        name:'card-layout',
        components:{
        },
        props:{
            //noCards : {type:Number,default:2}
        },
        data(){
            return{

            }
        },
        mounted(){
        },
        computed:{

        },//COMPUTED
        methods:{
            
        }//METHODS
    }
</script>

<style scoped>

</style>