<template>
    <div>
    <v-container>
        <v-layout justify-center>
            <v-flex xs12 sm10 md8>
                <v-card>
                    <v-card-text class="title teal darken-2 white--text pt-2 pb-2"><strong><slot name="card_header"></slot></strong></v-card-text>
                    <v-container fluid grid-list-lg class="pt-0">
                        <v-layout row wrap justify-center>
                            <v-flex xs12 sm6 md3 v-if="card_1">
                                <v-card flat tile >
                                    <slot name="card_content"></slot>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <v-card-text class="grey lighten-2 grey--text text--darken-1 text-xs-left pt-0">
                        <strong>FOOTNOTES</strong>
                        <slot name="card_footnotes"></slot>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
    </div><!-- ROOT -->
</template>

<script>
export default{
        name:'module-layout',
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