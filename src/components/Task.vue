<template>
    <app-layout>
        <template slot="app-content">
                <v-toolbar color="teal darken-1" dark flat>
                    <v-toolbar-title>TASKS</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-text-field append-icon="search" label="Search" single-line hide-details clearable v-model="search" color="white" class="mb-1 pb-0"></v-text-field>
                </v-toolbar>
                    <v-card flat>
                        <v-btn fab small color="light-green darken-1" top left absolute @click.native.stop="dialog = !dialog">
                            <v-icon color="white">add</v-icon>
                        </v-btn>
                        <v-layout row>
                            <v-flex xs12>
                                <v-btn-toggle v-model="taskStatus" class="mt-2 mb-2">
                                    <v-btn flat value="all">
                                        <v-badge color="green" >
                                            <span slot="badge" v-if="taskStatus =='all'">{{taskCount}}</span>
                                            <span>All</span>
                                        </v-badge>
                                    </v-btn>
                                    <v-btn flat value="pending">
                                        <v-badge color="green" >
                                            <span slot="badge" v-if="taskStatus =='pending'">{{taskCount}}</span>
                                            <span>Pending</span>
                                        </v-badge>
                                    </v-btn>
                                    <v-btn flat value="completed">
                                        <v-badge color="green" >
                                            <span slot="badge" v-if="taskStatus =='completed'">{{taskCount}}</span>
                                            <span>Complete</span>
                                        </v-badge>
                                    </v-btn>
                                    <v-btn flat value="user">
                                        <v-badge color="green" >
                                            <span slot="badge" v-if="taskStatus =='user'">{{taskCount}}</span>
                                            <span>My</span>
                                        </v-badge>
                                    </v-btn>
                                </v-btn-toggle>
                            </v-flex>
                        </v-layout>
                        <v-layout wrap align-center justify-center>
                            <v-flex xs12 sm4 d-flex>
                                <v-combobox :items="filterItems" label="Filter By" v-model="filterItem" prepend-icon="filter_list"></v-combobox>
                            </v-flex>
                        </v-layout>
                    </v-card>
                    <v-data-iterator 
                        content-tag="v-layout" 
                        column 
                        loading
                        :items="items"
                        :rows-per-page-items="rowsPerPageItems"
                        :pagination.sync="pagination"  
                        :search="search"
                    >
                        <v-list two-line slot="item" slot-scope="props" class="pa-0 ma-0">
                            <v-list-tile @click="" class="pa-0 ma-0">
                                <v-list-tile-action class="pa-0 ma-0">
                                    <v-checkbox v-model="props.item.completed" @change="completeItem(props.item)"></v-checkbox>
                                </v-list-tile-action>
                                <v-list-tile-action class="pa-0 ma-0">
                                    <v-avatar :tile="false" :size="36" v-if="props.item.completed" color="teal lighten-5 teal--text text--lighten-4">
                                        {{ initial(props.item.assigned_to) }}
                                    </v-avatar>
                                    <v-avatar :tile="false" :size="36" v-else :color="avatarColor(props.item.due)">
                                        {{ initial(props.item.assigned_to) }}
                                    </v-avatar>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title :class="completedText(props.item.completed)">{{ props.item.project_name }}</v-list-tile-title>
                                    <v-list-tile-sub-title :class="[completedText(props.item.completed),'tooLong']">{{ props.item.description }}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-list-tile-action-text>{{ props.item.due }}</v-list-tile-action-text>
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-btn icon class="mx-0" @click="editItem(props.item)">
                                                <v-icon color="teal">edit</v-icon>
                                            </v-btn>
                                            <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                                                <v-icon color="pink">delete</v-icon>
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-divider class="pa-0 ma-0"></v-divider>
                        </v-list>
                    </v-data-iterator>
                
<!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
<!-- DIALOG  -->
<!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
            <v-dialog v-model="dialog" max-width="500px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12>
                                        <v-combobox label="Project Name" :items="projectsList" v-model="editedItem.project_name" prepend-icon="folder"></v-combobox>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field label="Description" v-model="editedItem.description" prepend-icon="description"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-combobox label="Assigned To" :items="usersList" v-model="editedItem.assigned_to" prepend-icon="person"></v-combobox>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-dialog ref="dialog" persistent v-model="modal" lazy full-width width="290px" :return-value.sync="editedItem.due">
                                            <v-text-field slot="activator" label="Due Date" v-model="editedItem.due" prepend-icon="event" readonly></v-text-field>
                                            <v-date-picker v-model="editedItem.due" scrollable>
                                                <v-spacer></v-spacer>
                                                <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                                                <v-btn flat color="primary" @click="$refs.dialog.save(editedItem.due)">OK</v-btn>
                                            </v-date-picker>
                                        </v-dialog>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
                        </v-card-actions>
                    </v-card>
            </v-dialog>

        </template>   
    </app-layout>
</template>

<script>
import AppLayout from './ui/AppLayout.vue'
import * as moment from 'moment'
import swal from 'sweetalert2'
import * as Push from 'push.js'

import { mapGetters, mapActions } from 'vuex'

export default{
        name:'task',
        components:{
            AppLayout
        },
        data(){
            return{
                search: '',
                dialog: false,
                rowsPerPageItems: [5, 10, 15],
                pagination: {
                  rowsPerPage: 10
                },
                editedIndex: '',
                editedItem: {
                    project_name: '',
                    description: '',
                    assigned_to:'',
                    due:'',
                    completed:false
                },
                defaultItem: {
                    project_name: '',
                    description: '',
                    assigned_to:'',
                    due:'',
                    completed:false
                },
                editedTaskItem : {},
                taskStatus : 'pending',
                date: null,
                menu: false,
                modal: false,
                taskCount : '',
                filterItems: ['Project Name', 'Due Date', 'Assigned To'],
                filterItem : 'Due Date'
            }
        },//DATA
        created () {
        },//CREATED
        mounted(){
            this.$store.commit('GET_TASKS');
        },//MOUNTED
        updated(){
            this.$store.commit('GET_TASKS');
        },
        computed:{
            ...mapGetters([
                        'userEmail','userRole','projects','users','userName',
                        'usersNameList','projectsNameList','backlogs',
                        'tasks','tasksCompleted','tasksCompletedCount','tasksPending','tasksPendingCount','tasksUser','tasksUserCount']),
            formTitle () {
                return this.editedIndex === '' ? 'NEW TASK' : 'EDIT TASK'
            },
            projectsList(){
                return this.projectsNameList
            },
            usersList(){
                return this.usersNameList
            },
            items(){
                //return this.tasks
                switch(this.taskStatus) {
                    case 'user':{
                        this.taskCount = this.tasksUserCount
                        return this.filteredList(this.tasksUser)
                        }
                        break;
                    case 'pending':{
                        //console.log(this.tasksPending)
                        this.taskCount = this.tasksPendingCount
                        return this.filteredList(this.tasksPending)
                        }
                        break;
                    case 'completed':{
                        this.taskCount = this.tasksCompletedCount
                        return this.filteredList(this.tasksCompleted)
                         }
                        break;
                    default:{
                        this.taskCount = this.tasksPendingCount
                        return this.filteredList(this.tasks)
                        }
                }
            },
        },//COMPUTED
        watch: {
            dialog (val) {
                val || this.close()
            }
        },//WATCH
        methods:{
            ...mapActions(['addTask','updateTask','toggleTask','deleteTask']),
            filteredList(items){
                switch(this.filterItem) {
                    case 'Project Name':
                        return _.orderBy(items,['project_name'],['asc'])
                        break;
                    case 'Due Date':
                        return _.orderBy(items,['due'],['asc'])
                        break;
                    case 'Assigned To':
                        return _.orderBy(items,['assigned_to'],['asc'])
                        break;
                }
            },
            strToDate(due){
                return moment(due).format('DD-MM-YYYY')
            },
            initial(email){
                let name = (_.find(this.users,['email', email])).name
                return _.toUpper(name.split(' ').map( item=> {return item[0]}).join(''))
            },
            completedText(value){
                if(value){
                    return "teal--text text--lighten-4 isCompleted"
                }
            },
            avatarColor(due){
                if( moment(due) > moment().add(14, 'days')){
                    return 'blue-grey lighten-4'
                }
                if(moment(due) >= moment().add(7, 'days')){
                    return 'yellow'
                }
                if(moment(due) > moment()){
                    return 'blue'
                }
                if(moment().isSame(moment(due),'day')){
                    return 'red'
                }
                if(moment(due) < moment().subtract(1, 'days')){
                    return 'black white--text'
                }
            },
            //EDIT
            editItem (item) {
                this.editedItem = Object.assign({}, item)
                this.dialog = true
                this.editedIndex = item.description
                this.editedTaskItem = {
                    edited_project_name : item.project_name,
                    edited_description : item.description,
                    edited_assigned_to : item.assigned_to
                }
            },
            //DELETE
            deleteItem (item) {
                swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                })
                .then((result) => {
                    if (result.value) {
                        swal(
                        'Deleted!',
                        'Task has been deleted.',
                        'success'
                        )
                        this.deleteTask(item)
                    }
                })
            },
            //CLOSE
            close () {
                this.dialog = false
                setTimeout(() => {
                  this.editedItem = Object.assign({}, this.defaultItem)
                  this.editedIndex = ''
                }, 300)
            },
            //SAVE
            save () {
                if (this.editedIndex != '') {
                    let data = _.merge(this.editedItem,this.editedTaskItem)
                    this.updateTask(data)
                    this.editedIndex = ''
                }
                else {
                    this.addTask(this.editedItem)
                    Push.create("New Task", {
                        body: "You have been assigned " + this.editedItem.description,
                        //icon: '/icon.png',
                        timeout: 8000,
                        onClick: function () {
                            window.focus();
                            this.close();
                        }
                    });

                }
                this.close()
            },
            //COMPLETE
            completeItem(item){
                this.toggleTask(item)
            }

        }//METHODS
    }

</script>

<style scoped>


@media (max-width: 600px) {
    .tooLong {
        white-space: nowrap; 
        width: 150px; 
        overflow: hidden;
        text-overflow: ellipsis; 
    }
}

.isCompleted{
    text-decoration: line-through;
}


</style>