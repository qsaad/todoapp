<template>
    <div>
        
                <v-card tile hover>
                    <v-card-title class="indigo white--text">
                        TOTAL LABOR BACKLOG
                    </v-card-title>
                    <v-card-text>
                        <vue-apex-charts width="100%" :type="chartType" :options="options" :series="series"></vue-apex-charts>
                        <!-- <span class="body-2 font-weight-bold">{{jobName}}</span> -->
                        {{updateChart}}
                    </v-card-text>
                    <v-card-actions>
                        <v-layout column align-center>
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
    name:'TotalLaborRemaining',
        components:{
            VueApexCharts,
        },
        data(){
            return{
                //UI PARAMETERS
                jobNumber : '',
                jobName : '',
                date : '',
                selectedRadio : 'used',
                //CHART PARAMETERS
                chartType : 'line',
                options: {
                    chart: {
                        id: 'labor-backlog'
                    },//CHART
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                position: 'top', // top, center, bottom
                            },
                        }
                    },//PLOT OPTIONS
                },
                series: [
                    {name: 'backlog', data: [{ x: '', y: 0}]}
                ],//SERIES
            }
        },
        mounted(){

        },//MOUNTED
        created(){
            B = new Backlog()
        },
        computed:{
            ...mapGetters(['backlogs']),
     
            updateChart(){
                this.series[0].data = []

                if(this.selectedRadio == "remaining"){
                    this.chartType = "line"
                    this.series[0].data = B.TotalLaborRemaining()
                }
                else{
                    this.chartType = "line"
                    this.series[0].data = B.TotalLaborUsed()
                }

            },//UPDATE CHART

        },//COMPUTED
        methods:{

        }//METHODS

}//EXPORT DEFAULT
</script>

<style scoped>

</style>

