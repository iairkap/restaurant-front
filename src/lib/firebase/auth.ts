import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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

export async function createUser(
  email: string,
  password: string
): Promise<AuthResult> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
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
  email: string,
  password: string
): Promise<AuthResult> {
  try {
    // Llamada a Firebase Authentication para iniciar sesión
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    console.log("User signed in:", user);
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
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

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
