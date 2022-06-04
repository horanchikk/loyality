import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDj8fteo9_1BUeUhS_TDWKOR94OG3KTQn0",
  authDomain: "hackathonvk.firebaseapp.com",
  projectId: "hackathonvk",
  storageBucket: "hackathonvk.appspot.com",
  messagingSenderId: "814621936489",
  appId: "1:814621936489:web:9300fd1a1ee8c7a558cbf8",
  measurementId: "G-WD0QC5X1YK",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default {
  async regUser(phone, password) {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      let isRegistered;
      querySnapshot.forEach((doc) => {
        if (doc.data().phone == phone) {
          isRegistered == true;
        }
      });
      if (isRegistered == undefined) {
        const docRef = await addDoc(collection(db, "users"), {
          phone: phone,
          password: password,
          balance: 0,
          userType: "user",
        });
        return `${docRef.id}`;
      } else {
        return `Этот пользователь уже зарегистрирован. `;
      }
    } catch (e) {
      return `Ошибка сервера: ${e}`;
    }
  },
  async logUser(phone, password) {
    const querySnapshot = await getDocs(collection(db, "users"));
    let info;
    querySnapshot.forEach((doc) => {
      if (doc.data().phone == phone && doc.data().password == password) {
        console.info(
          `Logged in ${doc.data().id}. Balance ${doc.data().balance}`
        );
        info = {
          bal: doc.data().balance,
          id: doc.id,
          userType: doc.data().userType,
        };
        console.log(info);
      }
    });
    if (info != undefined) {
      return info;
    } else {
      return "incorrect user or login";
    }
  },
};
