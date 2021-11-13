import firebase from 'firebase/app'
import 'firebase/database'

export const db = firebase
    .initializeApp({databaseURL: 'https://guidedvuefire0181-default-rtdb.asia-southeast1.firebasedatabase.app/'})
    .database()

export const drinkRef = db.ref('drinks')







