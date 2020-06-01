<script>
  //import Chart from 'chart.js';
  import { Pie, mixins } from 'vue-chartjs'
  //import * as ChartPieceLabel from 'Chart.PieceLabel.js'
  import 'chartjs-plugin-labels';
  //https://emn178.github.io/Chart.PieceLabel.js/samples/demo/
  import {} from 'chartjs-plugin-datalabels'

  export default {
    extends: Pie,
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
                display: true
          },//LEGEN
          // pieceLabel: {
          //   //render: 'label',
          //   render: 'percentage',
          //   precision: 2,
          //   fontColor: '#FFF'
          // },//PIECE LABEL
                  
          labels: [
            {
              render: 'label',
              position: 'outside'
            },
            {
              render: 'percentage'
            }
          ]
        
        }//OPTIONS
      }//RETURN
    },//DATA
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  }
</script>