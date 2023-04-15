/* eslint-disable @typescript-eslint/no-explicit-any */
import { Provider } from "react-redux";
import AutocompleteSong, {
  autoCompleteSongProps,
} from "../components/formInputs/AutocompleteSong";
import store from "../store/store";
import { Button } from "@mui/material";
import { useDispatch } from "../hooks/useRedux";
import { setSearchText } from "../store/slices/generalConfigSlice";
import { autocompleteSongDemoData } from "./demoData";

export default {
  title: "Components/AutocompleteSong",
  component: AutocompleteSong,
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

function Template(args: autoCompleteSongProps) {
  const dispatch = useDispatch();
  return (
    <div>
      <Button onClick={() => dispatch(setSearchText(autocompleteSongDemoData))}>
        load data
      </Button>
      <AutocompleteSong {...args} />
    </div>
  );
}

export const Default = Template.bind({});
