<template>
   <app-layout>
            <template slot="app-content">
                <card-layout>
                    <template slot="card_header">Invite</template>
                    <!-- <template	slot="card_group">{{activeGroup}}</template> -->
                    <template slot="card_content">
                        <v-text-field label="Group" v-model="group"></v-text-field>
                        <v-text-field label="Email" v-model="email"></v-text-field>
                        <v-btn color="primary">Send Invitation</v-btn>
                    </template>
                    <template slot="card_footer"></template>
                </card-layout>
            </template>
    </app-layout>

</template>

<script>
import CardLayout from './ui/CardLayout.vue'
import AppLayout from './ui/AppLayout.vue'
import firebase from 'firebase'
import db from './config/firebaseInit'

import { mapGetters, mapActions } from 'vuex'

export default{
        name:'invite',
        components:{
            CardLayout,AppLayout
        },
        data(){
            return{
                group :'',
                email:''
            }
        },//DATA
        mounted(){
        },//MOUNTED
        computed:{
            ...mapGetters(['activeGroup','userEmail','userRole']),
            data(){
                let user = firebase.auth().currentUser;

                this.name = user.email

                firebase.auth().onAuthStateChanged(function(user) {
                  if (user) {
                    //alert()
                    // User is signed in.
                    //this.name = user.displayName;
                    // var email = user.email;
                    // var emailVerified = user.emailVerified;
                    // var photoURL = user.photoURL;
                    // var isAnonymous = user.isAnonymous;
                    // var uid = user.uid;
                    // var providerData = user.providerData;
                    // ...
                  } else {
                    //this.name = 'Anonymous'
                    // User is signed out.
                    // ...
                  }
                });

            }
        },//COMPUTED
        methods:{
            ...mapActions([]),

        }//METHODS
    }

</script>

<style scoped>

</style>