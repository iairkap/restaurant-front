import { useNavigate } from "react-router-dom";
import {
  signInWithGoogle,
  signInWithEmailAndPasswordA,
  createUser,
} from "@/lib/firebase/auth";
import { BACKEND_URL } from "@/constants/generalConstants";
import { Auth } from "firebase/auth"; /* 
export async function onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: ReturnType<typeof useNavigate>
) {
  event.preventDefault();
  setIsLoading(true);

  const formData = new FormData(event.currentTarget);
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const result = await signInWithEmailAndPasswordA(
      email as string,
      password as string
    );
    if (!result.success) {
      throw new Error(result.error);
    }
    navigate("/dashboard");
  } catch (error) {
    console.error("Error signing in:", error);
  } finally {
    setIsLoading(false);
  }
} */
export async function handleGoogleSignIn(
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: ReturnType<typeof useNavigate>
) {
  setIsLoading(true);
  try {
    const result = await signInWithGoogle();
    if (result.success && result.user) {
      // Create user in backend
      await createUserInBackend(
        result.user.uid,
        result.user.email,
        "restaurant_owner"
      );
      navigate("/dashboard");
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error("Error signing in with Google:", error);
  } finally {
    setIsLoading(false);
  }
}

export async function createUserInBackend(
  uid: string,
  email: string,
  role: string
) {
  try {
    const response = await fetch(`${BACKEND_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid, email, role }),
    });

    if (!response.ok) {
      const errorDetails = await response.json(); //
      throw new Error(
        errorDetails.message || "Failed to create user in backend"
      );
    }

    return await response.json();
  } catch (error: unknown) {
    console.error("Error in createUserInBackend:", error);
    if (error instanceof Error) {
      throw new Error(`Backend error: ${error.message}`);
    } else {
      throw new Error("Backend error: unknown error");
    }
  }
}

export async function handleSignUp(
  event: React.FormEvent<HTMLFormElement>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: ReturnType<typeof useNavigate>
) {
  event.preventDefault();
  setIsLoading(true);

  const formData = new FormData(event.currentTarget);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const result = await createUser(email, password);
    if (!result.success) {
      throw new Error(result.error);
    }
    await createUserInBackend(result.user.uid, email, "restaurant_owner");
    navigate("/login");
  } catch (error) {
    console.error("Error signing in:", error);
  } finally {
    setIsLoading(false);
  }
}
export async function handleLogin(
  auth: Auth,
  email: string,
  password: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: ReturnType<typeof useNavigate>
) {
  setIsLoading(true);
  try {
    const result = await signInWithEmailAndPasswordA(auth, email, password);
    if (!result.success) {
      console.log(result.error);
      throw new Error(result.error);
    }
    navigate("/dashboard");
  } catch (error) {
    console.error("Error signing in:", error);
    console.log(error);
  } finally {
    setIsLoading(false);
  }
}
