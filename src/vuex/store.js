import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import db,{storage} from '../components/config/firebaseInit'
import * as moment from 'moment'

import swal from 'sweetalert2'

//import 'native-toast/dist/native-toast.css'
//import nativeToast from 'native-toast'

import $ from 'jquery'
import { STATUS_CODES } from 'http';
//import 'jquery-toast-plugin/dist/jquery.toast.min.css'
//import 'jquery-toast-plugin/dist/jquery.toast.min.js'
//import toast from 'jquery-toast-plugin'

Vue.use(Vuex)
//Vue.use($)
//Vue.use(toast)


//-----------------------------------------------------------//
//STATE
//-----------------------------------------------------------//
const state = {
    userEmail : '',
    userName : '',
    userRole : '',
    users : [],
    projects:[],
    proposals:[],
    tasks:[],
    notifications:[],
    comments:[],
    //storageRef : storage.ref()
    jobs : [],
    backlogs : [],
    memberCount : 15,
    //DATA UPLOAD
    progressBarCount : 0,
    fileUploadCount : 0,
    //PROJECT USAGE 
    currentProject : ''

}//STATE
//-----------------------------------------------------------//
//GETTERS
//-----------------------------------------------------------//
const getters = {
    userEmail : state => state.userEmail,
    userName : state => state.userName,
    userRole : state => state.userRole,
    
    //USERS
    users : state => state.users,
    usersCount : state => state.users.length,
    usersNameList : state =>  _.values(_.mapValues(state.users, 'email')),
    usersAdmin : state => _.filter(state.users, ['role', 'Admin']),
    usersAdminCount : state => _.filter(state.users, ['role', 'Admin']).length,
    usersUser : state => _.filter(state.users, ['role', 'User']),
    usersUserCount : state => _.filter(state.users, ['role', 'User']).length,
    usersGuest : state => _.filter(state.users, ['role', 'Guest']),
    usersGuestCount : state => _.filter(state.users, ['role', 'Guest']).length,
    //PROJECTS
    projects : state => state.projects,
    projectsCount : state => state.projects.length,
    projectsNameList : state =>  _.values(_.mapValues(state.projects, 'name')),
    projectsJob : (state,getters) => _.orderBy(_.filter(state.projects, ['status', 'Job']),['utilization','name'],['desc','asc']),
    projectsJobCount : state => _.filter(state.projects, ['status', 'Job']).length,
    projectsProposal : state => _.filter(state.projects, ['status', 'Proposal']),
    projectsProposalRecent : state => _.take(_.filter(state.projects, ['status', 'Proposal']),5),
    projectsProposalCount : state => _.filter(state.projects, ['status', 'Proposal']).length,

    //projectsProposalBudget : state => _.map(_.filter(state.projects, ['status', 'Proposal']),['']),
     //PROJECTS
    proposals : state => state.proposals,

    projectsCompleted : state => _.filter(state.projects, ['status', 'Completed']),
    projectsCompletedCount : state => _.filter(state.projects, ['status', 'Completed']).length,
    projectsDead : state => _.filter(state.projects, ['status', 'Dead']),
    projectsDeadCount : state => _.filter(state.projects, ['status', 'Dead']).length,
    //TASKS
    tasks : state => _.orderBy(state.tasks,['due','project_name'],['asc','asc']),
    //tasks : state => _.orderBy(state.tasks,['due','assigned_to','project_name'],['asc','asc','asc']),
    tasksCompleted : state => _.filter(state.tasks, ['completed', true]),
    //tasksCompleted : state => _.orderBy(_.filter(state.tasks, ['completed', true]),['due','assigned_to','project_name'],['asc','asc','asc']),
    tasksCompletedCount : state => (_.filter(state.tasks, ['completed', true])).length,
    tasksPending : state =>  _.filter(state.tasks, ['completed', false]),
    //tasksPending : state =>  _.orderBy(_.filter(state.tasks, ['completed', false]),['due','assigned_to','project_name'],['asc','asc','asc']),
    tasksPendingCount : state => (_.filter(state.tasks, ['completed', false])).length,
    tasksUser : state => _.filter(state.tasks, {'assigned_to': state.userEmail,'completed':false}),
    tasksUserCount : state => (_.filter(state.tasks, {'assigned_to': state.userEmail,'completed':false})).length,

    // tasksThisMonth : state => _.filter(state.tasks, ['due', true]),
    // tasksNextMonth : state => _.filter(state.tasks, ['due', true]),
    // tasksThisWeek : state => _.filter(state.tasks, ['due', true]),   
    // tasksNextWeek : state => _.filter(state.tasks, ['due', true]),
    // tasksToday : state => _.filter(state.tasks, ['due', true]),
    // tasksTomorrow : state => _.filter(state.tasks, ['due', true]),

    //NOTIFICATIONS
    notifications : (state,getters) => _.orderBy(state.notifications,['created','subject','body'],['asc','asc','asc']),
    notificationsUnread : (state,getters) => _.orderBy(_.filter(getters.notifications,['read', false]),['created','subject','body'],['desc','asc','asc']),
    notificationsRead : (state,getters) => _.orderBy(_.filter(getters.notifications,['read', true]),['created','subject','body'],['desc','asc','asc']),
    notificationsUnreadCount : (state,getters) => getters.notificationsUnread.length,
    notificationsReadCount : (state,getters) => getters.notificationsRead.length,

    //NOTES
    comments : state => state.comments,
    //JOBS
    jobs : state => state.jobs,
    //BACKLOGS
    backlogs : state => state.backlogs,
    //PROGRESS BAR
    progressBarCount : state => state.progressBarCount,
    fileUploadCount : state => state.fileUploadCount,
    //CURRENT PROJECT
    currentProject : state => state.currentProject

}//GETTER

//-----------------------------------------------------------//
//MUTATIONS
//-----------------------------------------------------------//
const mutations = {
//-----------------------------------
//USER
//-----------------------------------
    SET_USER_EMAIL(state,payload){state.userEmail = payload.email},
    SET_USER_NAME(state,payload){
        db.collection("users").where("name","==",payload.email).get()
        .then( querySnapshot => {
            querySnapshot.forEach( doc => {
                state.userName = doc.data().name
            })
        })
    },//GET USERS
    SET_USER_ROLE(state,payload){
        db.collection("users")
            .where("email","==",state.userEmail)
            .get()
            .then(querySnapshot =>{
                querySnapshot.forEach(function(doc) {
                    state.userRole = doc.data().role
                });
            })
    },//SET USER ROLE
    GET_USERS(state,payload){
        db.collection("users").get()
        .then( querySnapshot => {
            let items = []
            querySnapshot.forEach( doc => {
                items.push(doc.data())
            })
            state.users = items
        })
    },//GET USERS
    ADD_USER(state,payload){
        let docExist = false
        db.collection("users").where("email", "==", payload.email).get()
            .then( querySnapshot => {
                querySnapshot.forEach( doc => {
                    if (doc.exists) {
                        docExist = true
                        nativeToast({message: "Member already exists " + doc.data().email,type:'success',square : true})
                    } 
                })//DOCUMENT EXISTS
                if(docExist == false){
                    db.collection("users").add({
                        name : payload.name,
                        email : payload.email,
                        role : payload.role,
                        start : payload.start,
                        end : payload.end
                    })
                    .then( doc => {
                        swal({position: 'center',
                            type: 'success',
                            title: 'Member ADDED',
                            showConfirmButton: false,
                            timer: 1000
                        })
                        state.users.push({
                            name : payload.name,
                            email : payload.email,
                            role : payload.role,
                            start : payload.start,
                            end : payload.end
                        })
                    })
                    .catch(function(error) {
                        console.error("Error Adding User: ", error);
                    });
                }//DOCUMENT CREATED
            })//THEN
    },//ADD USER
    UPDATE_USER(state,payload){
        db.collection("users").where("email", "==", payload.key).get()
            .then(querySnapshot => {
                querySnapshot.forEach( doc => {
                    db.collection("users").doc(doc.id).update({
                        name : payload.name,
                        email : payload.email,
                        role : payload.role,
                        start : payload.start,
                        end : payload.end
                    })
                    .then( () => {
                        swal({position: 'center',
                            type: 'success',
                            title: 'Member UPDATED',
                            showConfirmButton: false,
                            timer: 1000
                        })
                        const index = _.findIndex(state.users, ['email', payload.key]);
                        state.users[index].name= payload.name
                        state.users[index].email= payload.email
                        state.users[index].role= payload.role
                        state.users[index].start= payload.start
                        state.users[index].end= payload.end
                    })
                    .catch(function(error) {
                        // The document probably doesn't exist.
                        console.error("Error Updating User: ", error);
                    });
                })
            })
    },//UPDATE USER
    DELETE_USER(state,payload){
        db.collection("users").where("email", "==", payload.email).get()
        .then(querySnapshot => {
            querySnapshot.forEach( doc => {
                db.collection("users").doc(doc.id).delete()
                nativeToast({message: "Member deleted " + payload.email,type:'success',square : true})
                const index = state.users.findIndex(item => item.email == payload.email)
                state.users.splice(index,1)
            })
        })
        .catch(function(error) {
            console.error("Error removing document: ", error);
        });
    },//DELETE USER
//-----------------------------------
//PROJECTS
//-----------------------------------
    GET_PROJECTS(state,payload){
        let items = []
        db.collection("projects").get()
        .then(querySnapshot => {
            querySnapshot.forEach( doc => {
                items.push(doc.data());
            })
            state.projects = items
        })
    },//GET PROJECTS
    ADD_PROJECT(state,payload){
        let docExist = false
            db.collection("projects").where("name","==",_.upperCase(payload.name)).get()
            .then(querySnapshot => {
                querySnapshot.forEach( doc => {
                    if (doc.exists) {
                        docExist = true
                        swal({position: 'center',
                            type: 'warning',
                            title: doc.data().name + ' already exists',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    } 
                })
                if(docExist == false){
                    db.collection("projects").add({
                        number : payload.number,
                        status : payload.status,
                        name : _.upperCase(payload.name),
                        scope : payload.scope,
                        budget_hours : _.toNumber(payload.budget_hours),
                        used_hours : _.toNumber(payload.used_hours),
                        utilization : _.toNumber(payload.used_hours)/_.toNumber(payload.budget_hours),
                        state : payload.state,
                        type : payload.type,
                        start : payload.start,
                        end : payload.end,
                        MU : payload.MU,
                        probability : payload.probability
                    })
                    .then( doc => {
                        swal({position: 'center',
                            type: 'success',
                            title: 'Project CREATED',
                            showConfirmButton: false,
                            timer: 1000
                        })
                        state.projects.push({
                            number : payload.number,
                            status : payload.status,
                            name : _.upperCase(payload.name),
                            scope : payload.scope,
                            budget_hours : _.toNumber(payload.budget_hours),
                            used_hours :_.toNumber(payload.used_hours),
                            utilization : _.toNumber(payload.used_hours)/_.toNumber(payload.budget_hours),
                            state : payload.state,
                            type : payload.type,
                            start : payload.start,
                            end : payload.end,
                            MU : payload.MU,
                            probability : payload.probability
                        })
                    })
                    .catch(function(error) {
                        console.error("Error Adding Project: ", error);
                    });
                }//DOCUMENT CREATED
            })//THEN
    },//ADD PROJECT
    UPDATE_PROJECT(state,payload){
            db.collection("projects").where("name","==",_.upperCase(payload.key)).get()
            .then(querySnapshot => {
                querySnapshot.forEach( doc => {
                    db.collection("projects").doc(doc.id).update({
                        number : payload.number,
                        status : payload.status,
                        name : _.upperCase(payload.name),
                        scope : payload.scope,
                        budget_hours : payload.budget_hours,
                        used_hours : payload.used_hours,
                        utilization : (payload.used_hours/payload.budget_hours),
                        state : payload.state,
                        type : payload.type,
                        start : payload.start,
                        end : payload.end,
                        MU : payload.MU,
                        probability : payload.probability
                    })
                    .then( () => {
                        swal({position: 'center',
                            type: 'success',
                            title: 'Project UPDATED',
                            showConfirmButton: false,
                            timer: 1000
                        })
                        const index = _.findIndex(state.projects, ['name', _.upperCase(payload.key)]);
                        let ratio = payload.used_hours/payload.budget_hours
                        state.projects[index].number = payload.number
                        state.projects[index].status = payload.status
                        //state.projects[index].name = _.upperCase(payload.name)
                        state.projects[index].scope = payload.scope
                        state.projects[index].budget_hours = payload.budget_hours
                        state.projects[index].used_hours = payload.used_hours
                        state.projects[index].utilization = ratio
                        state.projects[index].state = payload.state
                        state.projects[index].type = payload.type
                        state.projects[index].start = payload.start
                        state.projects[index].end = payload.end
                        state.projects[index].MU = payload.MU
                        state.projects[index].probability = payload.probability

                        const index2 = _.findIndex(state.tasks, ['project_name', _.upperCase(payload.key)]);
                        state.tasks[index2].project_name = _.upperCase(payload.name)
                    })
                    .catch(function(error) {
                        // The document probably doesn't exist.
                        console.error("Error Updating Project: ", error);
                    });
                })
            })
    },//UPDATE PROJECT
    DELETE_PROJECT(state,payload){
            db.collection("projects").where("name","==",payload.name).get()
            .then(querySnapshot => {
                querySnapshot.forEach( doc => {
                    db.collection("projects").doc(doc.id).delete()
                    const index = state.projects.findIndex(item => item.name == payload.name)
                    state.projects.splice(index,1)
                })
            })//THEN
            .catch(function(error) {
                console.error("Error Deleting Project: ", error);
            })

            db.collection("tasks").where("project_name","==",payload.name).get()
            .then(querySnapshot => {
                querySnapshot.forEach( doc => {
                    db.collection("tasks").doc(doc.id).delete()
                    const index = state.tasks.findIndex(item => item.project_name == payload.name)
                    state.tasks.splice(index,1)
                })
            })//THEN
            .catch(function(error) {
                console.error("Error Deleting Tasks: ", error);
            });
    },//DELETE PROJECT

    //-----------------------------------
    //PROPOSALS
    //-----------------------------------
    GET_PROPOSALS(state,payload){
        let items = []
        db.collection("proposals").get()
        .then(querySnapshot => {
            querySnapshot.forEach( doc => {
                console.log(doc.data())
                items.push(doc.data());
            })
            state.proposals = items
        })
    },//GET PROPOSALS
    ADD_PROPOSAL(state,payload){
        let docExist = false
            db.collection("proposals").where("name","==",_.upperCase(payload.name)).get()
            .then(querySnapshot => {
                querySnapshot.forEach( doc => {
                    if (doc.exists) {
                        docExist = true
                        swal({position: 'center',
                            type: 'warning',
                            title: doc.data().name + ' already exists',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    } 
                })
                if(docExist == false){
                    db.collection("proposals").add({
                        number : payload.number,
                        status : payload.status,
                        name : _.upperCase(payload.name),
                        scope : payload.scope,
                        budget : _.toNumber(payload.budget),
                        state : payload.state,
                        date : payload.date,
                    })
                    .then( doc => {
                        swal({position: 'center',
                            type: 'success',
                            title: 'Proposal CREATED',
                            showConfirmButton: false,
                            timer: 1000
                        })
                        state.proposals.push({
                            number : payload.number,
                            status : payload.status,
                            name : _.upperCase(payload.name),
                            scope : payload.scope,
                            budget : _.toNumber(payload.budget),
                            date : payload.date,
                        })
                    })
                    .catch(function(error) {
                        console.error("Error Adding Proposal: ", error);
                    });
                }//DOCUMENT CREATED
            })//THEN
    },//ADD PROPOSAL
    UPDATE_PROPOSAL(state,payload){
            db.collection("proposals").where("name","==",_.upperCase(payload.key)).get()
            .then(querySnapshot => {
                querySnapshot.forEach( doc => {
                    db.collection("proposals").doc(doc.id).update({
                        number : payload.number,
                        status : payload.status,
                        name : _.upperCase(payload.name),
                        scope : payload.scope,
                        budget : payload.budget,
                        state : payload.state,
                        date : payload.date,
                    })
                    .then( () => {
                        swal({position: 'center',
                            type: 'success',
                            title: 'Proposal UPDATED',
                            showConfirmButton: false,
                            timer: 1000
                        })
                        const index = _.findIndex(state.proposals, ['name', _.upperCase(payload.key)]);
                        state.proposals[index].number = payload.number
                        state.proposals[index].status = payload.status
                        state.proposals[index].scope = payload.scope
                        state.proposals[index].budget = payload.budget
                        state.proposals[index].state = payload.state
                        state.proposals[index].date = payload.date
                    })
                    .catch(function(error) {
                        // The document probably doesn't exist.
                        console.error("Error Updating Proposal: ", error);
                    });
                })
            })
    },//UPDATE PROPOSAL
    DELETE_PROPOSAL(state,payload){
            db.collection("proposals").where("name","==",payload.name).get()
            .then(querySnapshot => {
                querySnapshot.forEach( doc => {
                    db.collection("proposals").doc(doc.id).delete()
                    const index = state.proposals.findIndex(item => item.name == payload.name)
                    state.proposals.splice(index,1)
                })
            })//THEN
            .catch(function(error) {
                console.error("Error Deleting Proposal: ", error);
            })
    },//DELETE PROPOSAL
//-----------------------------------
//TASKS
//-----------------------------------
    GET_TASKS(state,payload){
        let items = []
        db.collection("tasks").orderBy("due", "asc").get()
        .then(querySnapshot => {
            querySnapshot.forEach( doc => {
                items.push(doc.data());
            })
            state.tasks = items
        })
    },//GET TASKS
    ADD_TASK(state,payload){
        db.collection("tasks").add({
            project_name : payload.project_name,
            description : payload.description,
            assigned_to : payload.assigned_to,
            due : payload.due,
            completed : payload.completed,
        })
        .then( doc => {
            swal({position: 'center',
                type: 'success',
                title: 'Task ASSIGNED',
                showConfirmButton: false,
                timer: 1000
              })
            state.tasks.push({
                project_name : payload.project_name,
                description : payload.description,
                assigned_to : payload.assigned_to,
                due : payload.due,
                completed : payload.completed,
            })
        })
        .catch(function(error) {
            console.error("Error Adding Task: ", error);
        })

        db.collection("notifications").add({
            subject : payload.project_name,
            body : payload.description,
            assigned_to : payload.assigned_to,
            assigned_by : state.userEmail,
            created : moment().format("MM-DD-YYYY"),
            read : false
        })
        .then(doc =>{
            state.notifications.push({
                subject : payload.project_name,
                body : payload.description,
                assigned_to : payload.assigned_to,
                assigned_by : state.userEmail,
                created : moment().format("MM-DD-YYYY"),
                read : false
            })
        })
        .catch(function(error) {
            console.error("Error Adding Notification: ", error);
        })

    },//ADD TASK
    UPDATE_TASK(state,payload){
        db.collection("tasks")
        .where("project_name","==",payload.edited_project_name)
        .where("description","==",payload.edited_description)
        .where("assigned_to","==",payload.edited_assigned_to)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach( doc => {
                db.collection("tasks").doc(doc.id).update({
                    project_name : payload.project_name,
                    description : payload.description,
                    assigned_to : payload.assigned_to,
                    due : payload.due,
                    completed : payload.completed,
                })
                .then( () => {
                    swal({position: 'center',
                        type: 'success',
                        title: 'Task UPDATED',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    const index = _.findIndex(state.tasks, { 'project_name': payload.edited_project_name, 'description': payload.edited_description, 'assigned_to': payload.edited_assigned_to})
                    state.tasks[index].project_name= payload.project_name
                    state.tasks[index].description= payload.description
                    state.tasks[index].assigned_to= payload.assigned_to
                    state.tasks[index].due= payload.due
                    state.tasks[index].completed= payload.completed
                })
                .catch(function(error) {
                    // The document probably doesn't exist.
                    console.error("Error Updating Task: ", error);
                });
            })
        })
    },//UPDATE TASK
    TOGGLE_TASK(state,payload){
        db.collection("tasks")
        .where("project_name","==",payload.project_name)
        .where("description","==",payload.description)
        .where("assigned_to","==",payload.assigned_to)
        .get()
        .then(querySnapshot => {
            let message = payload.completed ? "completed" : "pending"
            querySnapshot.forEach( doc => {
                db.collection("tasks").doc(doc.id).update({
                    completed : payload.completed,
                })
                .then( () => {
                    swal({position: 'center',
                        type: 'success',
                        title: 'Task ' + message,
                        showConfirmButton: false,
                        timer: 1000
                    })
                    const index = _.findIndex(state.tasks, { 'project_name': payload.project_name, 'description': payload.description, 'assigned_to': payload.assigned_to})
                    state.tasks[index].completed= payload.completed
                })
            })
        })
    },//TOGGLE TASK
    DELETE_TASK(state,payload){
        db.collection("tasks")
        .where("project_name","==",payload.project_name)
        .where("description","==",payload.description)
        .where("assigned_to","==",payload.assigned_to)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach( doc => {
                db.collection("tasks").doc(doc.id).delete()
                const index = _.findIndex(state.tasks, { 'project_name': payload.project_name, 'description': payload.description, 'assigned_to': payload.assigned_to})
                state.tasks.splice(index,1)
            })
        })//THEN
        .catch(function(error) {
            console.error("Error Deleting Task: ", error);
        });
    },//DELETE TASK
//-----------------------------------
//NOTIFICATIONS
//-----------------------------------
    GET_NOTIFICATIONS(state,payload){
        let items = []
        db.collection("notifications").where("assigned_to","==",state.userEmail).get()
        .then(querySnapshot => {
            querySnapshot.forEach( doc => {
                items.push(doc.data());
            })
            state.notifications = items
        })
    },//GET PROJECTS
    TOGGLE_NOTIFICATION(state,payload){
        db.collection("notifications")
        .where("subject","==",payload.subject)
        .where("assigned_to","==",payload.assigned_to)
        .where("body","==",payload.body)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach( doc => {
                db.collection("notifications").doc(doc.id).update({
                    read : payload.read,
                })
                .then( () => {
                    const index = _.findIndex(state.notifications, { 'subject': payload.subject, 'body': payload.body, 'assigned_to': payload.assigned_to})
                    state.notifications[index].read= payload.read
                })
            })
        })
    },//TOGGLE TASK
    DELETE_NOTIFICATION(state,payload){
        db.collection("notifications")
        .where("subject","==",payload.subject)
        .where("body","==",payload.body)
        .where("assigned_to","==",payload.assigned_to)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach( doc => {
                db.collection("notifications").doc(doc.id).delete()
                swal({position: 'center',
                        type: 'success',
                        title: 'Notification DELETED',
                        showConfirmButton: false,
                        timer: 1500
                    })
                const index = _.findIndex(state.notifications, { 'subject': payload.subject, 'body': payload.body, 'assigned_to': payload.assigned_to})
                state.notifications.splice(index,1)
            })
        })//THEN
        .catch(function(error) {
            console.error("Error Deleting Notification: ", error);
        });
    },//DELETE TASK

    //-----------------------------------
    //FILE STORAGE
    //-----------------------------------
    GET_FILE(state,payload){
        const storageRef = storage.ref()

    },//GET FILE
    ADD_FILE(state,payload){
        const storageRef = storage.ref()

        let file = payload
        let metadata = {
            contentType : 'image/jpg'
        }
        storageRef.child(file.name).put(file)

    },//UPLOAD FILE
    UPDATE_FILE(state,payload){

    },//UPDATE FILE
    DELETE_FILE(state,payload){

    },//DELETE FILE

    //-----------------------------------
    //JOBS
    //-----------------------------------
    ADD_JOB(state,payload){
        let errorCount = 0
        let jobsCount = 0
        _.forEach(payload, item =>{
            let docExist = false
            db.collection("jobs").where("number","==",item.number).get()
            .then(querySnapshot => {
                querySnapshot.forEach( doc => {
                    if (doc.exists) {
                        docExist = true
                    } 
                })
                if(docExist == false){
                    jobsCount += 1
                    db.collection("jobs").add({
                        number : item.number,
                        name : _.upperCase(item.name),
                    })
                    .then( doc => {
                        state.jobs.push({
                            number : item.number,
                            name : _.upperCase(item.name),
                        })
                    })
                }//DOCUMENT CREATED
            })//THEN
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                errorCount += 1
                console.error("Error writing document: ", error);
            });

        })//FOREACH PAYLOAD 

        if(errorCount == 0){
            if(jobsCount > 0){
                swal({position: 'center',
                    type: 'success',
                    title: jobsCount + 'JOBS SUCCESSFULLLY UPLOADED',
                    showConfirmButton: false,
                    timer: 1000
                })
            }
            else{
                swal({position: 'center',
                    type: 'warning',
                    title: 'NO JOBS TO BE UPLOADED',
                    showConfirmButton: false,
                    timer: 1000
                })
            }
        }
        else{
            swal({position: 'center',
                type: 'error',
                title: errorCount + 'ERRORS OCCURED',
                showConfirmButton: false,
                timer: 1000
            })
        }
        
    },//ADD PROJECT

    //-----------------------------------
    //BACKLOGS
    //-----------------------------------
    GET_BACKLOG(state,payload){
        let items = []
        db.collection("backlogs").orderBy("date", "asc").get()
        .then(querySnapshot => {
            querySnapshot.forEach( doc => {
                items.push(doc.data());
            })
            state.backlogs = items
        })
    },//GET BACKLOGS
    ADD_BACKLOG(state,payload){
        state.progressBarCount = 0
        state.fileUploadCount = 0
        let total = payload.length
        _.forEach(payload, (item,i) =>{
            db.collection("backlogs").add({
                date : moment(item.date).format("YYYY-MM-DD"),
                number : item.number,
                name : _.upperCase(item.name),
                labor : item.labor,
                budget : item.budget
            })
            .then((docRef) =>{
                state.backlogs.push({
                    date : moment(item.date).format("YYYY-MM-DD"),
                    number : item.number,
                    name : _.upperCase(item.name),
                    labor : item.labor,
                    budget : item.budget
                })
                state.progressBarCount = ((i/total)*100).toFixed(0)
                state.fileUploadCount = i + 1
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        })//LOOP ITEM IN PAYLOAD
    },//ADD BACKLOG
    DELETE_BACKLOG(state,payload){
        let i = 0
        state.progressBarCount = 0
        state.fileUploadCount = 0
        
        db.collection("backlogs").where("date","==",payload.date).get()
        .then(querySnapshot => {
            let total = querySnapshot.docs.length
            querySnapshot.forEach( doc => {
                db.collection("backlogs").doc(doc.id).delete()
                .then(function() {
                    _.remove(state.backlogs, (item,i) =>{
                        state.progressBarCount = ((i/total)*100).toFixed(0)
                        state.fileUploadCount = i + 1
                        return item.date == payload.date
                    })
                    console.log("Document successfully deleted!");
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                })
            })
        })//THEN
        .catch(function(error) {
            console.error("Error Deleting Comment: ", error);
        });
        
    },//DELETE BACKLOG

     //-----------------------------------
    //NOTES
    //-----------------------------------
    GET_COMMENTS(state,payload){
        let items = []
        db.collection("comments").orderBy("date", "asc").get()
        .then(querySnapshot => {
            querySnapshot.forEach( doc => {
                items.push(doc.data());
            })
            state.comments = items
        })
    },//GET NOTES
    ADD_COMMENT(state,payload){
        db.collection("comments").add({
            project_number : payload.project_number,
            project_name : payload.project_name,
            description : payload.description,
            author : payload.author,
            date : payload.date,
        })
        .then( doc => {
            swal({position: 'center',
                type: 'success',
                title: 'Comment ADDED',
                showConfirmButton: false,
                timer: 1000
              })
            state.comments.push({
                project_number : payload.project_number,
                project_name : payload.project_name,
                description : payload.description,
                author : payload.author,
                date : payload.date,
            })
        })
        .catch(function(error) {
            console.error("Error Adding Comment: ", error);
        })
    },//ADD NOTE
    UPDATE_COMMENT(state,payload){
        db.collection("comments")
        .where("project_number","==",payload.edited_project_number)
        .where("description","==",payload.edited_description)
        .where("author","==",payload.edited_author)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach( doc => {
                db.collection("comments").doc(doc.id).update({
                    project_number : payload.project_number,
                    project_name : payload.project_name,
                    description : payload.description,
                    author : payload.author,
                    date : payload.date,
                })
                .then( () => {
                    swal({position: 'center',
                        type: 'success',
                        title: 'Comment UPDATED',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    const index = _.findIndex(state.comments, { 'project_number': payload.edited_project_number,'project_name': payload.edited_project_name, 'description': payload.edited_description, 'author': payload.edited_author})
                    state.comments[index].project_name= payload.project_name
                    state.comments[index].project_number= payload.project_number
                    state.comments[index].description= payload.description
                    state.comments[index].author= payload.author
                    state.comments[index].date= payload.date
                })
                .catch(function(error) {
                    // The document probably doesn't exist.
                    console.error("Error Updating Comment: ", error);
                });
            })
        })
    },//UPDATE NOTE
    DELETE_COMMENT(state,payload){
        db.collection("comments")
        .where("project_name","==",payload.project_name)
        .where("project_number","==",payload.project_number)
        .where("description","==",payload.description)
        .where("author","==",payload.author)
        .where("date","==",payload.date)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach( doc => {
                db.collection("comments").doc(doc.id).delete()
                const index = _.findIndex(state.comments, { 'project_number': payload.project_number,'project_name': payload.project_name, 'description': payload.description, 'author': payload.author})
                state.comments.splice(index,1)
            })
        })//THEN
        .catch(function(error) {
            console.error("Error Deleting Comment: ", error);
        });
    },//DELETE NOTE
   

  }//MUTATIONS
//-----------------------------------------------------------//
//ACTIONS
//-----------------------------------------------------------//
const actions = {
    setUserEmail : (context,payload) => {context.commit("SET_USER_EMAIL",payload)},
    setUserName : (context,payload) => {context.commit("SET_USER_NAME",payload)},
    setUserRole : (context,payload) => {context.commit("SET_USER_ROLE",payload)},

    getUsers: (context, payload) => {context.commit("GET_USERS", payload)},
    addUser: (context, payload) => {context.commit("ADD_USER", payload)},
    updateUser: (context, payload) => {context.commit("UPDATE_USER", payload)},
    deleteUser: (context, payload) => {context.commit("DELETE_USER", payload)},

    getProjects: (context, payload) => {context.commit("GET_PROJECTS", payload)},
    addProject: (context, payload) => {context.commit("ADD_PROJECT", payload)},
    updateProject: (context, payload) => {context.commit("UPDATE_PROJECT", payload)},
    deleteProject: (context, payload) => {context.commit("DELETE_PROJECT", payload)},

    getProposals: (context, payload) => {context.commit("GET_PROPOSALS", payload)},
    addProposal: (context, payload) => {context.commit("ADD_PROPOSAL", payload)},
    updateProposal: (context, payload) => {context.commit("UPDATE_PROPOSAL", payload)},
    deleteProposal: (context, payload) => {context.commit("DELETE_PROPOSAL", payload)},

    getTasks: (context, payload) => {context.commit("GET_TASKS", payload)},
    addTask: (context, payload) => {context.commit("ADD_TASK", payload)},
    updateTask: (context, payload) => {context.commit("UPDATE_TASK", payload)},
    toggleTask: (context, payload) => {context.commit("TOGGLE_TASK", payload)},
    deleteTask: (context, payload) => {context.commit("DELETE_TASK", payload)},

    getNotifications: (context, payload) => {context.commit("GET_NOTIFICATIONS", payload)},
    toggleNotification: (context, payload) => {context.commit("TOGGLE_NOTIFICATION", payload)},
    deleteNotification: (context, payload) => {context.commit("DELETE_NOTIFICATION", payload)},

    getFile: (context, payload) => {context.commit("GET_FILE", payload)},
    addFile: (context, payload) => {context.commit("ADD_FILE", payload)},
    updateFile: (context, payload) => {context.commit("UPDATE_FILE", payload)},
    deleteFile: (context, payload) => {context.commit("DELETE_FILE", payload)},

    addJob: (context, payload) => {context.commit("ADD_JOB", payload)},

    getBacklog: (context, payload) => {context.commit("GET_BACKLOG", payload)},
    addBacklog: (context, payload) => {context.commit("ADD_BACKLOG", payload)},
    deleteBacklog: (context, payload) => {context.commit("DELETE_BACKLOG", payload)},

    getComments: (context, payload) => {context.commit("GET_COMMENTS", payload)},
    addComment: (context, payload) => {context.commit("ADD_COMMENT", payload)},
    updateComment: (context, payload) => {context.commit("UPDATE_COMMENT", payload)},
    deleteComment: (context, payload) => {context.commit("DELETE_COMMENT", payload)},

}//ACTIONS
//-----------------------------------------------------------//
//EXPORT
//-----------------------------------------------------------//

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
})