<template>
    <div>
        <v-card tile hover>
            <v-card-title class="indigo white--text">
               {{selectedName}}
            </v-card-title>
            <v-card-text>
                {{updateChart}}
                <!-- <vue-apex-charts width="100%" :type="chartType" :options="options" :series="series" v-if="selectedNumber !== ''"></vue-apex-charts> -->
                <vue-apex-charts width="100%" :type="chartType" :options="options" :series="series"></vue-apex-charts>
                <!-- <span class="body-2 font-weight-bold">{{jobName}}</span> -->
                
            </v-card-text>
            <v-card-actions>
                <v-layout column align-center>
                    <!-- <v-flex >
                        <v-combobox :items="nameList" label="Job Name" v-model="selectedName" prepend-icon="filter_list" browser-autocomplete @change="setCurrentProject" clearable></v-combobox>
                    </v-flex> -->
                    <v-flex >
                        <v-radio-group v-model="selectedRadio" row>
                            <v-radio label="Used" value="used"></v-radio>
                            <v-radio label="Remaining" value="remaining"></v-radio>
                        </v-radio-group>
                    </v-flex>
                </v-layout>
            </v-card-actions>
        </v-card>
    </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'
import VueApexCharts from 'vue-apexcharts'
import Backlog from '../classes/backlog'

let B = {}

export default {
    name:'ProjectLaborUsage',
    components:{
            VueApexCharts,
    },
    props: {
      selectedName: {
        type: String,
        default: ''
      },//GROUPS
    },
        data(){
            return{
                //UI
                selectedNumber : '',
                //selectedName : '',
                jobName : '',
                selectedRadio : 'used',
                //CHART PARAMETERS
                chartType : 'line',
                options: {
                    chart: {
                        id: 'labor-usage'
                    },
                    xaxis: {
                        //type: 'datetime',
                        labels: {
                            rotate: 90
                        }
                    },
                },//OPTIONS
                series: [
                    {name: 'labor', data: [{ x: '', y: 0 }]},
                    {name: 'budget', data: [{ x: '', y: 0 }]},
                    {name: 'ca', data: [{ x: '', y: 0 }]},
                ],//SERIES
            }//RETURN
        },//DATA
        mounted(){

        },//MOUNTED
        created(){
            B = new Backlog()
        },
        beforeDestroy() {
            this.$store.currentProject = ''
        },
        computed:{
            ...mapGetters(['backlogs']),
           
            numberList(){
                return B.projectNumbersList()
            },//JOB NUMBERS LIST
            nameList(){
                return B.projectNamesList()
            },//JOB NAMES LIST
            updateChart(){
                this.series[0].data = []
                this.series[1].data = []
                this.series[2].data = []

                this.selectedNumber = B.projectNumber(this.selectedName)
                this.jobName = B.projectName(this.selectedNumber)
              
                if(this.selectedRadio == "used"){
                    this.chartType = "line"
                    this.series[0].data = B.ProjectLaborUsage(this.selectedNumber)
                    this.series[1].data = B.ProjectBudget(this.selectedNumber)
                    this.series[2].data = B.ProjectCA(this.selectedNumber)
                }
                else{
                    this.chartType = "bar"
                    this.series[0].data = B.ProjectLaborRemaining(this.selectedNumber)
                    this.series[1].data = []
                    this.series[2].data = []
                }
               
            },//UPDATE CHART

        },//COMPUTED
        methods:{
           setCurrentProject(){
               this.$store.currentProject = this.selectedName
           }
        }//METHODS

}//EXPORT DEFAULT
</script>

<style scoped>

</style>

