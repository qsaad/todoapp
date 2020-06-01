<template>
  <div>
    <app-layout>
        <template slot="app-content">
          <v-toolbar color="teal darken-1" dark flat>
                    
                    <v-toolbar-title>PROJECTS</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-text-field append-icon="search" label="Search" single-line hide-details clearable v-model="search" color="white" class="mb-1 pb-0"></v-text-field>
                </v-toolbar>
                      <v-card flat>
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
                                <v-avatar :tile="false" :size="44" :color="avatarColor(utilization(props.item.labor,props.item.budget))">
                                  {{(utilization(props.item.labor,props.item.budget)*100).toFixed(0) + '%'}}
                                </v-avatar>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>{{ props.item.name }} - {{ props.item.date}}</v-list-tile-title>
                                <v-list-tile-sub-title class="tooLong">{{ props.item.labor }} / {{ props.item.budget }}</v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <v-list-tile-action-text>{{ props.item.number }}</v-list-tile-action-text>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-btn icon class="mx-0" @click="showGraph(props.item)">
                                            <v-icon color="teal">edit</v-icon>
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-list-tile-action>
                        </v-list-tile>
                        <v-divider class="pa-0 ma-0"></v-divider>
                      </v-list>
                    </v-data-iterator>
                
                <v-dialog v-model="dialog" max-width="100%">
                    <v-card>
                        <v-card-text>
                            <project-labor-usage :selectedName="graphData.name"></project-labor-usage>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click.native="close">Close</v-btn> 
                        </v-card-text>
                    </v-card>
                    
                </v-dialog>
        </template>
    </app-layout>
  </div>
</template>

<script>
import AppLayout from './ui/AppLayout.vue'
import ProjectLaborUsage from './charts/ProjectLaborUsage.vue'

import { mapGetters, mapActions } from 'vuex'

import Backlog from './classes/backlog'

let B = {}

export default{
        name:'project',
        components:{
            AppLayout,ProjectLaborUsage,
        },
        data(){
            return{
                search: '',
                dialog: false,
                rowsPerPageItems: [5, 10, 15],
                pagination: {
                  rowsPerPage: 10
                },
                filterItems: ['Project Name', 'Job No', 'Utilization'],
                filterItem : 'Project Name',
                graphData : {}
            }//RETURN
        },//DATA
        created () {
           B = new Backlog()
        },//CREATED
        mounted(){
          
        },//MOUNTED
        updated(){
          
        },
        computed:{
            ...mapGetters(['userEmail','userRole']),
            items(){
                return this.filteredList(B.getCurrentData())
            },
        },//COMPUTED
         watch: {
            dialog (val) {
                val || this.close()
            }
        },//WATCH
        methods:{
            utilization(labor,budget){
                return (budget <= 0) ? 0 : labor/budget
            },
            avatarColor(value){
                if(value < 0.25){
                    return 'blue-grey lighten-4'
                }
                if(value < 0.5){
                    return 'yellow'
                }
                if(value <= 0.75){
                    return 'blue'
                }
                if(value < 1){
                    return 'red'
                }
                if(value >= 1){
                    return 'black white--text'
                }
            },
            filteredList(items){
                switch(this.filterItem) {
                    case 'Project Name':
                        return _.orderBy(items,['name'],['asc'])
                        break;
                    case 'Job No':
                        return _.orderBy(items,['number'],['asc'])
                        break;
                    case 'Utilization':
                        return _.orderBy(items,['utilization'],['asc'])
                        break;
                }
            },
            showGraph(item){
                this.graphData = item
                this.dialog = true
                console.log(item)
            },
            close () {
                this.dialog = false
                setTimeout(() => {
                  this.editedItem = Object.assign({}, this.defaultItem)
                  this.editedIndex = ''
                }, 300)
            },//CLOSE
        }//METHODS
    }

</script>

<style scoped>

</style>