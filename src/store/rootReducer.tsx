import { combineReducers } from "redux";
import generalConfigSlice from "./slices/generalConfigSlice";
import selectedSongSlice from "./slices/selectedSongSlice";

const rootReducer = combineReducers({
  config: generalConfigSlice,
  selectedSong: selectedSongSlice,
});

export default rootReducer;
