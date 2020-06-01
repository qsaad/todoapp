<template>
    <app-layout>
        <template slot="app-content">
            <v-toolbar color="teal darken-1" dark >
                <v-toolbar-title>BACKLOG</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card flat>
                  HELLO
            </v-card>
        </template>
    </app-layout>
</template>

<script>
    import AppLayout from './ui/AppLayout.vue'
    import { mapGetters, mapActions } from 'vuex'

    export default{
        name:'backlog',
        components:{
            AppLayout
        },//COMPONENTS
        data(){
            return{
              
            }//RETURN
        },//DATA
        created(){
          
        },//CREATED
        mounted(){
           
        },//MOUNTED
        computed:{
           
        },//COMPUTED
        methods:{
            
        }//METHODS
    }//EXPORT DEFAULT

</script>

<style scoped>

</style>