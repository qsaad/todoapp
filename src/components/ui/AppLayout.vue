<template>
    <v-app>
<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
<!-- SIDEBAR -->
<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
        <v-navigation-drawer clipped fixed v-model="drawer" app>
            <v-list dense>
                <v-list-tile @click="1">
                  <v-list-tile-action>
                    <v-icon>face</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{currentUser}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <v-list dense>
                <v-list-tile @click="gotoPage(link.page)" :key="link.name" v-for="link in sidebarLinks">
                  <v-list-tile-action>
                    <v-icon>{{ link.icon }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ link.name }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
<!-- TOP MENU -->
<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
        <v-toolbar color="teal darken-4" dark fixed app clipped-left>
            <v-btn to="/" icon large>
                <v-avatar size="32px" tile>
                    <img src="../../assets/images/QSAAD_Logo.png" alt="QSAAD">
                </v-avatar>
            </v-btn>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="hidden-xs-only"> TODO APP</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn flat :to="link.page" :key="link.name" v-for="link in topbarLinks">
                    <v-badge color="orange" v-if="link.isBadge">
                        <span slot="badge">{{tasksPendingCount}}</span>
                        {{ link.name}}
                    </v-badge>
                    <span v-else>
                        {{ link.name}}
                    </span>
                </v-btn>
            </v-toolbar-items>
            <v-spacer></v-spacer>
            <v-avatar class="teal hidden-xs-only" >
                <span class="white--text headline">{{ currentRole() }}</span>
            </v-avatar>
            <v-btn icon @click="gotoNotification()">
                <v-badge overlap color="orange">
                    <span slot="badge" v-if="notificationsUnreadCount > 0">{{notificationsUnreadCount}}</span>
                    <v-icon>notifications</v-icon>
                </v-badge>
            </v-btn>
            <!-- <v-btn icon @click="gotoSetting()" class="hidden-sm-and-down">
                <v-icon>settings</v-icon>
            </v-btn> -->
            <v-btn icon @click="signout">
                <v-icon>exit_to_app</v-icon>
            </v-btn>
        </v-toolbar>
<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
<!-- MAIN CONTENT -->
<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
        <v-container fluid>
            <v-layout row wrap justify-center>
                <v-flex xs12 sm8 md6>
                    <slot name="app-content">
                    </slot>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
    import firebase from 'firebase'
    import db from '../config/firebaseInit'
    import { mapGetters, mapActions } from 'vuex'

    export default{
        name:'app-layout',
        components:{
            
        },
        vuex: {
            getters: {
            }
        },
        data(){
            return{
                drawer: true,
                isLoggedIn : false,
                currentUser : '',
                sidebarLinks :[
                    {page:'dashboard',icon:'home',name:'Dashboard'},
                    {page:'team',icon:'group',name:'Team'},
                    {page:'project',icon:'create_new_folder',name:'Project'},
                    {page:'proposal',icon:'create_new_folder',name:'Proposal'},
                    {page:'task',icon:'event',name:'Task'},
                    {page:'comment',icon:'announcement',name:'Comment'},
                    {page:'setting',icon:'settings',name:'Setting'},
                    {page:'backlog',icon:'list',name:'Backlog'},
                    {page:'admin',icon:'list',name:'Admin'},
                ],
                topbarLinks:[
                    {page:'/dashboard', name:'Dashboard', isBadge:false},
                    {page:'/team', name:'Team', isBadge:false},
                    {page:'/project', name:'Project', isBadge:false},
                    {page:'/proposal', name:'Proposal', isBadge:false},
                    {page:'/task', name:'task', isBadge:true},
                    {page:'/comment', name:'comment', isBadge:false},
                    {page:'/backlog', name:'Backlog', isBadge:false},
                    {page:'/admin', name:'Admin', isBadge:false},
                ],
            }
        },//DATA
        created(){
            if(firebase.auth().currentUser){
                this.isLoggedIn = true
                this.currentUser = firebase.auth().currentUser.email
            }
            if(this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm){
                    this.drawer = false
                }
        },//CREATED
        computed:{
            ...mapGetters(['userRole','userEmail','notificationsUnreadCount','tasksPendingCount']),
            notifications(){
                return 2
            },
            tasksCount(){
                return this.tasksPendingCount
            }
            
        },//COMPUTED
        methods:{
            ...mapActions(['setUserRole','getUsers',]),
           
            currentUserName(){
                let user = firebase.auth().currentUser;
                let name = user.email
                return _.toUpper(name.slice(0,1))
                //let name = _.split(user.email, '@',1);
                //return  name[0];
            },
            currentRole(){
                let role = this.userRole
                return _.toUpper(role.slice(0,1))
            },
            signout(){
                firebase.auth().signOut()
                .then(()=>{
                    this.$router.replace('/')
                })
                 .catch(function(err) {
                   // Handle errors
                 });
            },//SIGNOUT
            gotoPage(page){
                return this.$router.replace(page)
            },
            
        },//METHODS
    }

</script>

<style>

</style>