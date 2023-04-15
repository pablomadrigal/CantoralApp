/* eslint-disable @typescript-eslint/no-explicit-any */
import { Provider } from "react-redux";
import store from "../store/store";
import AutocompleteSongBook, {
  autoCompleteSongBookProps,
} from "../components/formInputs/AutocompleteSongBook";

export default {
  title: "Components/AutocompleteSongBook",
  component: AutocompleteSongBook,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    onSelectedSong: {
      name: "onSelectedSong",
      description: "function call on selection of a song",
      type: { name: "function", required: true },
      defaultValue: (x: string) => window.console.log(x),
      control: "none",
    },
  },
  decorators: [
    (Story: any) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
  excludeStories: /.*MockedState$/,
};

function Template(args: autoCompleteSongBookProps) {
  return <AutocompleteSongBook {...args} />;
}

export const Default = Template.bind({});
