import { Provider } from "react-redux";
import store from "../store/store";
import ChordsControl, {
  ChordsControlProps,
} from "../components/chordsControl/ChordsControl";

export default {
  title: "Components/ChordsControl",
  component: ChordsControl,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    capo: {
      name: "capo",
      description: "number of capo",
      type: { name: "number" },
      defaultValue: 2,
    },
    tono: {
      name: "tono",
      description: "tono",
      type: { name: "string" },
    },
  },
};

function Template(args: ChordsControlProps) {
  return (
    <Provider store={store}>
      <ChordsControl {...args} />
    </Provider>
  );
}

export const BasicUsage = Template.bind({
  capo: 2,
});
