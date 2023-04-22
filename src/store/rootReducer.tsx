import { combineReducers } from "redux";
import generalConfigSlice from "./slices/generalConfigSlice";
import selectedSongSlice from "./slices/selectedSongSlice";
import musicSlice from "./slices/musicSlice";

const rootReducer = combineReducers({
  config: generalConfigSlice,
  selectedSong: selectedSongSlice,
  musicConfig: musicSlice,
});

export default rootReducer;
