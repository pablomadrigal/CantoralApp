import { Provider } from "react-redux";
import LetterSizeMenu from "../components/menus/LetterSizeMenu";
import store from "../store/store";

export default {
  title: "Components/NavBar/Menus/LetterSizeMenu",
  component: LetterSizeMenu,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {},
};

function Template() {
  return (
    <Provider store={store}>
      <LetterSizeMenu />
    </Provider>
  );
}

export const BasicUsage = Template.bind({});
