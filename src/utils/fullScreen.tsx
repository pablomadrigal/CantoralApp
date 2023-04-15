export const openFullscreen = () => {
  // Trigger fullscreen
  const docElmWithBrowsersFullScreenFunctions =
    document.documentElement as HTMLElement & {
      mozRequestFullScreen(): Promise<void>;
      webkitRequestFullscreen(): Promise<void>;
      msRequestFullscreen(): Promise<void>;
    };

  if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
    void docElmWithBrowsersFullScreenFunctions.requestFullscreen();
  } else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) {
    /* Firefox */
    void docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
  } else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    void docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
  } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) {
    /* IE/Edge */
    void docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
  }
  return true;
};

export const closeFullscreen = () => {
  const docWithBrowsersExitFunctions = document as Document & {
    mozCancelFullScreen(): Promise<void>;
    webkitExitFullscreen(): Promise<void>;
    msExitFullscreen(): Promise<void>;
  };
  if (docWithBrowsersExitFunctions.exitFullscreen) {
    void docWithBrowsersExitFunctions.exitFullscreen();
  } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) {
    /* Firefox */
    void docWithBrowsersExitFunctions.mozCancelFullScreen();
  } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    void docWithBrowsersExitFunctions.webkitExitFullscreen();
  } else if (docWithBrowsersExitFunctions.msExitFullscreen) {
    /* IE/Edge */
    void docWithBrowsersExitFunctions.msExitFullscreen();
  }
  return false;
};
