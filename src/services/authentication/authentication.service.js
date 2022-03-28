import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
	getAuth
} from 'firebase/auth'

export const loginRequest = (auth, email, password) =>
  signInWithEmailAndPassword(auth, email, password)

export const registerRequest = (auth, email, password) =>
  createUserWithEmailAndPassword(auth, email, password)

export const logoutRequest = () => getAuth().signOut()
