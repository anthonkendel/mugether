import { Mutations } from '@/store/mutations';
import { IState } from '@/store/store';
import { ActionTree } from 'vuex';

export enum Actions {
  setState = 'setState',
}

export const actions: ActionTree<IState, IState> = {
  [Actions.setState]({ commit }, newState: IState): void {
    commit(Mutations.setState, newState);
  },
};
