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
    playlists(): Playlist[] {
      return this.$store.state.availablePlaylists;
    },
  },
  methods: {
    async handlePlayer(): Promise<void> {
      if (this.isAuthorized) {
        await this.$store.dispatch(Actions.loadPlayer);
        await this.$store.dispatch(Actions.loadSelectedPlaylist);
        setInterval(() => this.$store.dispatch(Actions.loadPlayer), 1500);
      }
    },
  },
});
</script>

<style scoped>
</style>
