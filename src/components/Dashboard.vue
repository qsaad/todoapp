<template>
    <app-layout>
            <template slot="app-content">
                <v-toolbar color="teal darken-1" dark >
                    <v-toolbar-title>DASHBOARD</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card flat>
                    <v-layout row>
                            <v-flex xs12>
                                <v-btn-toggle v-model="displayStatus" class="mt-2 mb-2">
                                    <v-btn flat value="metrics">Metrics</v-btn>
                                    <v-btn flat value="graphs">Graphs</v-btn>
                                    <v-btn flat value="tasks">Tasks</v-btn>
                                </v-btn-toggle>
                            </v-flex>
                        </v-layout>
<!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
<!-- METRICS -->
<!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
                    <v-container fluid grid-list-md v-if="displayStatus == 'metrics'">
                        <v-layout row wrap>
                             <v-flex xs12>
                                <v-card class="ma-2 pa-1" tile hover to="/task">
                                    <v-card-title class="title pa-2" primary-title>FULL TIME EQUIVALENT</v-card-title>
                                    <v-card-text class="display-2 pa-0">
                                        <v-layout row space-between>
                                            <v-flex xs12 v-for="p in fullTimeEquivalent" :key="p.month" class="mx-2 pt-3 px-1 pb-4">
                                                <v-layout column wrap>
                                                    <v-flex xs12 class="display-2 ma-0 pa-0">
                                                        {{p.value}}
                                                    </v-flex>
                                                    <v-flex xs12 class="title ma-0 pa-0">
                                                        {{p.month}}
                                                    </v-flex>
                                                </v-layout>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-layout row wrap justify-center>
                                            <v-flex xs12>
                                                <v-btn flat color="orange" @click.prevent="FTE_period = 3">3 Months</v-btn>
                                                <v-btn flat color="orange" @click.prevent="FTE_period = 4" class="hidden-sm-and-down">4 Months</v-btn>
                                                <v-btn flat color="orange" @click.prevent="FTE_period = 6" class="hidden-md-and-down">6 Months</v-btn>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-actions>                               
                                </v-card>
                            </v-flex>
                            <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
                            <!-- COUNT ROW -->
                            <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
                            <v-flex xs6 sm4 md3>
                                <v-card class="ma-2 pa-1" tile hover >
                                    <v-card-title class="title pa-2" primary-title>CURRENT</v-card-title>
                                    <v-card-text class="display-2 pa-0">{{ currentCount }}</v-card-text>
                                    <v-card-actions>
                                       
                                    </v-card-actions>                               
                                </v-card>
                            </v-flex>

                            <v-flex xs6 sm4 md3>
                                <v-card class="ma-2 pa-1" tile hover >
                                    <v-card-title class="title pa-2" primary-title>ACTIVE</v-card-title>
                                    <v-card-text class="display-2 pa-0">{{ activeCount }}</v-card-text>
                                    <v-card-actions>
                                       
                                    </v-card-actions>                               
                                </v-card>
                            </v-flex>

                            <v-flex xs6 sm4 md3>
                                <v-card class="ma-2 pa-1" tile hover >
                                    <v-card-title class="title pa-2" primary-title>OVERBUDGET</v-card-title>
                                    <v-card-text class="display-2 pa-0">{{ overbudgetCount }}</v-card-text>
                                    <v-card-actions>
                                       
                                    </v-card-actions>                               
                                </v-card>
                            </v-flex>

                            <v-flex xs6 sm4 md3>
                                <v-card class="ma-2 pa-1" tile hover >
                                    <v-card-title class="title pa-2" primary-title>DORMANT</v-card-title>
                                    <v-card-text class="display-2 pa-0">{{ dormantCount }}</v-card-text>
                                    <v-card-actions>
                                       
                                    </v-card-actions>                               
                                </v-card>
                            </v-flex>

                            <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
                            <!-- HOURS ROW -->
                            <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
                            <v-flex xs12 sm6 md4>
                                <v-card class="ma-2 pa-1" tile hover >
                                    <v-card-title class="title pa-2" primary-title>LABOR</v-card-title>
                                    <v-card-text class="display-2 pa-0">{{ laborHours }}</v-card-text>
                                    <v-card-actions>
                                       
                                    </v-card-actions>                               
                                </v-card>
                            </v-flex>

                            <v-flex xs12 sm6 md4>
                                <v-card class="ma-2 pa-1" tile hover >
                                    <v-card-title class="title pa-2" primary-title>BUDGET</v-card-title>
                                    <v-card-text class="display-2 pa-0">{{ budgetHours }}</v-card-text>
                                    <v-card-actions>
                                       
                                    </v-card-actions>                               
                                </v-card>
                            </v-flex>

                            <v-flex xs12 sm6 md4>
                                <v-card class="ma-2 pa-1" tile hover >
                                    <v-card-title class="title pa-2" primary-title>BACKLOG</v-card-title>
                                    <v-card-text class="display-2 pa-0">{{ backlogHours }}</v-card-text>
                                    <v-card-actions>
                                       
                                    </v-card-actions>                               
                                </v-card>
                            </v-flex>

                            <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
                            <!-- LABOR HOURS LAST WEEK ROW -->
                            <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
                            <v-flex xs12 sm6 md4>
                                <v-card class="ma-2 pa-1" tile hover >
                                    <v-card-title class="title pa-2" primary-title>LABOR LAST WEEK</v-card-title>
                                    <v-card-text class="display-2 pa-0">{{ laborHoursLastWeek }}</v-card-text>
                                    <v-card-actions>
                                       
                                    </v-card-actions>                               
                                </v-card>
                            </v-flex>

                            <v-flex xs12 sm6 md4>
                                <v-card class="ma-2 pa-1" tile hover >
                                    <v-card-title class="title pa-2" primary-title>LABOR UNDER BUDGET</v-card-title>
                                    <v-card-text class="display-2 pa-0">{{ laborHoursLastWeekProjectUnderBudget }}</v-card-text>
                                    <v-card-actions>
                                       
                                    </v-card-actions>                               
                                </v-card>
                            </v-flex>

                            <v-flex xs12 sm6 md4>
                                <v-card class="ma-2 pa-1" tile hover >
                                    <v-card-title class="title pa-2" primary-title>LABOR OVER BUDGET</v-card-title>
                                    <v-card-text class="display-2 pa-0">{{ laborHoursLastWeekProjectOverBudget }}</v-card-text>
                                    <v-card-actions>
                                       
                                    </v-card-actions>                               
                                </v-card>
                            </v-flex>

                             <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
                            <!--FULL TIME EQUIVALENT ROW -->
                            <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
                            <v-flex xs12 sm6 md4>
                                <v-card class="ma-2 pa-1" tile hover >
                                    <v-card-title class="title pa-2" primary-title>FTE</v-card-title>
                                    <v-card-text class="display-2 pa-0">{{ fte }}</v-card-text>
                                    <v-card-actions>
                                       
                                    </v-card-actions>                               
                                </v-card>
                            </v-flex>

                            <v-flex xs12 sm6 md4>
                                <v-card class="ma-2 pa-1" tile hover >
                                    <v-card-title class="title pa-2" primary-title>PROPOSAL</v-card-title>
                                    <v-card-text class="display-2 pa-0">{{ proposalHours }}</v-card-text>
                                    <v-card-actions>
                                       
                                    </v-card-actions>                               
                                </v-card>
                            </v-flex>

                            <v-flex xs12 sm6 md4>
                                <v-card class="ma-2 pa-1" tile hover >
                                    <v-card-title class="title pa-2" primary-title>NON PRODUCTION</v-card-title>
                                    <v-card-text class="display-2 pa-0"> 75 </v-card-text>
                                    <v-card-actions>
                                       
                                    </v-card-actions>                               
                                </v-card>
                            </v-flex>



                            <v-flex xs12 sm6 md4>
                                <v-card class="ma-2 pa-1" tile hover >
                                    <v-card-title class="title pa-2" primary-title>PROPOSALS</v-card-title>
                                    <v-card-text class="display-2 pa-0">{{ projectsProposalCount }}</v-card-text>
                                    <v-card-actions>
                                        <v-btn flat color="orange" @click.native.stop="expiredProposalDialog = true">{{checkProposalExpiry.length}} proposals expired</v-btn>
                                        <v-dialog v-model="expiredProposalDialog" max-width="300" scrollable>
                                            <v-card>
                                                <v-card-title color="indigo pa-0 ma-0" class="title">Expired Proposals</v-card-title>
                                                <v-layout column v-if="checkProposalExpiry.length > 0" class="caption">
                                                    <v-flex class="body-1" v-for="item in checkProposalExpiry" :key="item.name">
                                                        <v-card class="px-1 ma-1" color="indigo">
                                                            <v-card-title class="pa-0 ma-0 white--text" color="blue-grey darken-2">
                                                                {{item.name}}
                                                            </v-card-title>
                                                        </v-card>
                                                    </v-flex>
                                                </v-layout>
                                            </v-card>
                                        </v-dialog>
                                    </v-card-actions>                               
                                </v-card>
                            </v-flex>

                            <v-flex xs12 sm6 md4>
                                <v-card class="ma-2 pa-1" tile hover>
                                    <v-card-title class="title pa-2" primary-title>JOBS</v-card-title>
                                    <v-card-text class="display-2 pa-0">{{ jobsCount }}</v-card-text>
                                    <v-card-actions>
                                        <v-btn flat color="orange" @click.native.stop="expiredJobDialog = true">{{checkJobExpiry.length}} jobs expired</v-btn>
                                        <v-dialog v-model="expiredJobDialog" max-width="300" scrollable>
                                            <v-card>
                                                <v-card-title color="indigo pa-0 ma-0" class="title">Expired Jobs</v-card-title>
                                                <v-layout column v-if="checkJobExpiry.length > 0" class="caption">
                                                    <v-flex class="body-1" v-for="item in checkJobExpiry" :key="item.name">
                                                        <v-card class="px-1 ma-1" color="indigo">
                                                            <v-card-title class="pa-0 ma-0 white--text" color="blue-grey darken-2">
                                                                {{item.name}}
                                                            </v-card-title>
                                                        </v-card>
                                                    </v-flex>
                                                </v-layout>
                                            </v-card>
                                        </v-dialog>
                                    </v-card-actions>                               
                                </v-card>
                            </v-flex>

                            <v-flex xs12 sm6 md4>
                                <v-card class="ma-2 pa-1" tile hover>
                                    <v-card-title class="title pa-2" primary-title>TASKS</v-card-title>
                                    <v-card-text class="display-2 pa-0">{{ tasksCount }}</v-card-text>
                                    <v-card-actions>
                                        <v-btn flat color="orange" @click.native.stop="expiredTaskDialog = true">{{checkTaskExpiry.length}} tasks expired</v-btn>
                                        <v-dialog v-model="expiredTaskDialog" max-width="300" scrollable>
                                            <v-card>
                                                <v-card-title color="indigo pa-0 ma-0" class="title">Expired Tasks</v-card-title>
                                                <v-layout column v-if="checkTaskExpiry.length > 0" class="caption">
                                                    <v-flex class="body-1" v-for="item in checkTaskExpiry" :key="item.name">
                                                        <v-card class="px-1 ma-1" color="indigo">
                                                            <v-card-title class="pa-0 ma-0 white--text" color="blue-grey darken-2">
                                                                {{item.name}}
                                                            </v-card-title>
                                                            <v-card-text class="pa-0 ma-0 orange--text">
                                                                {{item.description}}
                                                            </v-card-text>
                                                        </v-card>
                                                    </v-flex>
                                                    
                                                </v-layout>
                                            </v-card>
                                        </v-dialog>
                                    </v-card-actions>                               
                                </v-card>
                            </v-flex>

                            <v-flex xs12 sm6 md4>
                                <v-card class="ma-2 pa-1" tile hover to="/task">
                                    <v-card-title class="title pa-2" primary-title>DEPT WEEKS</v-card-title>
                                    <v-card-text class="display-2 pa-0">{{ departmentWeeks }}</v-card-text>
                                    <v-card-actions>
                                        <v-btn flat color="orange" @click.prevent="monthCountToggle('thisMonth')">This Month</v-btn>
                                        <v-btn flat color="orange" @click.prevent="monthCountToggle('nextMonth')">Next Month</v-btn>
                                    </v-card-actions>                               
                                </v-card>
                            </v-flex>

                            <v-flex xs12 sm6 md4>
                                <v-card class="ma-2 pa-1" tile hover to="/project">
                                    <v-card-title class="title pa-2" primary-title>HOURS</v-card-title>
                                    <v-card-text class="display-2 pa-0">{{ hoursCount }}</v-card-text>
                                    <v-card-actions>
                                        <v-btn flat color="orange" @click.prevent="hoursCountToggle('projected')">Projected</v-btn>
                                        <v-btn flat color="orange" @click.prevent="hoursCountToggle('remaining')">Remaining</v-btn>
                                    </v-card-actions>                             
                                </v-card>
                            </v-flex>

                            <v-flex xs12 sm6 md4>
                                <v-card class="ma-2 pa-1" tile hover to="/project">
                                    <v-card-title class="title pa-2" primary-title>UTILIZATION</v-card-title>
                                    <v-card-text class="display-2 pa-0">{{ averageUtilization }}</v-card-text>
                                    <v-card-actions>
                                        <v-btn flat color="orange">4 Week</v-btn>
                                        <v-btn flat color="orange">REALIZATION</v-btn>
                                    </v-card-actions>                               
                                </v-card>
                            </v-flex>

                        </v-layout>
                    </v-container>
<!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
<!-- GRAPHS -->
<!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
                    <v-container fluid grid-list-md v-if="displayStatus == 'graphs'">
                        <v-layout row wrap>
                            <v-flex xs12>
                                <total-labor-remaining></total-labor-remaining>
                            </v-flex>
                        </v-layout>
                        <!-- <v-layout row wrap>
                            <v-flex xs12>
                                <v-card class="ma-2 pa-1" tile hover>
                                    <v-card-title class="title">TASKS COUNT</v-card-title>
                                    <v-card-text class="display-2 pa-0">
                                        <tasks-daily-count :chartData=plotTasksDailyCount></tasks-daily-count>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-layout row wrap justify-center>
                                            <v-flex xs12>
                                                <v-btn flat color="yellow" @click="NoDays = 5">5d</v-btn>
                                                <v-btn flat color="yellow" @click="NoDays = 10">10d</v-btn>
                                                <v-btn flat color="yellow" @click="NoDays = 15">15d</v-btn>
                                                <v-btn flat color="yellow" @click="NoDays = 30">30d</v-btn>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-actions>                               
                                </v-card>
                            </v-flex>
                            <v-flex xs12 md6>
                                <v-card class="ma-2 pa-1" tile hover>
                                    <v-card-title class="title">FTE TREND</v-card-title>
                                    <v-card-text class="display-2 pa-0">
                                        <full-time-equivalent-count :chartData=plotFullTimeEquivalentCount></full-time-equivalent-count>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-layout row wrap justify-center>
                                            <v-flex xs12>
                                                <v-btn flat color="yellow" @click="FTE_months = 3">3m</v-btn>
                                                <v-btn flat color="yellow" @click="FTE_months = 6">6m</v-btn>
                                                <v-btn flat color="yellow" @click="FTE_months = 9">9m</v-btn>
                                                <v-btn flat color="yellow" @click="FTE_months = 12">12m</v-btn>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-actions>                               
                                </v-card>
                            </v-flex>
                            <v-flex xs12 md6>
                                <v-card class="ma-2 pa-1" tile hover>
                                    <v-card-title class="title">MARKET SECTORS</v-card-title>
                                    <v-card-text class="display-2 pa-0">
                                        <market-sectors :chartData=plotMarketSectors></market-sectors>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-layout row wrap justify-center>
                                            <v-flex xs12>
                                                <v-btn flat color="orange" @click.prevent="marketType = 'Job'">Current</v-btn>
                                                <v-btn flat color="orange" @click.prevent="marketType = 'Proposal'">Projected</v-btn>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-actions>                               
                                </v-card>
                            </v-flex>
                        </v-layout> -->
                    </v-container>
<!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
<!-- TASKS -->
<!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
                    <v-container fluid grid-list-md v-if="displayStatus == 'tasks'">
                        <v-layout row wrap >
                            <v-flex xs12>
                                <v-card class="ma-2 pa-1" tile hover>
                                    <!-- <v-card-title class="title">TODAY</v-card-title> -->

                                    <v-card-actions>
                                        <v-layout row justify-center>
                                            <v-btn flat color="yellow" @click="tasksPeriodToggle('today')">Today</v-btn>
                                            <v-btn flat color="yellow" @click="tasksPeriodToggle('tomorrow')">Tomorrow</v-btn>
                                            <v-btn flat color="yellow" @click="tasksPeriodToggle('thisWeek')">This Week</v-btn>
                                            <v-btn flat color="yellow" @click="tasksPeriodToggle('nextWeek')">Next Week</v-btn>
                                            <!-- <v-btn flat color="yellow" @click="tasksPeriodToggle('thisMonth')">This Month</v-btn> -->
                                        </v-layout>
                                    </v-card-actions> 
                                    <v-card-text class="display-2 pa-0">
                                        <v-list two-line v-if="tasksList.length > 0" v-for="(task,index) in tasksList" :key="index" class="pa-0 ma-0">
                                            <v-list-tile  class="pa-0" @click="">
                                                <v-list-tile-action class="pa-0 ma-0">
                                                    <v-avatar :tile="false" :size="40" color="indigo" class="white--text">
                                                        {{ dayOfWeek(task.due) }}
                                                    </v-avatar>
                                                </v-list-tile-action >
                                                <v-list-tile-action class="pa-0 ma-0">
                                                    <v-avatar :tile="false" :size="36" color="teal lighten-5" class="green--text">
                                                        {{ initial(task.assigned_to) }}
                                                    </v-avatar>
                                                </v-list-tile-action>
                                                <v-list-tile-content>
                                                    <v-list-tile-title >{{ task.project_name }}</v-list-tile-title>
                                                    <v-list-tile-sub-title class="tooLong">{{ task.description }}</v-list-tile-sub-title>
                                                </v-list-tile-content>
                                                <v-list-tile-action class="hidden-sm-and-down">
                                                    <v-list-tile-action-text>
                                                        {{ task.due }}
                                                    </v-list-tile-action-text>
                                                </v-list-tile-action>
                                            </v-list-tile>
                                            <v-divider v-if="index + 1 < tasksList.length" :key="`divider-${index}`"></v-divider>
                                        </v-list>
                                        <p v-else class="title">No Tasks Listed</p>
                                    </v-card-text>
                                    <v-card-text>
                                        <v-layout>
                                            <v-flex xs12 class="pa-4">
                                                <timeline ref="timeline1" :items="timelineItems" :groups="groups" :options="timelineOptions"></timeline> 
                                            </v-flex>
                                        </v-layout>
                                    </v-card-text>
                                                                  
                                </v-card>
                            </v-flex>
                           
                           
                        </v-layout>
                    </v-container>
                </v-card>
            </template>
    </app-layout>

</template>

<script>
import AppLayout from './ui/AppLayout.vue'
import firebase from 'firebase'
//import db from './config/firebaseInit'
import dt from './js/dates'
import * as moment from 'moment'
import TasksDailyCount from './charts/TasksDailyCount.vue'
import FullTimeEquivalentCount from './charts/FullTimeEquivalentCount.vue'
import MarketSectors from './charts/MarketSectors.vue'
import {} from 'chartjs-plugin-datalabels'

import Timeline from './charts/TimeLine.vue'
import TotalLaborRemaining from './charts/TotalLaborRemaining.vue'

import { mapGetters, mapActions } from 'vuex'

import Backlog from './classes/backlog'

let B = {}

export default{
        name:'dashboard',
        components:{
            AppLayout,
            //TimeLine, 
            TasksDailyCount, FullTimeEquivalentCount, MarketSectors,
             Timeline,TotalLaborRemaining,
        },
        data(){
            return{
                //FROM BACKLOG CLASS
                //currentCount : '',
                activeCount : '',
                overbudgetCount : '',
                dormantCount : '',
                laborHours : '',
                budgetHours : '',
                backlogHours : '',
                laborHoursLastWeek : '',
                laborHoursLastWeekProjectUnderBudget : '',
                laborHoursLastWeekProjectOverBudget : '',
                proposalHours : '',
                fte : '',

                displayStatus : 'metrics',
                jobsCount : '',
                tasksCount : '',
                teamCount : '',
                hoursCount : '',
                dayCount : '',
                weekCount : '',
                monthCount : '',
                //currentBacklog : B.getOverBudgetProjectCount(),
                pt : [],
                jt : [],
                prj : [],
                //CHART DATA
                FTE_period : 3,
                FTE_data : [],
                FTE_months : 6,
                tasksPeriod :'thisWeek',
                tasksList : [],
                NoDays : 5,
                marketType : 'Job',
                expiredProposalDialog : false,
                expiredJobDialog : false,
                expiredTaskDialog : false,
                //ALERTS
                timelinePeriod : 366,
                projectID : [],
                //TIMELINE
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

            }
        },//DATA
        created(){
            this.jobsCount = this.projectsJobCount
            this.tasksCount = this.tasksPendingCount
            this.teamCount = this.usersAdminCount

            this.hoursCount = _.sum(_.map(this.projects,(item)=>{
                                    if(item.status == "Job"){
                                        if(item.budget_hours > item.used_hours){
                                            return item.budget_hours - item.used_hours
                                        }
                                    }
                                }))

            this.dayCount = _.filter(this.tasks,(item) => {
                                if(!item.completed){
                                    return item.due == moment()
                                }
                            }).length
            this.weekCount = 1
            this.monthCount = 1

            B = new Backlog()

            //console.log(B.getPreviousData())
        },
        mounted(){
            firebase.auth().onAuthStateChanged( user => {
                this.$store.commit('SET_USER_EMAIL',user);
                this.$store.commit('SET_USER_NAME',user);
                this.$store.commit('GET_USERS');
                this.$store.commit('GET_PROJECTS');
                this.$store.commit('GET_TASKS');
                this.$store.commit('GET_BACKLOG');
                this.$store.commit('SET_USER_ROLE');
                this.$store.commit('GET_NOTIFICATIONS');
                this.$store.currentProject = ''
            })

            this.tasksList = _.filter(this.tasks,(item) => {
                            if(!item.completed){
                                return item.due >= dt.thisWeek().startDate && item.due <= dt.thisWeek().endDate
                            }
                        })

            //console.log(_.groupBy(this.tasksList,(item) => item.due))
            //this.currentCount = B.getCurrentProjectsCount()
            this.activeCount = B.getActiveProjectsCount()
            this.overbudgetCount = B.getOverBudgetProjectsCount()
            this.dormantCount = B.getDormantProjectsCount()
            this.laborHours = B.getLaborSum()
            this.budgetHours = B.getBudgetSum()
            this.backlogHours = B.getBacklogSum()
            this.laborHoursLastWeek = B.getLaborSumLastWeek()
            this.laborHoursLastWeekProjectUnderBudget = B.getLaborSumLastWeekProjectsUnderBudget()
            this.laborHoursLastWeekProjectOverBudget = B.getLaborSumLastWeekProjectsOverBudget()
            this.proposalHours = B.getProposalSum()
            this.fte = B.getFullTimeEquivalent()
        },//MOUNTED
        computed:{
            ...mapGetters([
                'userEmail','userRole',
                'users','usersCount',
                'projects','projectsProposalRecent','projectsJob','projectsProposal','projectsCompleted','projectsDead',
                'projectsCount','projectsJobCount','projectsProposalCount','projectsCompletedCount','projectsDeadCount',
                'usersAdmin','usersUser','usersGuest',
                'usersAdminCount','usersUserCount','usersGuestCount',
                'usersNameList','projectsNameList',
                'tasks','tasksCompleted','tasksCompletedCount','tasksPending','tasksPendingCount','tasksUser','tasksUserCount',
                'notifications','notificationsUnread','notificationsRead'
            ]),
            timelineItems(){
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
            currentCount(){
                return B.getCurrentProjectsCount()
            },
            projectNames(){
                let names = []
                let i = 1
               
                _.forEach(this.projectsJob, item =>{
                    names.push({
                        id : i++,
                        name: item.name,
                    }) 
                })

                return names
            },
            plotTasksDailyCount(){
                let days =  _.map(_.range(this.NoDays),(item)=>{
                    return moment().add(item,'day').format('ddd')
                })

                let count = []

                _.forEach(_.range(this.NoDays),(index)=>{
                    let i = 0
                    _.forEach(this.tasks,(item)=>{
                        moment(item.due).isSame(moment().add(index,'day'),'day') ? i++ : ''
                    })
                    count.push(i)  
                })
                return {
                    labels : days,
                        datasets : [{
                            label:'Days',
                            data: count,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.7)',
                                'rgba(54, 162, 235, 0.7)',
                                'rgba(255, 206, 86, 0.7)',
                                'rgba(75, 192, 192, 0.7)',
                                'rgba(153, 102, 255, 0.7)',
                            ]
                        }]
                }
            },//plotTasksDailyCount
            plotFullTimeEquivalentCount(){

                let months =  _.map(_.range(12),(item)=>{
                    return moment().add(item,'month').format('MMM')
                })

                let count = []
                _.forEach(this.FTE_data,(item)=>{
                    count.push(item.value)  
                })

                return {
                    labels : _.slice(months,0,this.FTE_months),
                        datasets : [{
                            label:'FTE',
                            data: _.slice(count,0,this.FTE_months),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.7)',
                                'rgba(54, 162, 235, 0.7)',
                                'rgba(255, 206, 86, 0.7)',
                                'rgba(75, 192, 192, 0.7)',
                                'rgba(153, 102, 255, 0.7)',
                            ]
                        }]
                }
            },//plotFullTimeEquivalentCount
            plotMarketSectors(){
                let list = (this.marketType == 'Job') ? this.projectsJob : this.projectsProposal
               
                    let markets = _.uniq(_.map(list, item =>item.type))
                    let count = []
                    _.forEach(markets, market => {
                        let i = 0
                        _.forEach(list, project =>{
                            (project.type == market) ? i++ : ''
                        })
                        count.push(i)  
                    })
               
                return {
                    labels : markets,
                        datasets : [{
                            label:'FTE',
                            data: count,
                            backgroundColor: [
                                'rgba(255, 0, 0, 0.7)',
                                'rgba(0, 255, 0, 0.7)',
                                'rgba(0, 0, 255, 0.7)',
                                'rgba(122, 122, 122, 0.7)',
                                'rgba(255, 100, 55, 0.7)',
                            ]
                        }]
                }
            },//plotMarketSectors
            departmentWeeks(){
                return (this.remainingHours()/this.usersCount/40).toFixed(2)
            },//departmentWeeks
            averageUtilization(){
                let n =  _.sum(_.map(this.projects,(item)=>{
                    if(item.status == "Job"){
                        return  item.used_hours/item.budget_hours
                    }
                }))/this.projectsJobCount

                return (n*100).toFixed(0) + "%"
            },//averageUtilization
            fullTimeEquivalent(){
                let overhead = 70
                let now = moment()
                let result = []
                this.billable()
                this.probable()

                if(this.$vuetify.breakpoint.xs){
                    this.FTE_period = 3
                }

                let x = _.zipWith(this.pt,this.jt, (a,b) =>{
                    return a + b
                })
                let currentMonth = moment().month()
                
                this.prj = _.map(_.slice(x,currentMonth,currentMonth + 12), (item) =>{
                    return _.toNumber(((item + overhead)*12/2080).toFixed(2))
                })

                _.forEach(_.range(12), index =>{
                    this.FTE_data.push({value : this.prj[index], month : moment().add(index,'month').format('MMM')})
                })

                //console.log(this.prj)
                return _.slice(this.FTE_data,0,this.FTE_period)

            },//FTE
            checkProposalExpiry(){
                let items = []
                _.forEach(this.projectsProposal, item => {
                    if(moment(item.start).isSameOrBefore(moment(),'day')) {
                        items.push({name : item.name})
                    } 
                })
                return items
            },//checkProposalExpiry
            checkJobExpiry(){
                let items = []
                _.forEach(this.projectsJob, item => {
                    if(moment(item.end).isSameOrBefore(moment(),'day')) {
                        items.push({name : item.name})
                    } 
                })
                return items
            },//checkProposalExpiry
            checkTaskExpiry(){
                let items = []
                _.forEach(this.tasksPending, item => {
                    if(moment(item.due).isSameOrBefore(moment(),'day')) {
                        items.push({name : item.project_name, description : item.description})
                    } 
                })
                return items
            },//checkProposalExpiry
        },//COMPUTED
        methods:{
            ...mapActions([]),
            initial(email){
                let name = (_.find(this.users,['email', email])).name
                return _.toUpper(name.split(' ').map( item=> {return item[0]}).join(''))
            },
            dayOfWeek(value){
                return _.toUpper(moment(value).format('ddd'))
            },
            // timelineToggle(value){
            //     switch(value) {
            //         case '6M':
            //             this.timelinePeriod = 180
            //             break;
            //         case '12M':
            //             this.timelinePeriod = 365
            //             break;
            //         case '18M':
            //             this.timelinePeriod = 480
            //             break;
            //     }
            // },
            tasksPeriodToggle(value){
                switch(value) {
                    case 'today':
                        this.tasksList =  _.filter(this.tasks,(item) => {
                            if(!item.completed){
                                return moment().isSame(moment(item.due),'day')
                            }
                        })
                        break;
                    case 'tomorrow':
                        this.tasksList = _.filter(this.tasks,(item) => {
                            if(!item.completed){
                                return moment(item.due).isSame(moment().add(1,'day'),'day')
                            }
                        })
                        break;
                    case 'thisWeek':
                        this.tasksList = _.filter(this.tasks,(item) => {
                            if(!item.completed){
                                return item.due >= dt.thisWeek().startDate && item.due <= dt.thisWeek().endDate
                            }
                        })
                        break;
                    case 'nextWeek':
                        this.tasksList = _.filter(this.tasks,(item) => {
                            if(!item.completed){
                                return item.due >= dt.nextWeek().startDate && item.due <= dt.nextWeek().endDate
                            }
                        })
                        break;
                    // case 'thisMonth':
                    //     this.tasksList = _.filter(this.tasks,(item) => {
                    //         if(!item.completed){
                    //             return item.due >= dt.thisMonth().startDate && item.due <= dt.thisMonth().endDate
                    //         }
                    //     })
                    //     break;
                }
            },//tasksPeriodToggle
            jobsCountToggle(value){
                this.jobsCount =  (value == 'active') ? this.projectsJobCount : this.projectsCompletedCount
            },
            tasksCountToggle(value){
                this.tasksCount =  (value == 'pending') ? this.tasksPendingCount : this.tasksCompletedCount
            },
            teamCountToggle(value){
                this.teamCount =  (value == 'admin') ? this.usersAdminCount : this.usersUserCount
            },
            hoursCountToggle(value){
                this.hoursCount = (value == 'projected') ? this.projectBudgetHours() : this.remainingHours()
            },
            dayCountToggle(value){
                //this.dayCount =  (value == 'today') ? 1 : 0
                let dtObj = (value == 'today') ? dt.today() : dt.tomorrow()
                let arr =  _.filter(this.tasks,(item) => {
                    if(!item.completed){
                        return item.due == dtObj
                    }
                })
                this.dayCount =  arr.length
            },//
            weekCountToggle(value){
                //this.weekCount =  (value == 'thisWeek') ? 1 : 0
                if(value == 'thisWeek'){
                    let arr = _.filter(this.tasks,(item) => {
                            if(!item.completed){
                                return item.due >= dt.thisWeek().startDate && item.due <= dt.thisWeek().endDate
                            }
                        })
                    return arr.length
                }
                else{
                    let arr = _.filter(this.tasks,(item) => {
                            if(!item.completed){
                                return item.due >= dt.nextWeek().startDate && item.due <= dt.nextWeek().endDate
                            }
                        })
        
                        return arr.length

                }
            },//weekCountToggle
            monthCountToggle(value){
                this.monthCount =  (value == 'thisMonth') ? 1 : 0
            },//monthCountToggle
            projectBudgetHours(){
                return _.sum(_.map(this.projects,(item)=>{
                    if(item.status == "Proposal"){
                        return item.budget_hours
                    }
                }))
            },//projectBudgetHours
            remainingHours(){
                return _.sum(_.map(this.projects,(item)=>{
                    if(item.status == "Job"){
                        if(item.budget_hours > item.used_hours){
                            return item.budget_hours - item.used_hours
                        }
                    }
                }))
            },//remainingHours
            billable(){
                this.jt = _.fill(Array(24),0)
                
                //console.log("Current Month : " + moment().month()) //MONTH ARE ZERO INDEX
                _.forEach(this.projectsJob, item =>{
                    if(moment(item.end).isSameOrAfter(moment(), 'day')){
                        let start = moment(item.start).month() > moment().month() ? moment(item.start).month() : moment().month()
                        let end = moment().isSame(moment(item.end),'year') ? moment(item.end).month() : moment(item.end).month() + 11
                        let duration = end - start + 1
                        let hours = (item.budget_hours > item.used_hours) ? (item.budget_hours-item.used_hours)/duration : 0
                        //console.log(item.name + ' : D-' + duration + " : S-" + start + " : E-" + end + " : H-" + hours.toFixed(2))
                        let n = []
                        n = _.fill(Array(24),hours,start,end+1)
                        _.forEach(n,(item,index) =>{
                                this.jt[index] = item >= 0 ? this.jt[index] + item : 0
                        })
                        //console.log(jt)
                    }
                    else{
                        //console.log("Project " + item.name + " is over")
                    }
                })


            },//billable
            probable(){
                this.pt = _.fill(Array(24),0)

                 _.forEach(this.projectsProposal, item =>{
                    if(moment(item.end).isSameOrAfter(moment(), 'day')){
                        let start = moment(item.start).month()
                        let end = moment(item.start).isSame(moment(item.end),'year') ? moment(item.end).month() : moment(item.end).month() + 11
                        let duration = end - start + 1
                        let hours = (item.budget_hours*item.probability)/duration 
                        //console.log(item.name + ' : D-' + duration + " : S-" + start + " : E-"+ end + " : H-" + hours.toFixed(2))
                        let n = []
                        n = _.fill(Array(24),hours,start,end+1)
                        _.forEach(n,(item,index) =>{
                            this.pt[index] = item >= 0 ? this.pt[index] + item : 0
                        })
                        //console.log(this.pt)
                    }
                    else{
                        //console.log("Project " + item.name + " is over")
                    }
                })

            },//probable
        }//METHODS
    }

</script>

<style scoped>

</style>