<template>
    <app-layout>
        <template slot="app-content">
                <v-toolbar color="teal darken-1" dark flat>
                    <v-toolbar-title>COMMENTS</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-text-field append-icon="search" label="Search" single-line hide-details clearable v-model="search" color="white" class="mb-1 pb-0"></v-text-field>
                </v-toolbar>
                    <v-card flat>
                        <v-btn fab small color="light-green darken-1" top left absolute @click.native.stop="dialog = !dialog">
                            <v-icon color="white">announcement</v-icon>
                        </v-btn>
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
                                    <v-avatar :tile="false" :size="36" color="green lighten-3">
                                        {{ initial(props.item.author) }}
                                    </v-avatar>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ props.item.project_name }} {{ props.item.project_number }}</v-list-tile-title>
                                    <v-list-tile-sub-title :class="['tooLong']">{{ props.item.description }}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-list-tile-action-text>{{ props.item.date }}</v-list-tile-action-text>
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
                                        <v-combobox label="Project Name" :items="projectsList" v-model="editedItem.project_name" prepend-icon="folder" @change="setAuthorAndNumber" clearable></v-combobox>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field label="Comment" v-model="editedItem.description" prepend-icon="description"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-dialog ref="dialog" persistent v-model="modal" lazy full-width width="290px" :return-value.sync="editedItem.date">
                                            <v-text-field slot="activator" label="Date" v-model="editedItem.date" prepend-icon="event" readonly></v-text-field>
                                            <v-date-picker v-model="editedItem.date" scrollable>
                                                <v-spacer></v-spacer>
                                                <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                                                <v-btn flat color="primary" @click="$refs.dialog.save(editedItem.date)">OK</v-btn>
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
import Backlog from './classes/backlog'

import { mapGetters, mapActions } from 'vuex'

export default{
        name:'comment',
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
                    project_number: '',
                    project_name: '',
                    description: '',
                    author:'',
                    date:'',
                },
                defaultItem: {
                    project_number: '',
                    project_name: '',
                    description: '',
                    author:'',
                    date:'',
                },
                editedCommentItem : {},
                date: null,
                menu: false,
                modal: false,
                //taskCount : '',
                filterItems: ['Project Name', 'Date', 'Author'],
                filterItem : 'Date',
            }
        },//DATA
        created () {
        },//CREATED
        mounted(){
            this.$store.commit('GET_COMMENTS');
        },//MOUNTED
        updated(){
            this.$store.commit('GET_COMMENTS');
        },
        computed:{
            ...mapGetters([
                        'userEmail','userRole','projects','users','userName',
                        'projectsNameList','backlogs',
                        'comments']),
            formTitle () {
                return this.editedIndex === '' ? 'NEW COMMENT' : 'EDIT COMMENT'
            },
            projectsList(){
                let B = new Backlog(this.backlogs)
                return B.projectNamesList()
            },
            items(){
                return this.comments
            },
            
        },//COMPUTED
        watch: {
            dialog (val) {
                val || this.close()
            }
        },//WATCH
        methods:{
            ...mapActions(['addComment','updateComment','deleteComment']),
            filteredList(items){
                switch(this.filterItem) {
                    case 'Project Name':
                        return _.orderBy(items,['project_name'],['asc'])
                        break;
                    case 'Date':
                        return _.orderBy(items,['date'],['asc'])
                        break;
                    case 'Author':
                        return _.orderBy(items,['author'],['asc'])
                        break;
                }
            },
            strToDate(date){
                return moment(date).format('DD-MM-YYYY')
            },
            initial(email){
                let name = (_.find(this.users,['email', email])).name
                return _.toUpper(name.split(' ').map( item=> {return item[0]}).join(''))
            },
            setAuthorAndNumber(){
                let B = new Backlog(this.backlogs)
                this.editedItem.author = this.userEmail
                this.editedItem.project_number =  B.projectNumber(this.editedItem.project_name)
            },
            //EDIT
            editItem (item) {
                this.editedItem = Object.assign({}, item)
                this.dialog = true
                
                this.editedIndex = item.description
                this.editedCommentItem = {
                    edited_project_number : item.project_number,
                    edited_project_name : item.project_name,
                    edited_description : item.description,
                    edited_author : item.author
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
                        'Comment has been deleted.',
                        'success'
                        )
                        this.deleteComment(item)
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
                    let data = _.merge(this.editedItem,this.editedCommentItem)
                    this.updateComment(data)
                    this.editedIndex = ''
                }
                else {
                    //console.log(this.editedItem)
                    this.addComment(this.editedItem)
                }
                this.close()
            },
            //COMPLETE

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