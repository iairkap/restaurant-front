import { BACKEND_URL } from "@/constants/generalConstants";
import useAuthStore from "@/store/useAuthStore";

export const fetchUserInformation = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/users`);
    if (!response.ok) {
      throw new Error("Failed to fetch user information");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user information:", error);
  }
};

export const fetchUserById = async (userId: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/users/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user information");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user information:", error);
  }
};

export const fetchUserByEmail = async (email: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/users/email/${email}`, {
      method: "GET",
      credentials: "include", // Ensure cookies are sent with the request
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user information");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user information:", error);
  }
};

export const updateUserName = async (name: string) => {
  const { user } = useAuthStore.getState();
  const uid = user?.uid;

  if (!uid) {
    console.error("User ID is not available.");
    throw new Error("User ID is required to update name.");
  }

  try {
    const response = await fetch(`${BACKEND_URL}/users/${uid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error("Failed to update user name");
    }

    // Verificar si la respuesta tiene contenido JSON
    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    // Si no hay contenido JSON, devolver un mensaje de éxito genérico
    return { message: "User name updated successfully" };
  } catch (error) {
    console.error("Error updating user name:", error);
    throw error;
  }
};
