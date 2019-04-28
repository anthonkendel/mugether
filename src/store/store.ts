import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import { mutations } from '@/store/mutations';
import { actions } from '@/store/actions';
import { IPlaylist, IDevice } from '@/services/SpotifyInterfaces';


Vue.use(Vuex);

export interface IState {
  accessToken: string;
  expiresIn: string;
  availablePlaylists: IPlaylist[];
  selectedPlaylist: IPlaylist | {};
  availableDevices: IDevice[];
  activeDevice: IDevice | {};
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
  } as IState,
  mutations,
  actions,
  plugins: [persistence.plugin],
});
