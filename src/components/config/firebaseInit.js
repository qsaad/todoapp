import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'
const firebaseApp = firebase.initializeApp(firebaseConfig)

const firestore = firebase.firestore();

// DISABLE DEPRECATED FEATURES
//firestore.settings({timestampsInSnapshots: true})

//ENABLE MULTI TAB OFFLINE DATA PERSISTENCE
  firestore.enablePersistence({experimentalTabSynchronization:true})
    .then(() => {
       console.log("Woohoo! Multi-Tab Persistence!")
    })
    .catch(function(err) {
      if (err.code == 'failed-precondition') {
          console.log('Multi Tabs Open - Data Persistence in one Tab only')
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } 
      else if (err.code == 'unimplemented') {
        console.log('Current browser does not support data persistence features')
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
    })

// OLD WAY
//const date = snapshot.get('created_at');
// NEW WAY
//const timestamp = snapshot.get('created_at');
//const date = timestamp.toDate();

export default firebaseApp.firestore()

export const storage = firebaseApp.storage()