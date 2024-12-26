import { DollarSign, Eye, ShoppingBag, Utensils } from "lucide-react";

export const BACKEND_URL = "http://localhost:3000";

export const stats = [
  {
    name: "Total Orders",
    value: "405",
    change: "+4.75%",
    changeType: "positive",
    icon: ShoppingBag,
  },
  {
    name: "Page Views",
    value: "12,789",
    change: "+21.2%",
    changeType: "positive",
    icon: Eye,
  },
  {
    name: "Menu Items",
    value: "48",
    change: "+2 items",
    changeType: "positive",
    icon: Utensils,
  },
  {
    name: "Revenue",
    value: "$23,456",
    change: "-2.3%",
    changeType: "negative",
    icon: DollarSign,
  },
];

export const recentUpdates = [
  {
    id: 1,
    title: "New Menu Item Added",
    description: "Added 'Spicy Tuna Roll' to Sushi section",
    timestamp: "2 hours ago",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    title: "Gallery Updated",
    description: 'Added 3 new photos to "Restaurant Interior"',
    timestamp: "5 hours ago",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    title: "Special Offer Created",
    description: "Added '20% Off Weekday Lunch' promotion",
    timestamp: "1 day ago",
    image: "/placeholder.svg?height=100&width=100",
  },
];
