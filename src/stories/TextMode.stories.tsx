/* eslint-disable @typescript-eslint/no-explicit-any */
import { Provider } from "react-redux";
import store from "../store/store";
import { Button } from "@mui/material";
import { useDispatch } from "../hooks/useRedux";
import TextMode from "../components/modes/textMode/TextMode";
import { setSelectedSong } from "../store/slices/selectedSongSlice";
import { songDemoData } from "./demoData";

export default {
  title: "Components/TextMode",
  component: TextMode,
  tags: ["autodocs"],
  argTypes: {},
  decorators: [
    (Story: any) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
  excludeStories: /.*MockedState$/,
};

function Template() {
  const dispatch = useDispatch();

  const handleLoadData = () => {
    dispatch(setSelectedSong(songDemoData));
  };

  return (
    <div>
      <Button onClick={handleLoadData}>load data</Button>
      <TextMode />
    </div>
  );
}

export const Default = Template.bind({});
