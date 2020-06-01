import * as moment from 'moment'
import * as R from 'ramda'

export default class Jobs{
    constructor(){

    }

    testMethod(){
        console.log(moment())
        console.log(R.add(1, 2))
    }

//FETCH BACKLOG RECORDS FOR SPECIFIED DATE
    backlogRecords(date){
       
    }

//PROJECT RECORDS
    projectData(number){

    }//PROJECT DATA

//PROJECT MESSAGES
    projectMessages(number){

    }//PROJECT MESSAGES

//PROJECT TIMELINE
    projectTimeline(number){

    }// PROJECT TIMELINE

//PROJECT LABOR HOUR
    projectLaborHours(number){

    }//PROJECT LABOR HOURS

}//CLASS END