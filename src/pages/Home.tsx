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
import { CircularProgress } from "@mui/material";

function Home() {
  const { error, loading } = useGetSongs();
  const dispatch = useDispatch();
  const cantoralMode = useSelector(cantoralModeSelector);
  const selectedSong = useSelector(selectedSongSelector);
  const showPresenterModal = useSelector(showPresenterModalSelector);

  return (
    <BasicLayout>
      {loading ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            color: "#395479",
          }}
        >
          <CircularProgress />
          Se estan cargando las canciones...
        </div>
      ) : (
        <>
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
        </>
      )}
    </BasicLayout>
  );
}

export default Home;
