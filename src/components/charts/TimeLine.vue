<template>
    <div>
      <v-card tile hover>
            <v-card-title class="indigo white--text">
                TIMELINE
            </v-card-title>
            <v-card-text>
                <div ref="visualization"></div>
            </v-card-text>
            <v-card-actions>
                <v-layout row justify-center>
                    <v-flex >
                        <v-btn class="primary" @click="fit">Fit All</v-btn>
                    </v-flex>
                    <v-flex>
                        <v-btn class="primary" @click="currentWeek">Current</v-btn>
                    </v-flex>
                </v-layout>
            </v-card-actions>
        </v-card>
    </div>

</template>


<script>
  import { DataSet, DataView, Timeline } from 'vis'
  import * as moment from 'moment'

  export default {
    name:'timeline',
    props: {
      groups: {
        type: [Array, DataSet, DataView],
        default: () => []
      },//GROUPS
      items: {
        type: [Array, DataSet, DataView],
        default: () => []
      },//ITEMS
      options: {
        type: Object
      },//OPTIONS
      events: {
        type: Array,
        default: () => [
          'click',
          'contextmenu',
          'currentTimeTick',
          'doubleClick',
          'drop',
          'mouseOver',
          'mouseDown',
          'mouseUp',
          'mouseMove',
          'groupDragged',
          'changed',
          'rangechange',
          'rangechanged',
          'select',
          'itemover',
          'itemout',
          'timechange',
          'timechanged'
        ],
      },//EVENTS
    },//PROPS
    data(){
      return{
  
      }//RETURN
    },//DATA
    watch: {
      options: {
        deep: true,
        handler(v) {
          this.timeline.setOptions(v);
        }
      },//OPTIONS
      selection: {
        deep: false,
        handler(v) {
          this.timeline.setSelection(v);
        }
      }//SELECTION
    },//WATCH
    created(){
      this.timeline = null;
    },//CREATED
    mounted () {
      const container = this.$refs.visualization;
      this.timeline = new Timeline(container, this.items, this.groups, this.options)
    },//MOUNTED
    beforeDestroy() {
      this.timeline.destroy();
    },
    computed:{


    },//COMPUTED
    methods:{
      fit(){
        this.timeline.fit()
      },
      currentWeek(){
        this.timeline.setWindow(moment().subtract(5,'days'), moment().add(5,'days'))
      },
      //CUSTOM METHODS
      getSelection() {
        return this.timeline.getSelection();
      },
    }//METHODS
  }//EXPORT DEFAULT
</script>

<style type="text/css" scoped>
    body, html {
      font-family: sans-serif;
    }

    /* alternating column backgrounds */
    .vis-time-axis .vis-grid.vis-odd {
      background: #f5f5f5;
    }

    /* gray background in weekends, white text color */
    .vis-time-axis .vis-grid.vis-saturday,
    .vis-time-axis .vis-grid.vis-sunday {
      background: gray;
    }
    .vis-time-axis .vis-text.vis-saturday,
    .vis-time-axis .vis-text.vis-sunday {
      color: white;
    }
  </style>

