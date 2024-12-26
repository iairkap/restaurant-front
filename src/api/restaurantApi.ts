import { BACKEND_URL } from "@/constants/generalConstants";
import type { NewRestaurant } from "@/types/types";
import { updateUserName } from "./userAPI";

export const postRestaurant = async (
  restaurant: NewRestaurant,
  name: string
) => {
  try {
    // Crear restaurante
    const response = await fetch(`${BACKEND_URL}/restaurants`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(restaurant),
    });

    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }

    // Actualizar nombre de usuario después de crear el restaurante
    const result = await updateUserName(name);
    console.log("User name updated successfully:", result);

    return await response.json();
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return null;
  }
};
