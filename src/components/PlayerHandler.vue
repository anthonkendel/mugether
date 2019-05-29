<template>
  <div></div>
</template>

<script lang="ts">
import { SpotifyService } from '@/services/SpotifyService';
import Vue from 'vue';
import { AuthenticationService } from '@/services/AuthenticationService';
import { Actions } from '@/store/actions';
import { mapState } from 'vuex';
import { Playlist, GetPlayer } from '@/services/SpotifyInterfaces';

export default Vue.extend({
  name: 'PlayerHandler',
  created(): void {
    this.handlePlayer();
  },
  computed: {
    isAuthorized: () => AuthenticationService.isAuthorized(),
    accessToken: () => AuthenticationService.getAccessToken(),
    player(): GetPlayer {
      return this.$store.state.player;
    },
    selectedPlaylist: {
      get(): Playlist {
        return this.$store.state.selectedPlaylist;
      },
      async set(value: Playlist): Promise<void> {
        if (this.$store.state.selectedPlaylist !== value) {
          await this.$store.dispatch(Actions.setState, {
            selectedPlaylist: value,
          });
        }
      },
    },
    playlists(): Playlist[] {
      return this.$store.state.availablePlaylists;
    },
  },
  methods: {
    async updatePlayer(): Promise<void> {
      const player = await SpotifyService.getPlayer(this.accessToken);
      if (player) {
        await this.$store.dispatch(Actions.setState, { player });
      }
    },
    async updateSelectedPlaylist(): Promise<void> {
      const [, playlistId] = this.player.context.uri.split(':playlist:');
      if (playlistId && this.selectedPlaylist.id !== playlistId) {
        const seletedPlaylist = this.playlists.find(
          (playlist) => playlist.id === playlistId,
        );
        if (seletedPlaylist) {
          this.selectedPlaylist = seletedPlaylist;
        }
      }
    },
    async handlePlayer(): Promise<void> {
      if (this.isAuthorized) {
        await this.updatePlayer();
        await this.updateSelectedPlaylist();
        setInterval(this.updatePlayer, 1500);
      }
    },
  },
});
</script>

<style scoped>
</style>
