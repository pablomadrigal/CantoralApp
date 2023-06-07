import NewWindow from "react-new-window";
import Logo from "../assents/Logo";
import BasicLayout from "../components/layout/BasicLayout";
import PresentationMode from "../components/modes/presentationMode/PresentationMode";
import TextMode from "../components/modes/textMode/TextMode";
import {
  CantoralModeConstants,
  ScreenModeConstants,
} from "../constants/SettingsConstants";
import useGetSongs from "../hooks/useGetSongs";
import { useDispatch, useSelector } from "../hooks/useRedux";
import {
  cantoralModeSelector,
  screenModeSelector,
  setShowPresenterModal,
  showPresenterModalSelector,
} from "../store/slices/generalConfigSlice";
import { selectedSongSelector } from "../store/slices/selectedSongSlice";
import PresenterModal from "../components/modal/PresenterModal";
import ChordsMode from "../components/modes/chordsMode/ChordsMode";

function Home() {
  const { error, loading } = useGetSongs();
  const dispatch = useDispatch();
  const cantoralMode = useSelector(cantoralModeSelector);
  const selectedSong = useSelector(selectedSongSelector);
  const screenMode = useSelector(screenModeSelector);
  const showPresenterModal = useSelector(showPresenterModalSelector);

  return (
    <>
      {showPresenterModal && (
        <NewWindow onUnload={() => dispatch(setShowPresenterModal())}>
          <PresenterModal />
        </NewWindow>
      )}
      {screenMode === ScreenModeConstants.NORMAL ? (
        <BasicLayout loading={loading}>
          <>
            {error && <div>error</div>}
            {!selectedSong && (
              <Logo fillColor="#395479" height="100%" width="100%" />
            )}
            {cantoralMode === CantoralModeConstants.TEXT && <TextMode />}
            {cantoralMode === CantoralModeConstants.CHORDS && <ChordsMode />}
            {cantoralMode === CantoralModeConstants.PRESENTATION && (
              <PresentationMode />
            )}
          </>
        </BasicLayout>
      ) : (
        <div
          style={{
            backgroundColor: screenMode,
            height: "100vh",
            width: "100vw",
          }}
        />
      )}
    </>
  );
}

export default Home;
