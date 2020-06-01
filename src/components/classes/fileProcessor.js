//import * as moment from 'moment'
//import * as R from 'ramda'
import XLSX from 'xlsx'

export default class FileProcessor{
    constructor(){
        this.jsonData = []
        this.modifiedData = []
        this.backlogDate = ''
    }

 //PROCESS DATA 
    convertXlsToJson(fileData,fileName){
        let rawDate = fileName.substring(
            fileName.lastIndexOf("_") + 1, 
            fileName.lastIndexOf(".")
        )
       
        this.backlogDate = rawDate.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
        
        let reader = new FileReader()
        reader.readAsArrayBuffer(fileData)

        reader.onload = (e) =>{
            let data = event.target.result
            let workbook = XLSX.read(data, {type : 'array'})
            let first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
            this.jsonData = XLSX.utils.sheet_to_json(first_worksheet,{raw:true})

            this.modifiedData = _.map(this.jsonData, (item,index) => {
                let i = 0
                _.forEach(item, (v,k) =>{
                    if(k.search(/project number/i) > 0){
                        item["number"] = _.clone(item[k],true)
                        delete item[k]
                    }
                    if(k.search(/details field/i) > 0){
                        item["field"] = _.clone(item[k],true)
                        delete item[k]
                    }
                    if(k.search(/budget/i) > 0){
                        item["budget_hours"] = _.toNumber(_.clone(item[k],true))
                        delete item[k]
                    }
                    if(k.search(/jtd/i) > 0){
                        item["used_hours"] = _.toNumber(_.clone(item[k],true))
                        delete item[k]
                    }
                    if(k.search(/short name/i) > 0){
                        item["name"] = _.clone(item[k],true)
                        delete item[k]
                    }
                    if(k.search(/phase/i) > 0){
                        //Converts string to a single digit
                        let str = String(_.clone(item[k],true))
                        let num = _.parseInt(str.match(/\d+/)[0])
                        item["phase"] = (num > 9) ? Math.floor((num / 1) % 10) : num
                        delete item[k]
                    }
                })
                return item
            })//FOREACH
        }//READER
        //console.log(this.modifiedData)
    }//PROCESSDATA


    formatJobsDataForFirebase(){
        let formattedData = []
        let name = ''
        let number = ''

        _.forEach(_.groupBy(this.modifiedData,'number'), (data,index) =>{
            number = index
            name = ''
            _.forEach(data, (item,i)=>{
                name = item.name
            })

            formattedData.push({
                number : number,
                name : name,
            })//FORMATTED DATA

        })//LOOP THRU EACH BACKLOG

        return formattedData
    }

    formatBacklogsDataForFirebase(){
        let formattedData = []
        let name = ''
        let number = ''
        let labor = 0
        let budget = 0

        _.forEach(_.groupBy(this.modifiedData,'number'), (data,index) =>{
            number = index
            name = ''
            labor = 0
            budget = 0
            _.forEach(data, (item,i)=>{
                name = item.name
                labor += item.used_hours
                budget += item.budget_hours
            })

            formattedData.push({
                number : number,
                name : name,
                date : this.backlogDate,
                labor : labor,
                budget : budget
            })

        })//LOOP THRU EACH BACKLOG

        return formattedData
    }

}//CLASS END