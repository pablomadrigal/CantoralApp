import Logo from "../assents/Logo";
import BasicLayout from "../components/layout/BasicLayout";
import PresentationMode from "../components/modes/presentationMode/PresentationMode";
import TextMode from "../components/modes/textMode/TextMode";
import CantoralModeConstants from "../constants/SettingsConstants";
import useGetSongs from "../hooks/useGetSongs";
import { useSelector } from "../hooks/useRedux";
import { cantoralModeSelector } from "../store/slices/generalConfigSlice";
import { selectedSongSelector } from "../store/slices/selectedSongSlice";

function Home() {
  const { error, loading } = useGetSongs();
  const cantoralMode = useSelector(cantoralModeSelector);
  const selectedSong = useSelector(selectedSongSelector);

  return (
    <div>
      {loading ? (
        <div>Loading</div>
      ) : (
        <BasicLayout>
          {error && <div>{error}</div>}
          {!selectedSong && (
            <Logo fillColor="#395479" height="100%" width="100%" />
          )}
          {cantoralMode === CantoralModeConstants.TEXT && <TextMode />}
          {cantoralMode === CantoralModeConstants.PRESENTATION && (
            <PresentationMode />
          )}
        </BasicLayout>
      )}
    </div>
  );
}

export default Home;
