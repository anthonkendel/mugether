import { Mutations } from '@/store/mutations';
import { IState } from '@/store/store';
import { ActionTree } from 'vuex';
import { SpotifyService } from '@/services/SpotifyService';
import { GetPlayer, Playlist } from '@/services/SpotifyInterfaces';

export enum Actions {
  setState = 'setState',
  loadAvailablePlaylists = 'loadAvailablePlaylists',
  loadSelectedPlaylist = 'loadSelectedPlaylist',
  loadPlayer = 'loadPlayer',
  loadDevices = 'loadDevices',
}

export const actions: ActionTree<IState, IState> = {
  async [Actions.setState]({ commit }, newState: IState): Promise<void> {
    commit(Mutations.setState, newState);
  },

  async [Actions.loadAvailablePlaylists]({ commit, state }): Promise<void> {
    const { items = [] } = await SpotifyService.getPlaylists(state.accessToken);
    const collaborative = items!.filter((item) => item.collaborative);
    commit(Mutations.setState, { availablePlaylists: collaborative } as IState);
  },

  async [Actions.loadSelectedPlaylist]({ commit, dispatch, state }): Promise<void> {
    const player = state.player as GetPlayer;
    const stateSelectedPlaylist = state.selectedPlaylist as Playlist;

    const [, playlistId] = player.context.uri.split(':playlist:');

    if (playlistId && stateSelectedPlaylist.id !== playlistId) {
      // ? To ensure that playlists are loaded.
      await dispatch(Actions.loadAvailablePlaylists);
      const selectedPlaylist = state.availablePlaylists.find(
        (playlist) => playlist.id === playlistId,
      );
      if (selectedPlaylist) {
        commit(Mutations.setState, { selectedPlaylist });
      }
    }
  },

  async [Actions.loadPlayer]({ commit, state }): Promise<void> {
    const player = await SpotifyService.getPlayer(state.accessToken);
    if (player) {
      commit(Mutations.setState, { player } as IState);
    }
  },

  async [Actions.loadDevices]({ commit, state }): Promise<void> {
    const { devices = [] } = await SpotifyService.getDevices(state.accessToken);
    const activeDevice = devices!.find((device) => device.is_active);
    await commit(Mutations.setState, { availableDevices: devices, activeDevice });
  },
};
