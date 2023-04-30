/* eslint-disable @typescript-eslint/no-explicit-any */
import { Provider } from "react-redux";
import { Button } from "@mui/material";
import NewWindow from "react-new-window";
import { setSearchText } from "../store/slices/generalConfigSlice";
import store from "../store/store";
import { useDispatch } from "../hooks/useRedux";
import { autocompleteSongDemoData, songDemoData } from "./demoData";
import PresenterModal from "../components/modal/PresenterModal";
import { setSelectedSong } from "../store/slices/selectedSongSlice";
import { useState } from "react";

export default {
  title: "Components/PresenterModal",
  component: PresenterModal,
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

function BasicTemplate() {
  const dispatch = useDispatch();

  const handleLoadData = () => {
    dispatch(setSelectedSong(songDemoData));
    dispatch(setSearchText(autocompleteSongDemoData));
  };
  return (
    <div>
      <Button onClick={handleLoadData}>load data</Button>
      <PresenterModal />
    </div>
  );
}

function ModalTemplate() {
  const dispatch = useDispatch();
  const [presenterMode, setPresenterMode] = useState(false);

  const handleLoadData = () => {
    dispatch(setSelectedSong(songDemoData));
    dispatch(setSearchText(autocompleteSongDemoData));
  };
  return (
    <div>
      <Button onClick={handleLoadData}>load data</Button>
      <Button onClick={() => setPresenterMode(true)}>Open Modal</Button>

      {presenterMode && (
        <NewWindow onUnload={() => setPresenterMode(false)}>
          <PresenterModal />
        </NewWindow>
      )}
    </div>
  );
}

export const BasicUsage = BasicTemplate.bind({});

export const ModalUsage = ModalTemplate.bind({});
