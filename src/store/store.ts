import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import { mutations } from '@/store/mutations';
import { actions } from '@/store/actions';


Vue.use(Vuex);

export interface IState {
  accessToken: string;
  expiresIn: string;
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
  } as IState,
  mutations,
  actions,
  plugins: [persistence.plugin],
});
