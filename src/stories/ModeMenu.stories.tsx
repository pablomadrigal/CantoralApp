import { Provider } from "react-redux";
import ModeMenu from "../components/menus/ModeMenu";
import store from "../store/store";

export default {
  title: "Components/NavBar/Menus/ModeMenu",
  component: ModeMenu,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {},
};

function Template() {
  return;
  <Provider store={store}>
    <ModeMenu />
  </Provider>;
}

export const BasicUsage = Template.bind({});
