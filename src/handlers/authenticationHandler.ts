import { useNavigate } from "react-router-dom";
import {
  signInWithGoogle,
  signInWithEmailAndPasswordA,
  createUser,
} from "@/lib/firebase/auth";
import { BACKEND_URL } from "@/constants/generalConstants";

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
    console.log(error);
  } finally {
    setIsLoading(false);
  }
}

export async function handleGoogleSignIn(
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: ReturnType<typeof useNavigate>
) {
  setIsLoading(true);
  try {
    const result = await signInWithGoogle();
    if (result.success) {
      navigate("/dashboard");
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
}

export async function createUserInBackend(email: string, role: string) {
  try {
    const response = await fetch(`${BACKEND_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, role }),
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

export async function handleLogInSubmit(
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
    await createUserInBackend(email, "restaurant_owner");
    navigate("/login");
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
}
