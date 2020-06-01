<template>
    <app-layout>
        <template slot="app-content">
            <v-toolbar color="teal darken-1" dark flat>
                <v-toolbar-title>NOTIFICATIONS</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field append-icon="search" label="Search" single-line hide-details clearable v-model="search" color="white" class="mb-1 pb-0"></v-text-field>
            </v-toolbar>

            <v-layout row>
                <v-flex xs12>
                    <v-btn-toggle v-model="notificationStatus" class="mt-2 mb-2">
                        <v-btn flat value="unread">Unread</v-btn>
                        <v-btn flat value="read">Read</v-btn>
                    </v-btn-toggle>
                </v-flex>
            </v-layout>

            <v-data-iterator content-tag="v-layout" column :items="items" hide-actions :search="search">
                <v-list two-line slot="item" slot-scope="props">
                    <v-list-tile @click="" class="pa-0 ma-0">
                        <v-list-tile-action>
                            <v-checkbox v-model="props.item.read" @change="viewItem(props.item)"></v-checkbox>
                        </v-list-tile-action>
                        <v-list-tile-action>
                                    <v-avatar :tile="false" :size="36" v-if="props.item.read" color="blue lighten-4 white--text text--lighten-4">
                                        {{ initial(props.item.assigned_by) }}
                                    </v-avatar>
                                    <v-avatar :tile="false" :size="36" v-else color="blue lighten-2 white--text text--lighten-4">
                                        {{ initial(props.item.assigned_to) }}
                                    </v-avatar>
                                </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title :class="readNotification(props.item.read)">{{ props.item.subject }}</v-list-tile-title>
                            <v-list-tile-sub-title :class="[readNotification(props.item.read),'tooLong']">{{ props.item.body }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-list-tile-action-text>{{ props.item.created }}</v-list-tile-action-text>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                                        <v-icon color="pink">delete</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-divider></v-divider>
                </v-list>
            </v-data-iterator>

        </template>   
    </app-layout>
</template>

<script>
import AppLayout from './ui/AppLayout.vue'
import * as moment from 'moment'

import { mapGetters, mapActions } from 'vuex'

export default{
        name:'task',
        components:{
            AppLayout
        },
        data(){
            return{
               search : '',
               notificationStatus : 'unread',
            }
        },//DATA
        created () {
        },//CREATED
        mounted(){
            this.$store.commit('GET_NOTIFICATIONS');
        },//MOUNTED
        updated(){
            this.$store.commit('GET_NOTIFICATIONS');
        },
        computed:{
            ...mapGetters(['users','notifications','notificationsUnread','notificationsRead']),
          
            items(){
                //this.$store.commit('GET_NOTIFICATIONS')
               switch(this.notificationStatus) {
                    case 'unread':
                        return this.notificationsUnread
                        break;
                    case 'read':
                        return this.notificationsRead
                        break;
               }
            },
        },//COMPUTED
       
        methods:{
            ...mapActions(['toggleNotification','deleteNotification']),
            initial(email){
                let name = (_.find(this.users,['email', email])).name
                return _.toUpper(name.split(' ').map( item=> {return item[0]}).join(''))
            },
            readNotification(value){
                if(value){
                    return "teal--text text--lighten-4"
                }
            },
            deleteItem (item) {
                this.deleteNotification(item)
            },
            viewItem(item){
                this.toggleNotification(item)
            }
          

        }//METHODS
    }

</script>

<style scoped>
@media (max-width: 600px) {
    .tooLong {
        white-space: nowrap; 
        width: 150px; 
        overflow: hidden;
        text-overflow: ellipsis; 
    }
}


</style>