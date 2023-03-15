import { initializeApp} from 'firebase/app'
import{
    getFirestore,collection,onSnapshot,
    addDoc
}from 'firebase/firestore'
 import{
    getAuth,
    createUserWithEmailAndPassword
 }from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyDMFv6L5defmNMGJbCkqNjGRAVREkw89vU",
    authDomain: "community-18c33.firebaseapp.com",
    projectId: "community-18c33",
    storageBucket: "community-18c33.appspot.com",
    messagingSenderId: "127032409883",
    appId: "1:127032409883:web:30881de82d956908fe1dbe"
  };

  initializeApp(firebaseConfig)

  //init services
  const db =getFirestore()
  const auth=getAuth()

  const colRef=collection(db,'Questions')

 onSnapshot(colRef, (snapshot) => {
    let Questions = []
    snapshot.docs.forEach(doc => {
      Questions.push({ ...doc.data(), id: doc.id })
    })
    console.log(Questions)
  })
// adding docs
 const addQuesForm = document.querySelector('.ask')
  addQuesForm.addEventListener('submit', (e) => {
    e.preventDefault()
  
    addDoc(colRef, {
      title: addQuesForm.title.value,
      category: addQuesForm.category.value,
      description: addQuesForm.Help.value
    })
    .then(() => {
      addQuesForm.reset()
    })
  }) 
  const signupForm = document.querySelector('.acc')
  signupForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const email=signupForm.email.value
    const password=signupForm.password.value
    createUserWithEmailAndPassword(auth,email,password)
    .then((cred)=>{
        console.log('user created:', cred.user)
        signupForm.reset()
    })
    .catch((err)=>{
        console.log(err.message)
    })
  })
