import NewWindow from "react-new-window";
import Logo from "../assents/Logo";
import BasicLayout from "../components/layout/BasicLayout";
import PresentationMode from "../components/modes/presentationMode/PresentationMode";
import TextMode from "../components/modes/textMode/TextMode";
import { CantoralModeConstants } from "../constants/SettingsConstants";
import useGetSongs from "../hooks/useGetSongs";
import { useDispatch, useSelector } from "../hooks/useRedux";
import {
  cantoralModeSelector,
  setShowPresenterModal,
  showPresenterModalSelector,
} from "../store/slices/generalConfigSlice";
import { selectedSongSelector } from "../store/slices/selectedSongSlice";
import PresenterModal from "../components/modal/PresenterModal";

function Home() {
  const { error, loading } = useGetSongs();
  const dispatch = useDispatch();
  const cantoralMode = useSelector(cantoralModeSelector);
  const selectedSong = useSelector(selectedSongSelector);
  const showPresenterModal = useSelector(showPresenterModalSelector);

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
          {showPresenterModal &&
            cantoralMode === CantoralModeConstants.PRESENTATION &&
            selectedSong && (
              <NewWindow onUnload={() => dispatch(setShowPresenterModal())}>
                <PresenterModal />
              </NewWindow>
            )}
        </BasicLayout>
      )}
    </div>
  );
}

export default Home;
