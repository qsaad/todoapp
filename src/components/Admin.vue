<template>
    <app-layout>
        <template slot="app-content">
            <v-toolbar color="teal darken-1" dark >
                <v-toolbar-title>ADMIN</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card flat v-if="userRole == 'Admin'">
                  <v-spacer></v-spacer>
                    <!-- ADD BUTTON -->
                    <v-layout row>
                        <v-flex class="pl-3">
                            <v-text-field label="Select Backlog File" @click='pickFile' v-model='fileName' prepend-icon='attach_file'></v-text-field>
                            <input type="file" style="display: none" ref="fileButton" accept="*.xlsx | *.xls" @change="selectFile">
                            Last Backlog Date : {{ lastBacklogDate }}
                        </v-flex>
                        <v-flex>
                            <v-btn fab small dark color="indigo" @click="processFile()" v-if="selectedFile != '' && isFileProcessed == false">
                                <v-icon dark>cloud</v-icon>
                            </v-btn>
                        </v-flex>
                        <v-flex>
                            <v-btn fab small dark color="indigo" v-if="fileName !==''" @click="addBacklogData()">
                                <v-icon dark>add</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                    <!-- DELETE BUTTON -->
                    <v-layout row v-if="backlogs.length > 0">
                        <v-flex>
                            <v-combobox :items="dateList" label="Dates" v-model="selectedDate" prepend-icon="calendar"></v-combobox>
                        </v-flex>
                        <v-flex>
                            <v-btn fab small dark color="indigo" @click="deleteBacklogData()">
                                <v-icon dark>delete</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                    <!-- PROGRESS BAR -->
                    <v-layout row v-if="showProgessBar">
                        <v-flex>
                            <v-progress-circular
                                :rotate="-90"
                                :size="100"
                                :width="15"
                                :value="uploadProgress"
                                color="primary"
                                >
                                {{ uploadProgress }} %
                            </v-progress-circular>
                        </v-flex>
                        <v-flex>
                            <v-avatar color="red">
                                <span class="white--text headline">{{ filesUploaded }}</span>
                            </v-avatar>
                            <span>Records</span>
                        </v-flex>
                    </v-layout>
            </v-card>
            <v-card flat v-else>
                <v-layout row justify-center>
                    <v-flex class="title">
                        This panel is from ADMIN users only
                    </v-flex>
                </v-layout>
            </v-card>
        </template>
    </app-layout>
</template>

<script>
    import AppLayout from './ui/AppLayout.vue'
    import { mapGetters, mapActions } from 'vuex'
    import FileProcessor from './classes/fileProcessor'
    import Backlog from './classes/backlog'

    let B = new Backlog()

    let FP = new FileProcessor()
    export default{
        name:'admin',
        components:{
            AppLayout
        },//COMPONENTS
        data(){
            return{
                selectedFile:'',
                fileName : '',
                isFileProcessed : false,
                showProgessBar : false,
                //COMBOX
                dateList : [],
                selectedDate : '',
                lastBacklogDate : B.getCurrentBacklogDate()
            }//RETURN
        },//DATA
        created(){
          
        },//CREATED
        mounted(){
            //this.$store.state.progressBarCount = 0
            //this.$store.state.fileUploadCount = 0
            this.dateList = _.keys(_.groupBy(this.backlogs,'date'))
        },//MOUNTED
        computed:{
            ...mapGetters(['backlogs','progressBarCount','fileUploadCount','userEmail','userRole']),
            uploadProgress(){
                return this.progressBarCount
            },
            filesUploaded(){
                return this.fileUploadCount
            },
            // dateList(){
            //     return _.keys(_.groupBy(this.backlogs,'date'))
            // },
        },//COMPUTED
        methods:{
            ...mapActions(['addBacklog','deleteBacklog']),
            selectFile(e) {
               let files = e.target.files || e.dataTransfer.files
                if(files[0] !== undefined){
                    this.selectedFile = files[0] 
                    this.fileName = files[0].name
                }
                else{
                    this.selectedFile = ''
                    this.fileName = ''
                    //this.isFileProcessed = false
                }
            },//SELECT FILE
            pickFile () {
                this.$refs.fileButton.click()
            },//MIMIC INPUT BUTTON CLICK
            processFile(){
                FP.convertXlsToJson( this.selectedFile,this.fileName)
                this.isFileProcessed = true
            },//UPLOAD FILE
            addBacklogData(){
                let backlogData = FP.formatBacklogsDataForFirebase()
                this.$store.state.progressBarCount = 0
                this.$store.state.fileUploadCount = 0
                this.showProgessBar = true
                this.addBacklog(backlogData)
            },//ADD BACKLOG

            deleteBacklogData(){
                let data = {date : this.selectedDate}
                this.$store.state.progressBarCount = 0
                this.$store.state.fileUploadCount = 0
                this.showProgessBar = true
                this.deleteBacklog(data)
            },//DELETE BACKLOG

        }//METHODS
    }//EXPORT DEFAULT

</script>

<style scoped>

</style>