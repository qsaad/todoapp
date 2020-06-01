<template>
    <app-layout>
            <template slot="app-content">
                <v-toolbar color="teal darken-1" dark >
                    
                    <v-toolbar-title>TEAM</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-text-field append-icon="search" label="Search" single-line hide-details clearable v-model="search" color="white" class="mb-1 pb-0"></v-text-field>
                </v-toolbar>
                    <v-card flat>
                        <v-btn fab small color="light-green darken-1" top left absolute @click.native.stop="dialog = !dialog" v-if="userRole == 'Admin'">
                            <v-icon color="white">add</v-icon>
                        </v-btn>
                        <v-layout row>
                            <v-flex xs12>
                                <v-btn-toggle v-model="teamStatus" class="mt-2 mb-2">
                                    <v-btn flat value="All">
                                        <v-badge color="green" >
                                            <span slot="badge" v-if="teamStatus =='All'">{{userCount}}</span>
                                            <span>All</span>
                                        </v-badge>
                                    </v-btn>
                                    <v-btn flat value="Admin">
                                        <v-badge color="green" >
                                            <span slot="badge" v-if="teamStatus =='Admin'">{{userCount}}</span>
                                            <span>Admin</span>
                                        </v-badge>
                                    </v-btn>
                                    <v-btn flat value="User">
                                        <v-badge color="green" >
                                            <span slot="badge" v-if="teamStatus =='User'">{{userCount}}</span>
                                            <span>User</span>
                                        </v-badge>
                                    </v-btn>
                                    <v-btn flat value="Guest">
                                        <v-badge color="green" >
                                            <span slot="badge" v-if="teamStatus =='Guest'">{{userCount}}</span>
                                            <span>Guest</span>
                                        </v-badge>
                                    </v-btn>
                                </v-btn-toggle>
                            </v-flex>
                        </v-layout>
                    </v-card>
                    <v-data-iterator 
                        content-tag="v-layout" 
                        column 
                        loading
                        :items="items" 
                        :rows-per-page-items="rowsPerPageItems"
                        :pagination.sync="pagination" 
                        :search="search"
                    >
                        <v-list three-line slot="item" slot-scope="props" class="pa-0 ma-0">
                            <v-list-tile @click="" class="pa-0 ma-0">
                                <v-list-tile-action>
                                    <v-avatar :tile="false" :size="36" color="green lighten-3">{{ initial(props.item.email) }}</v-avatar>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ props.item.name }}</v-list-tile-title>
                                    <v-list-tile-sub-title class="tooLong">{{ props.item.email }}</v-list-tile-sub-title>
                                    <v-list-tile-sub-title v-if="props.item.start">{{ props.item.start }} to {{ props.item.end }}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-list-tile-action-text>{{ props.item.role }}</v-list-tile-action-text>
                                    <v-layout row v-if="userRole == 'Admin' ">
                                        <v-flex xs12>
                                            <v-btn icon class="mx-0" @click="editItem(props.item)">
                                                <v-icon color="teal">edit</v-icon>
                                            </v-btn>
                                            <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                                                <v-icon color="pink">delete</v-icon>
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-divider class="pa-0 ma-0"></v-divider>
                        </v-list>
                    </v-data-iterator>
                

                <v-dialog v-model="dialog" max-width="500px">
                          <v-card>
                            <v-card-title>
                              <span class="headline">{{ formTitle }}</span>
                            </v-card-title>
                            <v-card-text>
                              <v-container grid-list-md>
                                <v-layout wrap>
                                  <v-flex xs12>
                                    <v-text-field label="Name" v-model="editedItem.name" prepend-icon="person"></v-text-field>
                                  </v-flex>
                                  <v-flex xs12>
                                    <v-text-field label="Email" v-model="editedItem.email" prepend-icon="email"></v-text-field>
                                  </v-flex>
                                  <v-flex xs12>
                                    <v-autocomplete label="Role" :items="rolesList" v-model="editedItem.role"  clearable prepend-icon="navigation"></v-autocomplete>
                                  </v-flex>
                                  <v-flex xs6>
                                    <v-dialog ref="dialogStart" persistent v-model="modalStart" lazy full-width width="290px" :return-value.sync="editedItem.start">
                                            <v-text-field slot="activator" label="Vacation Start" v-model="editedItem.start" prepend-icon="event" readonly></v-text-field>
                                            <v-date-picker v-model="editedItem.start" scrollable>
                                                <v-spacer></v-spacer>
                                                <v-btn flat color="primary" @click="modalStart = false">Cancel</v-btn>
                                                <v-btn flat color="primary" @click="$refs.dialogStart.save(editedItem.start)">OK</v-btn>
                                            </v-date-picker>
                                        </v-dialog>
                                  </v-flex>
                                  <v-flex xs6>
                                    <v-dialog ref="dialogEnd" persistent v-model="modalEnd" lazy full-width width="290px" :return-value.sync="editedItem.end">
                                            <v-text-field slot="activator" label="Vacation End" v-model="editedItem.end" prepend-icon="event" readonly></v-text-field>
                                            <v-date-picker v-model="editedItem.end" scrollable>
                                                <v-spacer></v-spacer>
                                                <v-btn flat color="primary" @click="modalEnd = false">Cancel</v-btn>
                                                <v-btn flat color="primary" @click="$refs.dialogEnd.save(editedItem.end)">OK</v-btn>
                                            </v-date-picker>
                                        </v-dialog>
                                  </v-flex>
                                </v-layout>
                              </v-container>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                              <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
                            </v-card-actions>
                          </v-card>
                </v-dialog>
            </template>
    </app-layout>

</template>

<script>
import AppLayout from './ui/AppLayout.vue'
import swal from 'sweetalert2'

import { mapGetters, mapActions } from 'vuex'

export default{
        name:'team',
        components:{
            AppLayout
        },
        data(){
            return{
                search: '',
                dialog: false,
                rowsPerPageItems: [5, 10, 15],
                pagination: {
                  rowsPerPage: 10
                },
                editedIndex: '',
                editedItem: {
                    name: '',
                    email: '',
                    role: 'User',
                    start:'',
                    end:''
                },
                defaultItem: {
                    name: '',
                    email: '',
                    role: 'User',
                    start:'',
                    end:''
                },
                rolesList:['Admin','User','Guest'],
                teamStatus : 'All',
                userCount : '',
                modalStart:false,
                modalEnd:false,
            }//RETURN
        },//DATA
        created () {
           
        },//CREATED
        mounted(){
            this.$store.commit('GET_USERS');
        },//MOUNTED
        updated(){
            this.$store.commit('GET_USERS');
        },
        computed:{
            ...mapGetters(['userEmail','userRole','users','usersCount',
                            'usersAdmin','usersUser','usersGuest',
                            'usersAdminCount','usersUserCount','usersGuestCount',
                        ]),
            formTitle () {
                return this.editedIndex === '' ? 'NEW MEMBER' : 'EDIT MEMBER'
            },
            items(){
                //this.$store.commit('GET_USERS')
                switch(this.teamStatus) {
                    case 'Admin':
                        this.userCount = this.usersAdminCount
                        return this.usersAdmin
                        break;
                    case 'User':
                        this.userCount = this.usersUserCount
                        return this.usersUser
                        break;
                    case 'Guest':
                        this.userCount = this.usersGuestCount
                        return this.usersGuest
                        break;
                    default:
                        this.userCount = this.usersCount
                        return this.users
                        break;
                }
            }
        },//COMPUTED
        watch: {
            dialog (val) {
                val || this.close()
            }
        },//WATCH
        methods:{
            ...mapActions(['addUser','updateUser','deleteUser']),
            initial(email){
                let name = (_.find(this.users,['email', email])).name
                return _.toUpper(name.split(' ').map( item=> {return item[0]}).join(''))
            },
            //EDIT
            editItem (item) {
                this.editedIndex = item.email
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },
            //DELETE
            deleteItem (item) {
                swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                })
                .then((result) => {
                    if (result.value) {
                        swal(
                        'Deleted!',
                        'User has been deleted.',
                        'success'
                        )
                        this.deleteUser(item)
                    }
                })
            },
            //CLOSE
            close () {
                this.dialog = false
                setTimeout(() => {
                  this.editedItem = Object.assign({}, this.defaultItem)
                  this.editedIndex = ''
                }, 300)
            },
            //SAVE
            save () {
                if (this.editedIndex != '') {
                    let data = _.merge(this.editedItem,{key : this.editedIndex})
                    this.updateUser(data)
                    this.editedIndex = ''
                }
                else {
                    this.addUser(this.editedItem)
                }
                this.close()
            }
        }//METHODS
    }

</script>

<style scoped>

</style>