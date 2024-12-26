export interface User {
  id: number;
  email: string;
  role: "restaurant_owner" | "client" | "admin";
}

export interface Restaurants {
  id: number;
  name: string;
  address: string;
  cuisine: string;
  user_id: number;
  picture: string[];
  isActive: boolean;
  description: string;
  phone: string;
}

export interface NewRestaurant {
  name: string;
  address: string;
  cuisine: string;
  user_id: number;
  picture: string[];
  isActive: boolean;
  description: string;
  phone: string;
}

export interface Menu {
  id: number;
  name: string;
  restaurantId: number;
  picture: string[];
}

export interface Dish {
  id: number;
  name: string;
  menuId: number;
  description: string;
  picture: string[];
  price: number;
}

export interface Order {
  id: number;
  clientId: number;
  restaurantId: number;
  dishId: number;
  quantity: number;
  status: "pending" | "in-progress" | "completed" | "canceled";
}
