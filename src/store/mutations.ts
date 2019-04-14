import { IState } from '@/store/store';
import { MutationTree } from 'vuex';

export enum Mutations {
  setState = 'setState',
}

export const mutations: MutationTree<IState> = {
  [Mutations.setState](state: IState, newState: IState): void {
    Object.assign(state, newState);
  },
};
