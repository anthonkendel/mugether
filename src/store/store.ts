import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import { mutations } from '@/store/mutations';
import { actions } from '@/store/actions';
import { Playlist, Device, GetPlayer } from '@/services/SpotifyInterfaces';


Vue.use(Vuex);

export interface IState {
  accessToken: string;
  expiresIn: string;
  availablePlaylists: Playlist[];
  selectedPlaylist: Playlist | {};
  availableDevices: Device[];
  activeDevice: Device | {};
  player: GetPlayer | {};
}

export const persistence = new VuexPersistence<IState>({
  storage: window.localStorage,
  key: 'mugether',
  reducer: (state) => ({ accessToken: state.accessToken, expiresIn: state.expiresIn }),
});

export const store = new Vuex.Store({
  state: {
    accessToken: '',
    expiresIn: '',
    availablePlaylists: [],
    selectedPlaylist: {},
    availableDevices: [],
    activeDevice: {},
    player: {},
  } as IState,
  mutations,
  actions,
  plugins: [persistence.plugin],
});
