/* eslint-disable @typescript-eslint/no-explicit-any */
import { Provider } from "react-redux";
import store from "../store/store";
import { Button } from "@mui/material";
import { useDispatch } from "../hooks/useRedux";
import MusicPlayer from "../components/music/MusicPlayer";
import { setMusicURL } from "../store/slices/musicSlice";
import NavbarMusicButton from "../components/music/MusicButton";
import MusicControl from "../components/music/MusicControl";

export default {
  title: "Components/Music/MusicPlayer",
  component: MusicPlayer,
  tags: ["autodocs"],
  argTypes: {
    url: {
      name: "url",
      description: "url of the audio of a song",
      type: { name: "string" },
      defaultValue: "",
      control: "text",
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

function Template({ url }: { url: string }) {
  const dispatch = useDispatch();
  return (
    <div>
      <Button onClick={() => dispatch(setMusicURL(url))}>Load song</Button>
      <NavbarMusicButton />
      <MusicControl />
    </div>
  );
}

export const Default = Template.bind({
  url: "https://www.riamusica.org/wp-content/uploads/2018/06/1-La-Espada-del-Esp%C3%ADritu.mp3",
});
