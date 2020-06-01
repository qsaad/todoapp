//import moment from 'moment';
import * as moment from 'moment'

const thisWeek = () => { 
    let startDate = moment();
    let endDate = moment().endOf("week");
    return {
        startDate:startDate.format('YYYY-MM-DD'),
        endDate:endDate.format('YYYY-MM-DD')
    }
}

const lastWeek = () => { 
    let d = moment().isoWeekday();
    let startDate = (d == 1) ? moment().add(d-7,'days') : moment().add(1-d-7,'days');
    let endDate = (d == 1) ? moment().add(4,'days') : moment().add(5-d-7,'days');
    return {
        startDate:startDate.format('YYYY-MM-DD'),
        endDate:endDate.format('YYYY-MM-DD')
    }
}

const nextWeek = () => {
    let d = moment().isoWeekday();
    let startDate = (d == 1) ? moment().add(d+7,'days') : moment().add(1-d+7,'days');
    let endDate = (d == 1) ? moment().add(4,'days') : moment().add(5-d+7,'days');
    return {
        startDate:startDate.format('YYYY-MM-DD'),
        endDate:endDate.format('YYYY-MM-DD')
    }
}


//1 = Monday 
//7 = Sunday
const thisMonth = () => {
    let d = moment().isoWeekday();
    let startDate = moment().startOf('month')
    let endDate = moment().endOf('month')
    
    return {
        startDate : startDate.format('YYYY-MM-DD'),
        endDate : endDate.format('YYYY-MM-DD')
    }
}


const tomorrow = () => {
    let d = moment().isoWeekday();
    let dt = moment().add(1,'days') ;
    return dt.format('YYYY-MM-DD');
}

const today = () => {
    let dt = moment() ;
    return dt.format('YYYY-MM-DD');
}

const yesterday = () => {
    let d = moment().isoWeekday();
    let dt = moment().add(-1,'days') ;
    return dt.format('YYYY-MM-DD');
}

const humanize = (date) => {
    return moment(date).fromNow();
}//CONVERTS 2017-02-24 to 1 day ago, in 5 days .....

const day = (date) => {
    return moment(date).format("ddd");
}//CONVERTS 2017-02-24 to MON,TUE,WED,.....

const date = (date) => {
    return moment(date).format("YYYY-MM-DD")
}//RETURNS -> 2017-02-23

export default{
    lastWeek,nextWeek,thisWeek,tomorrow,today,yesterday,humanize,day,thisMonth
}   
   


