import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyCinxWWGVo-2Ib-2tetsBmeuNYyuwOTorg",
	authDomain: "chainpost-57543.firebaseapp.com",
	projectId: "chainpost-57543",
	storageBucket: "chainpost-57543.appspot.com",
	messagingSenderId: "544964986596",
	appId: "1:544964986596:web:cd91590164292d82520ef1",
	measurementId: "G-WHEV27S3K2"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)