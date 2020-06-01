import * as moment from 'moment'
import * as R from 'ramda'
import store from '@/vuex/store.js';


export default class Backlog{
    constructor(){
        this.data = store.getters.backlogs
        this.projects = store.getters.projects

        this.lastUploadDate = R.compose(R.last(),R.compose(R.uniq,R.pluck('date')))(this.data)
        this.previousUploadDate =  moment(this.lastUploadDate).subtract(7,'days')
        
        
        this.currentData = R.filter(x => x.date >= this.lastUploadDate)(this.data) 
        this.previousData = R.filter(x => moment(x.date).isBetween(this.previousUploadDate, this.lastUploadDate))(this.data) 
        
        this.proposalsData = R.filter(x => x.status == 'Proposal')(this.projects)
        
        this.sortByName = R.sortBy(R.prop('name'))
        this.sortByNumber = R.sortBy(R.prop('number'))
        this.sortByDate = R.sortBy(R.prop('date'))

        this.groupByName = R.groupBy(R.prop('name'))
        this.groupByNumber = R.groupBy(R.prop('number'))
        this.groupByDate = R.groupBy(R.prop('date'))
        
        this.getNames = R.compose(R.uniq, R.pluck('name'))
        this.getNumbers = R.compose(R.uniq, R.pluck('number'))
        this.getDates = R.compose(R.ascend, R.uniq, R.pluck('date'))

        this.getLaborHours = R.map(x => x.labor)
        this.getBudgetHours = R.map(x => x.budget)
        this.getBacklogHours = R.map(x => x.budget - x.labor)

        this.getProposalHours = R.map(x => x.budget_hours)

        //this.filterByNumber = R.map(x => x.number == R._)
        //this.filterByDate = R.map(x => x.date === R._)
        //this.findByLabor = R.filter(x => x.budget > R._)

        this.filterByUnderBudgetProjects = R.filter(x => x.labor < x.budget)
        this.filterByOverBudgetProjects = R.filter(x => x.labor >= x.budget)
        this.filterByActiveProjects = R.filter(x => x.labor > 0)
        this.filterByDormantProjects = R.filter(x => x.labor == 0)

        this.top5 = R.take(5)
        this.top10 = R.take(10)
        this.top15 = R.take(15)
        this.getLastItem = R.last()
        this.count = R.length()
        this.total = R.sum()


        //const nameLens = lensProp('name')
        this.groupedNameLens = R.lensPath(['date'])
        //view(nameLens, person)

        this.itemForDate = R.curry((date, item) => item.date === date)
  
    }

    //GET LIST OF DATES FOR ALL UPLOADED BACKLOGS
    getDateList(){
        return _.sortBy(this.data, ['date'])
        //return R.compose(this.getDates)(this.data)
    }
    //GET DATE OF LAST UPLOADED BACKLOG
    getLastDate(){
        return R.compose(this.getLastItem,this.sortByDate,this.getDates)(this.data)
    }
    //GET COUNT OF UPLOADED BACKLOGS
    getBacklogCount(){
        return R.compose(this.count,this.getDates)(this.data)
    }
    //GET DATA FOR LAST UPLOADED BACKLOG
    getCurrentData(){
        return this.currentData
    }
    //GET DATA FOR PREVIOUS UPLOADED BACKLOG
    getPreviousData(){
        return this.previousData
    }

    getNamesForDate(date){
        //return this.currentData
        return R.pipe(
            R.filter(x => R.identical(x.date,date)),
            R.project(['name','labor','budget'])
            //R.map(item => item.name)
        )(this.currentData)
    }

    getCurrentBacklogDate(){
        return R.compose(this.getLastItem, this.getDates)(this.data)
    }

    getCurrentProjectsCount(){
        return this.count()(this.currentData)
    }

    getOverBudgetProjectsCount(){
        return R.compose(this.count,this.filterByOverBudgetProjects)(this.currentData)
    }

    getActiveProjectsCount(){
        return R.compose(this.count,this.filterByActiveProjects)(this.currentData)
    }

    getDormantProjectsCount(){
        return R.compose(this.count,this.filterByDormantProjects)(this.currentData)
    }

    getLaborSum(){
        let hours = R.compose(this.total,this.getLaborHours)(this.currentData)
        return hours.toFixed(0)
    }

    getBudgetSum(){
        let hours = R.compose(this.total,this.getBudgetHours)(this.currentData)
        return hours.toFixed(0)
    }

    getBacklogSum(){
        let hours = R.compose(this.total,this.getBacklogHours,this.filterByUnderBudgetProjects)(this.currentData)
        return hours.toFixed(0)
    }

    getLaborSumLastWeek(){
        let hoursLastWeek = R.compose(this.total,this.getLaborHours)(this.previousData)
        let hoursThisWeek = R.compose(this.total,this.getLaborHours)(this.currentData)
        return (hoursThisWeek-hoursLastWeek).toFixed(0)
    }

    getLaborSumLastWeekProjectsUnderBudget(){
        let hoursLastWeek = R.compose(this.total,this.getLaborHours,this.filterByUnderBudgetProjects)(this.previousData)
        let hoursThisWeek = R.compose(this.total,this.getLaborHours,this.filterByUnderBudgetProjects)(this.currentData)
        return (hoursThisWeek-hoursLastWeek).toFixed(0)
    }

    getLaborSumLastWeekProjectsOverBudget(){
        let hoursLastWeek = R.compose(this.total,this.getLaborHours,this.filterByOverBudgetProjects)(this.previousData)
        let hoursThisWeek = R.compose(this.total,this.getLaborHours,this.filterByOverBudgetProjects)(this.currentData)
        return (hoursThisWeek-hoursLastWeek).toFixed(0)
    }

    getOverBudgetProjectsWithLaborLastWeek(){

    }

    getProposalSum(){
        let hours = R.compose(this.total,this.getProposalHours)(this.proposalsData)
        return hours.toFixed(0)
    }

    getFullTimeEquivalent(){
        let billable = this.getLaborSumLastWeekProjectsUnderBudget()
        let nonProduction = 75
        let proposal = this.getProposalSum()*0.5

        return (billable + nonProduction + proposal)/(2080/12)
    }

    getGroupedNames(){
        return R.view(this.groupedNameLens,this.data)
    }


    //FETCH BACKLOG RECORDS FOR SPECIFIED DATE
    backlogDateList(){
        return _.orderBy(_.groupBy(this.data,'date'),['asc'])
    }// BACKLOG DATE LIST

    TotalLaborUsage(){
        let arr = []
        let date = ''
        let hours = 0
        _.forEach(_.orderBy(_.groupBy(this.data,'date'),['asc']), (items,index) =>{
            date = ''
            hours = 0
            _.forEach(items, item =>{
                date = item.date
                hours +=  item.labor
            })
            arr.push({x:date.slice(5), y:hours})
        })
        return arr
    } // TOTAL LABOR REMAINING

    TotalLaborRemaining(){
        let arr = []
        let date = ''
        let hours = 0
        _.forEach(_.orderBy(_.groupBy(this.data,'date'),['asc']), (items,index) =>{
            date = ''
            hours = 0
            _.forEach(items, item =>{
                date = item.date
                hours += (item.budget > item.labor) ? item.budget-item.labor : 0
            })
            arr.push({x:date.slice(5), y:hours})
        })

        return arr
    } // TOTAL LABOR REMAINING

    TotalLaborUsed(){
        let arr = []
        let date = ''
        let hours = 0
        _.forEach(_.orderBy(_.groupBy(this.data,'date'),['asc']), (items,index) =>{
            date = ''
            hours = 0
            _.forEach(items, item =>{
                date = item.date
                hours += item.labor 
            })
            arr.push({x:date.slice(5), y:hours})
        })

        return arr
    } // TOTAL LABOR REMAINING

//PROJECT RECORDS
    projectNumbersList(){
        return R.compose(this.getNumbers, this.sortByNumber)(this.data)
        //return this.getNumbers(this.data)
        //return _.uniq(_.map(this.data, 'number'))
    }//PROJECT DATA

    projectNamesList(){
        return R.compose(this.getNames, this.sortByName)(this.data)
    }//PROJECT DATA

    projectNumber(name){
        let obj = _.find(this.data, x => x.name === name)
        return (obj !== undefined) ? obj.number : ''
    }

    projectName(number){
        let obj = _.find(this.data, x => x.number === number)
        return (obj !== undefined) ? obj.name : ''

        // let obj = _.filter(this.data, {number : number})[0]
        // return obj
    }//PROJECT DATA

    ProjectLaborUsage(number){
        let arr = []
        _.forEach(_.filter(this.data,{number : number}), item =>{
            arr.push({x:item.date.slice(5), y:item.labor})
        })
        return arr
    } // PROJECT LABOR USED

    ProjectLaborRemaining(number){
        let arr = []
        let hours = 0
        _.forEach(_.filter(this.data,{number : number}), item =>{
            //hours = (item.budget > item.labor) ? item.budget-item.labor : 0
            hours =  item.budget-item.labor 
            arr.push({x:item.date.slice(5), y:hours})
        })
        return arr
    } // PROJECT LABOR REMAINING

    ProjectBudget(number){
        let arr = []
        _.forEach(_.filter(this.data,{number : number}), item =>{
            arr.push({x:item.date.slice(5), y:item.budget})
        })
        return arr
    } // PROJECT BUDGET

    ProjectCA(number){
        let arr = []
        //CA IS ASSUMED TO BE TO 20% OF TOTAL BUDGET 
        _.forEach(_.filter(this.data,{number : number}), item =>{
            arr.push({x:item.date.slice(5), y:(item.budget)*0.8})
        })
        return arr
    } // PROJECT BUDGET

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
