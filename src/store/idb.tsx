import { openDB, DBSchema } from "idb";
import { SongSchema } from "../types/SongTypes";

interface SettingsDBSchema extends DBSchema {
  settings: {
    value: {
      cantoralType: string;
    };
    key: string;
  };
}

interface SongDBSchema extends DBSchema {
  songs: {
    value: SongSchema;
    key: string;
  };
}

export const data_idb = openDB<SongDBSchema>("data_db", 1, {
  upgrade(data_idb) {
    data_idb.createObjectStore("songs", {
      keyPath: "_id",
    });
  },
});

export const settings_idb = openDB<SettingsDBSchema>("settings_db", 1, {
  upgrade(settings_idb) {
    settings_idb.createObjectStore("settings");
  },
});
