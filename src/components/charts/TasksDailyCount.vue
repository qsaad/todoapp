<script>
  import { Bar, mixins } from 'vue-chartjs'
  import {} from 'chartjs-plugin-datalabels'

  export default {
    extends: Bar,
    mixins: [mixins.reactiveProp],
    props: ['chartData'],
    data(){
      return{
        options:{
          plugins:{
            datalabels:{
              display: false,
            }
          },
          responsive: true, 
          maintainAspectRatio: false,
          legend: {
            display: false
          },//LEGEND
          scales: {
            yAxes: [{
                display: true,
                ticks: {
                    suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                    // OR //
                    beginAtZero: true   // minimum value will be 0.
                }
            }]//Y AXES
          }//SCALES
        }//OPTIONS
      }//RETURN
    },//DATA
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  }
</script>
