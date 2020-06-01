<template>
    <v-app>
        <v-toolbar color="indigo" dark fixed app clipped-left>
            <v-btn to="/" icon large>
                <v-avatar size="32px" tile>
                    <img src="../assets/images/QSAAD_Logo.png" alt="QSAAD">
                </v-avatar>
            </v-btn>
            <v-toolbar-title class="hidden-xs-only"> TODO APP</v-toolbar-title>
        </v-toolbar>
        <v-container fluid>
            <v-layout row wrap justify-center>
                <v-flex xs12 sm6 md4 lg3>
                    <v-toolbar color="indigo">
                        <v-icon color="white">lock</v-icon>
                        <v-toolbar-title class="white--text">
                            Reset Password
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card class="px-4">
                        <v-card-text>
                            <v-text-field label="Email" v-model="email"></v-text-field>
                            <v-btn @click="reset" color="primary">Send Link</v-btn>
                            <div class="pt-2 pb-0 mb-0 body-2 green--text">
                                Go back to
                                <router-link to="/login"><button>login</button></router-link>
                            </div>
                            <div class="pt-2 pb-0 mb-0 body-2 green--text">
                                You don't have an account ? You can
                                <router-link to="/signup"><button>create one</button></router-link>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
import firebase from 'firebase'
import db from './config/firebaseInit'

  export default{
    name:'reset',
    data(){
        return{
            email:'',
        }
    },//DATA
    methods:{
        reset(){
            firebase.auth().sendPasswordResetEmail(this.email)
            .then(() => {
                this.$router.replace('login');
            }
            )
             .catch(function(err) {
               // Handle errors
             });
        },//LOGIN
    },//METHODS
    computed:{

    },//COMPUTED
  }
</script>

<style scoped>

</style>