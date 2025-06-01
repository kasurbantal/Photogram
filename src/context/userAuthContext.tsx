// Import konfigurasi Firebase Auth yang telah dibuat
import { auth } from "@/assets/firebaseConfig";

// Import fungsi-fungsi autentikasi dari Firebase
import {
  createUserWithEmailAndPassword, // untuk sign up dengan email & password
  GoogleAuthProvider, // untuk Google sign in
  onAuthStateChanged, // listener perubahan status login
  signInWithEmailAndPassword, // untuk login dengan email & password
  signInWithPopup, // untuk login dengan popup (mis. Google)
  signOut, // untuk logout
  type User, // tipe data user dari Firebase
} from "firebase/auth";

// Import hook dan context dari React
import { createContext, useContext, useEffect, useState } from "react";

// Tipe untuk props komponen provider (children adalah elemen yang dibungkus)
interface IUserAuthProviderProps {
  children: React.ReactNode;
}

// Tipe data context yang akan digunakan di seluruh aplikasi
type AuthContextData = {
  user: User | null; // user yang sedang login (jika ada)
  logIn: typeof logIn; // fungsi login
  signUp: typeof signUp; // fungsi sign up
  logOut: typeof logOut; // fungsi logout
  googleSignIn: typeof googleSignIn; // fungsi login via Google
};

// Fungsi login dengan email & password
const logIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Fungsi sign up (daftar akun) dengan email & password
const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Fungsi logout dari akun yang sedang login
const logOut = () => {
  return signOut(auth);
};

// Fungsi login dengan akun Google menggunakan popup
const googleSignIn = () => {
  const googleAuthProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleAuthProvider);
};

// Membuat context user dengan nilai default
export const userAuthContext = createContext<AuthContextData>({
  user: null, // user awalnya null
  logIn, // fungsi login
  signUp, // fungsi sign up
  logOut, // fungsi logout
  googleSignIn, // fungsi login via Google
});

// Komponen provider untuk menyimpan dan membagikan data user dan auth
export const UserAuthProvider: React.FunctionComponent<
  IUserAuthProviderProps
> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // state user

  useEffect(() => {
    // Pasang listener untuk mengecek status login user
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("The logged in user state is: ", user); // debug
        setUser(user); // set user jika sedang login
      } else {
        setUser(null); // set null jika logout
      }
    });

    // Unsubscribe saat komponen dilepas (clean up)
    return () => unsubscribe();
  }, []);

  // Nilai yang akan disediakan oleh context ke seluruh aplikasi
  const value: AuthContextData = {
    user,
    logIn,
    signUp,
    logOut,
    googleSignIn,
  };

  // Bungkus seluruh children dengan provider agar bisa akses auth context
  return (
    <userAuthContext.Provider value={value}>
      {children}
    </userAuthContext.Provider>
  );
};

// Hook custom untuk memudahkan akses context di komponen lain
export const useUserAuth = () => {
  return useContext(userAuthContext);
};
