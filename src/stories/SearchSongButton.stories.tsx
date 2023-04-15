/* eslint-disable @typescript-eslint/no-explicit-any */
import { Provider } from "react-redux";
import store from "../store/store";
import SearchSongButton from "../components/navbar/SearchSongButton";
import { useDispatch } from "../hooks/useRedux";
import { Button } from "@mui/material";
import { setSearchText } from "../store/slices/generalConfigSlice";
import { autocompleteSongDemoData } from "./demoData";

export default {
  title: "Components/NavBar/SearchSongButton",
  component: SearchSongButton,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {},
  decorators: [
    (Story: any) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

function Template() {
  const dispatch = useDispatch();
  return (
    <div>
      <Button onClick={() => dispatch(setSearchText(autocompleteSongDemoData))}>
        load data
      </Button>
      <SearchSongButton />
    </div>
  );
}

export const BasicUsage = Template.bind({});
