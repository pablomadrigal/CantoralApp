/* eslint-disable @typescript-eslint/no-explicit-any */
import { Provider } from "react-redux";
import store from "../store/store";
import { Button } from "@mui/material";
import { useDispatch } from "../hooks/useRedux";
import { setSelectedSong } from "../store/slices/selectedSongSlice";
import { songDemoData } from "./demoData";
import PresentationMode from "../components/modes/presentationMode/PresentationMode";

export default {
  title: "Components/PresentationMode",
  component: PresentationMode,
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
      <PresentationMode />
    </div>
  );
}

export const Default = Template.bind({});
