<template>
  <div>
    <app-layout>
        <template slot="app-content">
          <v-toolbar color="teal darken-1" dark flat>
                    
                    <v-toolbar-title>PROPOSALS</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-text-field append-icon="search" label="Search" single-line hide-details clearable v-model="search" color="white" class="mb-1 pb-0"></v-text-field>
                </v-toolbar>
                      <v-card flat>
                        <v-btn fab small color="light-green darken-1" top left absolute @click.native.stop="dialog = !dialog" v-if="userRole == 'Admin'">
                          <v-icon color="white">add</v-icon>
                        </v-btn>
                        <!-- <v-layout row class="ma-0 pa-0">
                            <v-flex xs12>
                                <v-btn-toggle v-model="projectStatus" class="mt-2 mb-2">
                                    <v-btn flat value="Job">
                                        <v-badge color="green" >
                                            <span slot="badge" v-if="projectStatus =='Job'">{{projectCount}}</span>
                                            <span>Jobs</span>
                                        </v-badge>
                                    </v-btn>
                                    <v-btn flat value="Proposals">
                                      <v-badge color="green">
                                            <span slot="badge" v-if="projectStatus =='Proposals'">{{projectCount}}</span>
                                            <span>Proposals</span>
                                        </v-badge>
                                    </v-btn>
                                    <v-btn flat value="Completed">
                                      <v-badge color="green" >
                                            <span slot="badge" v-if="projectStatus =='Completed'">{{projectCount}}</span>
                                            <span>Completed</span>
                                        </v-badge>
                                    </v-btn>
                                    <v-btn flat value="Dead">
                                      <v-badge color="green" >
                                            <span slot="badge" v-if="projectStatus =='Dead'">{{projectCount}}</span>
                                            <span>Dead</span>
                                        </v-badge>
                                    </v-btn>
                                </v-btn-toggle>
                            </v-flex>
                        </v-layout> -->
                        <v-layout wrap align-center justify-center>
                            <v-flex xs12 sm4 d-flex>
                                <v-combobox :items="filterItems" label="Filter By" v-model="filterItem" prepend-icon="filter_list"></v-combobox>
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
                      <v-list two-line subheader slot="item" slot-scope="props" class="pa-0 ma-0">
                        <v-list-tile @click="" class="pa-0 ma-0">
                            <v-list-tile-action>
                                <v-avatar :tile="false" :size="44" :color="avatarColor(utilization(props.item.date))">
                                  {{ utilization(props.item.date)}}
                                </v-avatar>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>{{ props.item.name }}</v-list-tile-title>
                                <v-list-tile-sub-title class="tooLong">{{ props.item.scope }}</v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <v-list-tile-action-text>{{ props.item.number }}</v-list-tile-action-text>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-btn icon class="mx-0" @click="editItem(props.item)">
                                            <v-icon color="teal">edit</v-icon>
                                        </v-btn>
                                        <v-btn icon class="mx-0" @click="deleteItem(props.item)" v-if="userRole == 'Admin'">
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
                                  <v-flex xs6>
                                    <v-text-field label="Number" v-model="editedItem.number" prepend-icon="format_list_numbered"></v-text-field>
                                  </v-flex>
                                  <v-flex xs6>
                                        <v-combobox label="State" :items="statesList" v-model="editedItem.state" prepend-icon="map"></v-combobox>
                                    </v-flex>
                                  <v-flex xs12>
                                    <v-text-field label="Name" v-model="editedItem.name" prepend-icon="folder"></v-text-field>
                                  </v-flex>
                                  <v-flex xs12>
                                    <v-text-field label="Scope" v-model="editedItem.scope" prepend-icon="work"></v-text-field>
                                  </v-flex>
                                  <v-flex xs6>
                                    <v-text-field label="Budget Hours" v-model.number="editedItem.budget" prepend-icon="hourglass_full"></v-text-field>
                                  </v-flex>
                                  <v-flex xs6>
                                    <v-dialog ref="dialogDate" persistent v-model="modalDate" lazy full-width width="290px" :return-value.sync="editedItem.date">
                                            <v-text-field slot="activator" label="Start Date" v-model="editedItem.date" prepend-icon="event" readonly></v-text-field>
                                            <v-date-picker v-model="editedItem.date" scrollable>
                                                <v-spacer></v-spacer>
                                                <v-btn flat color="primary" @click="modalDate = false">Cancel</v-btn>
                                                <v-btn flat color="primary" @click="$refs.dialogDate.save(editedItem.date)">OK</v-btn>
                                            </v-date-picker>
                                        </v-dialog>
                                  </v-flex>
                                  <v-flex xs6>
                                    <v-combobox label="Status" :items="statusList" v-model="editedItem.status" prepend-icon="folder"></v-combobox>
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
  </div>
</template>

<script>
import AppLayout from './ui/AppLayout.vue'
import swal from 'sweetalert2'
import {statesList} from './data/states'
import * as moment from 'moment'
import store from '@/vuex/store.js';

import { mapGetters, mapActions } from 'vuex'

export default{
        name:'proposal',
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
                    name : '',
                    status : '',
                    number : '',
                    scope : '',
                    budget : '',
                    state : '',
                    date : '',
                },
                defaultItem: {
                    name : '',
                    status : '',
                    number : '',
                    scope : '',
                    budget : '',
                    state : 'OH',
                    date : '',
                },
                projectStatus:'Job',
                statusList:['Pending','Won','Lost','Dead'],
                projectCount : '',
                modalDate:false,
                filterItems: ['Name', 'Number', 'Date'],
                filterItem : 'Name',
                statesList :[]
            }//RETURN
        },//DATA
        created () {
            this.statesList = _.map(statesList,'state')
        },//CREATED
        mounted(){
          this.$store.commit('GET_PROJECTS');
        },//MOUNTED
        updated(){
          this.$store.commit('GET_PROJECTS');
        },
        computed:{
            ...mapGetters(['userEmail','userRole','proposals',
                            'projects','projectsCount',
                            'backlogs',
                           'projectsJob','projectsProposal','projectsCompleted','projectsDead',
                           'projectsJobCount','projectsProposalCount','projectsCompletedCount','projectsDeadCount'
                          ]),
            formTitle () {
                return this.editedIndex === '' ? 'NEW PROPOSAL' : 'EDIT PROPOSAL'
            },
            items(){
                console.log(store.getters.proposals)
                //this.$store.commit('GET_PROJECTS')
                return this.filteredList(this.proposals)
                // switch(this.projectStatus) {
                //     case 'Completed':
                //         this.projectCount = this.projectsCompletedCount
                //         //return this.projectsCompleted
                //         return this.filteredList(this.projectsCompleted)
                //         break;
                //     case 'Proposals':
                //         this.projectCount = this.projectsProposalCount
                //         //return this.projectsProposal
                //         return this.filteredList(this.projectsProposal)
                //         break;
                //     case 'Dead':
                //         this.projectCount = this.projectsDeadCount
                //         //return this.projectsDead
                //         return this.filteredList(this.projectsDead)
                //         break;
                //     default:
                //         this.projectCount = this.projectsJobCount
                //         //return this.projectsJob
                //         return this.filteredList(this.projectsJob)
                //         break;
                // }
            },
            
        },//COMPUTED
        watch: {
            dialog (val) {
                val || this.close()
            }
        },//WATCH
        methods:{
            ...mapActions(['addProposal','updateProposal','deleteProposal']),
            utilization(date){
                return  moment().diff(moment(date), 'days')
            },//UTILIZATION
            avatarColor(value){
                if(value < 15){
                    return 'blue-grey lighten-4'
                }
                if(value < 20){
                    return 'yellow'
                }
                if(value <= 25){
                    return 'blue'
                }
                if(value < 30){
                    return 'red'
                }
                if(value >= 31){
                    return 'black white--text'
                }
            },//AVATAR
            filteredList(items){
                switch(this.filterItem) {
                    case 'Name':
                        return _.orderBy(items,['name'],['asc'])
                        break;
                    case 'Number':
                        return _.orderBy(items,['number'],['asc'])
                        break;
                    case 'Date':
                        return _.orderBy(items,['date'],['asc'])
                        break;
                }
            },//FILTEREDLIST
        //EDIT
            editItem (item) {
                this.editedItem = Object.assign({}, item)
                this.dialog = true
                this.editedIndex = item.name
            },//EDIT
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
                            'Proposal has been deleted.',
                            'success'
                            )
                            this.deleteProposal(item)
                        }
                    })
            },//DELETE
        //CLOSE
            close () {
                this.dialog = false
                setTimeout(() => {
                  this.editedItem = Object.assign({}, this.defaultItem)
                  this.editedIndex = ''
                }, 300)
            },//CLOSE
        //SAVE
            save () {
                if (this.editedIndex != '') {
                  let data = _.merge(this.editedItem,{key : this.editedIndex})
                  this.updateProposal(data)
                  this.editedIndex = ''
                }
                else {
                  this.addProposal(this.editedItem)
                }
                this.close()
            }//SAVE
        }//METHODS
    }

</script>

<style scoped>

</style>