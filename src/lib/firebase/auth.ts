import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  Auth,
} from "firebase/auth";
import { auth } from "./config.ts";
import { FirebaseError } from "firebase/app";

interface AuthResult {
  success: boolean;
  user?: {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  };
  error?: string;
}

//Helper para establecer cookies con tiempos de expiracion

function setCookie(name: string, value: string, hours: number) {
  const date = new Date();
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; path=/; expires=${date.toUTCString()}`;
}

export async function createUser(
  email: string,
  password: string
): Promise<AuthResult> {
  try {
    await setPersistence(auth, browserLocalPersistence); // Persistencia local

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const token = await user.getIdToken();

    // Guardar el token en el almacenamiento local
    setCookie("__session", token, 48);
    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
    };
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error("FirebaseError:", error.code, error.message);
      return { success: false, error: error.message };
    } else {
      console.error("Unexpected error:", error);
      return { success: false, error: "An unexpected error occurred." };
    }
  }
}

export async function signInWithEmailAndPasswordA(
  auth: Auth,
  email: string,
  password: string
): Promise<AuthResult> {
  try {
    await setPersistence(auth, browserLocalPersistence); // Persistencia local

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const token = await user.getIdToken();

    // Guardar el token en el almacenamiento local
    setCookie("__session", token, 48);
    console.log(user);

    return { success: true };
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.error("FirebaseError:", error.code, error.message);
      return { success: false, error: error.message };
    } else {
      console.error("Unexpected error:", error);
      return { success: false, error: "An unexpected error occurred." };
    }
  }
}

export async function signInWithGoogle(): Promise<AuthResult> {
  try {
    const provider = new GoogleAuthProvider();
    await setPersistence(auth, browserLocalPersistence); // Persistencia local

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const token = await user.getIdToken();

    // Guardar el token en el almacenamiento local
    setCookie("__session", token, 48);

    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
    };
  } catch (error) {
    if (error instanceof FirebaseError) {
      // Si es un error específico de Firebase
      console.error("FirebaseError:", error.code, error.message);
      return { success: false, error: error.message };
    } else {
      // Otros errores
      console.error("Unexpected error:", error);
      return { success: false, error: "An unexpected error occurred." };
    }
  }
}

export async function signOutUser(): Promise<AuthResult> {
  try {
    await signOut(auth);
    setCookie("__session", "", -1); // Configurar expiración en el pasado

    return { success: true };
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error("FirebaseError:", error.code, error.message);
      return { success: false, error: error.message };
    } else {
      console.error("Unexpected error:", error);
      return { success: false, error: "An unexpected error occurred." };
    }
  }
}
