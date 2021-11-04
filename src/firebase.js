import firebase from 'firebase/app'
import 'firebase/database'

export const db = firebase
    .initializeApp({databaseURL: 'https://guidedvuefire9774.firebaseio.com'})
    .database()

export const dessRef = db.ref('desserts')
export const drinkRef = db.ref('drinks')