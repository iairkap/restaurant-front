type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

interface State {
  userName: string;
  restaurantInfo: {
    name: string;
    description: string;
    cuisine_type: string;
  };
}

interface InputField {
  name: string;
  id: string;
  value: string;
  onChange: (e: InputChangeEvent) => void;
  required: boolean;
  type: string;
}

export const inputFieldsBasicInfo = (
  state: State,
  updateUserName: (value: string) => void,
  updateRestaurantInfo: (info: Partial<State["restaurantInfo"]>) => void
): InputField[] => [
  {
    name: "User Name",
    id: "user_name",
    value: state.userName,
    onChange: (e: InputChangeEvent) => updateUserName(e.target.value),
    required: true,
    type: "input",
  },
  {
    name: "Restaurant Name",
    id: "name",
    value: state.restaurantInfo.name,
    onChange: (e: InputChangeEvent) =>
      updateRestaurantInfo({ name: e.target.value }),
    required: true,
    type: "input",
  },
  {
    name: "Description",
    id: "description",
    value: state.restaurantInfo.description,
    onChange: (e: InputChangeEvent) =>
      updateRestaurantInfo({ description: e.target.value }),
    required: true,
    type: "textarea",
  },
  {
    name: "Cuisine Type",
    id: "cuisine",
    value: state.restaurantInfo.cuisine_type,
    onChange: (e: InputChangeEvent) =>
      updateRestaurantInfo({ cuisine_type: e.target.value }),
    required: true,
    type: "input",
  },
];
