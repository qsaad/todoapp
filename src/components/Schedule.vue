<template>
    <app-layout>
            <template slot="app-content">
                <card-layout>
                    <template slot="card_header">SCHEDULE</template>
										<!-- <template	slot="card_group">{{activeGroup}}</template> -->
                    <template slot="card_content">
<!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
<!-- START -->
<!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
                    <v-dialog v-model="dialog" max-width="500px">
                          <v-btn color="primary" dark slot="activator" class="mb-2">New Schedule</v-btn>
                          <v-card>
                            <v-card-title>
                              <span class="headline">{{ formTitle }}</span>
                            </v-card-title>
                            <v-card-text>
                              <v-container grid-list-md>
                                <v-layout wrap>
                                  <v-flex xs12 sm6 md4>
                                    <v-text-field label="Project Id" v-model="editedItem.project_id"></v-text-field>
                                  </v-flex>
                                  <v-flex xs12 sm6 md4>
                                    <v-text-field label="Issue" v-model="editedItem.issue"></v-text-field>
                                  </v-flex>
																	<v-flex xs12 sm6 md4>
                                    <v-text-field label="Due" v-model="editedItem.due"></v-text-field>
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

                        <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search" class="mb-4"></v-text-field>
                        <v-data-table :headers="headers" :items="items" :search="search" hide-actions class="elevation-1">
                          <template slot="items" slot-scope="props">
                            <td class="text-xs-left">{{ props.item.project_id }}</td>
                            <td class="text-xs-center">{{ props.item.issue }}</td>
														<td class="text-xs-center">{{ props.item.due }}</td>
                            <td class="justify-center layout px-0">
                              <v-btn icon class="mx-0" @click="editItem(props.item)">
                                <v-icon color="teal">edit</v-icon>
                              </v-btn>
                              <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                                <v-icon color="pink">delete</v-icon>
                              </v-btn>
                            </td>
                          </template>
                          <v-alert slot="no-results" :value="true" color="error" icon="warning">
                            Your search for "{{ search }}" found no results.
                            </v-alert>
                          <template slot="no-data">
                            <v-btn color="primary" @click="initialize">Reset</v-btn>
                          </template>
                        </v-data-table>
<!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
<!-- END -->
<!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
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
        name:'schedule',
        components:{
            CardLayout,AppLayout
        },
        data(){
            return{
                search: '',
                dialog: false,
                headers: [
                    { text: 'Project Id', value: 'project_id', align: 'left', sortable: false},
										{ text: 'Issue', value: 'issue', align: 'center' },
										{ text: 'Due', value: 'due', align: 'center' },
                    { text: 'Actions', value: 'name', sortable: false }
                ],
                items: [],
                editedIndex: -1,
                editedItem: {
										name: '',
										issue:'',
                    due: '',
                },
                defaultItem: {
                    name: '',
										issue:'',
                    due: '',
                }
            }
        },//DATA
        created () {
            this.initialize()
        },//CREATED
        mounted(){
        },//MOUNTED
        computed:{
          ...mapGetters(['activeGroup','userEmail','userRole']),
            formTitle () {
                return this.editedIndex === -1 ? 'New Schedule' : 'Edit Schedule'
            }
        },//COMPUTED
        watch: {
            dialog (val) {
                val || this.close()
            }
        },//WATCH
        methods:{
            ...mapActions([]),
            initialize () {
                this.items = [
                  {
                    project_id : 22,
                    issue: 'CD',
                    due: '4/12/18',
                  },
                  {
                    project_id : 22,
                    issue: 'SD',
                    due: '3/23/18',
                  },
                  {
                    project_id : 22,
                    issue: 'Florida Vet Center',
                    due: '3/28/18',
                  },
                ]
            },
        //EDIT
            editItem (item) {
                this.editedIndex = this.items.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },
        //DELETE
            deleteItem (item) {
                const index = this.items.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
            },
        //CLOSE
            close () {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
          },
        //SAVE
            save () {
                if (this.editedIndex > -1) {
                  Object.assign(this.items[this.editedIndex], this.editedItem)
                }
                else {
                  this.items.push(this.editedItem)
                }
                this.close()
            }
        }//METHODS
    }

</script>

<style scoped>

</style>