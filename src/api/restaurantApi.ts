import { BACKEND_URL } from "@/constants/generalConstants";
import type { NewRestaurant } from "@/types/types";

export const postRestaurant = async (restaurant: NewRestaurant) => {
  try {
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
    return await response.json();
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return null;
  }
};
