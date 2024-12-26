import { BACKEND_URL } from "@/constants/generalConstants";

export const fetchUserInformation = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/users`);
    if (!response.ok) {
      throw new Error("Failed to fetch user information");
    }
    return await response.json();
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

export const fetchUserByEmail = async (email: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/users/email/${email}`, {
      method: "GET",
      credentials: "include", // Asegúrate de que las cookies se envíen con la solicitud
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user information");
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
