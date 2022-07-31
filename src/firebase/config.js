import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDiEHPYt6GjulfHaqlr-YkQxZze9dZs9Vw',
  authDomain: 'vue-goals-planner.firebaseapp.com',
  projectId: 'vue-goals-planner',
  storageBucket: 'vue-goals-planner.appspot.com',
  messagingSenderId: '419470214778',
  appId: '1:419470214778:web:b1d449d0de285b48481dc3',
}

initializeApp(firebaseConfig)

const projectFirestore = getFirestore()

export default projectFirestore
