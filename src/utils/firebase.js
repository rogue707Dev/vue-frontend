import { loadScript } from './common'
const sdk = 'https://www.gstatic.com/firebasejs/6.4.0/firebase.js'
let isInit = false
export const initFirebase = async(callback = null) => {
  // console.log(`process.env.VIP_APP_firebase_apiKey=${process.env.VUE_APP_FIREBASE_apiKey}`)
  if (process.env.VUE_APP_FIREBASE_apiKey && process.env.VUE_APP_FIREBASE_apiKey !== '') {
    if (isInit) {
      return window.firebase.database()
    } else {
      await loadScript(sdk)
      runInit()
      return window.firebase.database()
    }
  } else {
    return null
  }
}
export const getDb = () => {
  try {
    return window.firebase.database()
  } catch (e) {
    return null
  }
}
const runInit = () => {
  const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_apiKey,
    authDomain: process.env.VUE_APP_FIREBASE_authDomain,
    databaseURL: process.env.VUE_APP_FIREBASE_databaseURL,
    projectId: process.env.VUE_APP_FIREBASE_projectId,
    storageBucket: process.env.VUE_APP_FIREBASE_storageBucket,
    messagingSenderId: process.env.VUE_APP_FIREBASE_messagingSenderId,
    appId: process.env.VUE_APP_FIREBASE_appId
  }
  // Initialize Firebase
  window.firebase.initializeApp(firebaseConfig)
  isInit = true
}
