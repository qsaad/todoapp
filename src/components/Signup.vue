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
                        <v-icon color="white">account_box</v-icon>
                        <v-toolbar-title class="white--text">
                            Create New Account
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card class="px-4">
                        <v-card-text>
                            <v-text-field label="Name" v-model="name"></v-text-field>
                            <v-text-field label="Email" v-model="email"></v-text-field>
                            <v-text-field label="Password" v-model="password"></v-text-field>
                            <v-btn @click="signup" color="primary">Signup</v-btn>
                            <div class="pt-2 pb-0 mb-0 body-2 green--text">
                                Go back to
                                <router-link to="/login"><button>login</button></router-link>
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
        name:'signup',
        data(){
            return{
                name:'',
                email:'',
                password:''
            }
        },//DATA
        methods:{
            signup(){
                firebase.auth().createUserWithEmailAndPassword(this.email,this.password)
                .then((user)=>{
                        alert('Your account has been created !')
                        this.$router.replace('dashboard')
                        this.name = ''
                        this.email = ''
                        this.password = ''
                    },
                    (err) => {
                        alert('Oops ' + err.message)
                    }
                )
            }//FIGNUP
        },//METHODS
        computed:{

        },//COMPUTED
    }
</script>

<style scoped>

</style>