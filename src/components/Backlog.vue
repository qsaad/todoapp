<template>
    <app-layout>
        <template slot="app-content">
            <v-toolbar color="teal darken-1" dark >
                <v-toolbar-title>BACKLOG</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card flat>
                <v-layout row justify-center wrap class="pt-4">


                    <v-flex xs12 class="pa-4">
                         <!-- <project-labor-usage></project-labor-usage> -->
                         
                         <!-- <v-data-iterator 
                            content-tag="v-layout" 
                            column 
                            loading
                            :items="commentItems"
                            :rows-per-page-items="rowsPerPageItems"
                            :pagination.sync="pagination"  
                            :search="search"
                        >
                        <v-list two-line slot="item" slot-scope="props" class="pa-0 ma-0">
                            <v-list-tile @click="" class="pa-0 ma-0">
                                <v-list-tile-action class="pa-0 ma-0">
                                    <v-avatar :tile="false" :size="36" color="green lighten-3">
                                        {{ initial(props.item.author) }}
                                    </v-avatar>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ props.item.project_name }} {{ props.item.project_number }}</v-list-tile-title>
                                    <v-list-tile-sub-title :class="['tooLong']">{{ props.item.description }}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-list-tile-action-text>{{ props.item.date }}</v-list-tile-action-text>
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-divider class="pa-0 ma-0"></v-divider>
                        </v-list>
                    </v-data-iterator> -->
                    </v-flex>


                    <!-- <v-flex xs12 class="pa-4">
                        <timeline ref="timeline1" :items="items" :groups="groups" :options="timelineOptions"></timeline> 
                    </v-flex> -->


                    <!-- <v-flex xs12 class="pa-4">
                        <total-labor-remaining></total-labor-remaining>
                    </v-flex> -->
                </v-layout>
                
            </v-card>
        </template>
    </app-layout>
</template>

<script>
    import AppLayout from './ui/AppLayout.vue'
    import { mapGetters, mapActions } from 'vuex'
    import ProjectLaborUsage from './charts/ProjectLaborUsage.vue'
    import TotalLaborRemaining from './charts/TotalLaborRemaining.vue'
    import Timeline from './charts/TimeLine.vue'
    import * as moment from 'moment'
    import * as R from 'ramda'

    import Backlog from './classes/backlog'

    let B = {}
    

    export default{
        name:'backlog',
        components:{
            AppLayout,
            ProjectLaborUsage,
            TotalLaborRemaining,
            Timeline, 
        },//COMPONENTS
        data(){
            return{
                search: '',
                dialog: false,
                rowsPerPageItems: [5, 10, 15],
                pagination: {
                rowsPerPage: 10
                },//COMMENTS
                groups: [
                    {id: 0,content: 'Milestones'},
                    {id: 1,content: 'Tasks'},
                ],//GROUPS
                timelineOptions: {
                    height:300,
                    start: moment().subtract(5,'days'),
                    end: moment().add(5,'days'),
                    //editable: true,
                    clickToUse: true,
                    showCurrentTime: true,
                    verticalScroll: true
                },//OPTIONS
            }//RETURN
        },//DATA
        created(){
            B = new Backlog()
          //this.$store.currentProject = ''
        },//CREATED
        mounted(){
           this.$store.commit('GET_BACKLOG')
           this.$store.commit('GET_TASKS')
           
        },//MOUNTED
        
        computed:{
           ...mapGetters(['tasksPending','comments','users']),
           commentItems(){
                return  (this.$store.currentProject != '') ? R.map(x => x.project_name == this.$store.currentProject)(this.comments) : []
            },
            testList(){
                return B.getNamesForDate("2018-10-05")
            },
           items(){
               let data = []
               _.forEach(this.tasksPending, (item,i) =>{
                   data.push({
                       id : i,
                       group : 0,
                       content : item.project_name + ' - ' + item.description,
                       start : moment(item.due)
                   })
               })
               return data
           },//ITEMS FOR TIMELINE
        },//COMPUTED
        methods:{
            initial(email){
                let name = (_.find(this.users,['email', email])).name
                return _.toUpper(name.split(' ').map( item=> {return item[0]}).join(''))
            },
            
            
        }//METHODS
    }//EXPORT DEFAULT

</script>

<style scoped>
</style>