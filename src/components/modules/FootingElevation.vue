<template>
    <div>
        <v-container fluid grid-list-md>
            <v-layout row wrap justify-center>
                <v-flex xs12 sm8 md5>
                    <v-toolbar  color="teal lighten-2 white--text pr-5" flat >
                        <v-icon>person_pin</v-icon>
                        <v-toolbar-title class="py-0">SignUp</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn @click="signout" flat>Signout</v-btn>
                    </v-toolbar>
                    <v-card class="px-4">
                        <v-card-text>
                            <v-text-field label="Name" v-model="user.name"></v-text-field>
                            <v-text-field label="Email" v-model="user.email"></v-text-field>
                        </v-card-text>

                        <v-list two-line subheading>
                          <v-list-tile avatar v-for="user in users" :key="user.name">
                            <v-list-tile-action>
                              <v-icon>star</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title v-text="user.name"></v-list-tile-title>
                              <v-list-tile-sub-title v-text="user.email"></v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <v-avatar>
                                    <v-btn @click="editUser(user)" flat icon d-flex><v-icon>edit</v-icon></v-btn>
                                </v-avatar>
                                <v-avatar>
                                    <v-btn @click="deleteUser(user)" flat icon d-flex><v-icon>delete</v-icon></v-btn>
                                </v-avatar>
                            </v-list-tile-action>
                          </v-list-tile>
                        </v-list>
                        <v-btn absolute dark fab top right color="indigo  white--text" @click="addUser">
                            <v-icon>add</v-icon>
                        </v-btn>
                    </v-card>
                    <v-divider></v-divider>
                    <v-btn to="/" color="teal white--text" ripple>Home</v-btn>

                </v-flex>
            </v-layout>
        </v-container>
    </div><!-- ROOT -->
</template>

<script>
    import firebase from 'firebase'
    import db from '../config/firebaseInit'

    export default{
        name:'footing-elevation',
        components:{

        },
        data(){
            return{
                user:{
                    name:'',
                    email:''
                },
                users:[],
                updateKey : ''
            }
        },
        firestore() {
            return {
                users: db.collection('users'),
            }
        },
        created(){
            this.getUsers()
        },
        mounted(){
        },
        computed:{
            data(){
            }
        },//COMPUTED
        methods:{
            signout(){
                firebase.auth().signOut()
                    .then(()=>{
                        this.$router.replace('login')
                    })
                    .catch(function (err) {
                    // Handle errors
                });
            },
            getUsers(){
                db.collection("users").get()
                    .then(querySnapshot => {
                        const users = []
                        querySnapshot.forEach(doc => {
                            users.push(doc.data())
                        })
                    this.users = users
                    })
            },
            addUser(){
                //db.collection('users').add(this.user).then(this.getUsers)
                this.$firestore.users.add(this.user).then(this.getUsers)
                this.user = ''
            },
            deleteUser(user){
                console.log(user['.key'])
                //this.$firestore.users.doc(user['.key']).delete()
            },
            editUser(user){
                console.log(user['.key'])

            },
            updateUser(){

            },
            cancel(){

            }
        }//METHODS
    }
</script>

<style scoped>

</style>