<template>
  <b-dropdown
    v-if="isAuthorized"
    v-model="selectedPlaylist"
  >
    <template v-slot:trigger="">
      <button class="button">
        <span>
          Selected playlist:
          <strong v-if="selectedPlaylist.id">{{ selectedPlaylist.name }}</strong>
          <strong v-else>None</strong>
        </span>
      </button>
    </template>

    <b-dropdown-item
      v-for="playlist in playlists"
      :key="playlist.id"
      :value="playlist"
    >
      <span>{{ playlist.name }}</span>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script lang="ts">
import Vue from 'vue';
import { Playlist } from '@/services/SpotifyInterfaces';
import { Actions } from '@/store/actions';
import { SpotifyService } from '@/services/SpotifyService';
import { AuthenticationService } from '@/services/AuthenticationService';

export default Vue.extend({
  name: 'SelectedPlaylistDropdown',
  computed: {
    isAuthorized: () => AuthenticationService.isAuthorized(),
    accessToken: () => AuthenticationService.getAccessToken(),
    selectedPlaylist: {
      get(): Playlist {
        return this.$store.state.selectedPlaylist;
      },
      async set(value: Playlist): Promise<void> {
        if (this.$store.state.selectedPlaylist !== value) {
          await this.$store.dispatch(Actions.setState, { selectedPlaylist: value });
        }
      },
    },
    playlists(): Playlist[] {
      return this.$store.state.availablePlaylists;
    },
  },
  async created(): Promise<void> {
    if (this.isAuthorized) {
      await this.loadPlaylists();
    }
  },
  methods: {
    async loadPlaylists(): Promise<void> {
      const { items = [] } = await SpotifyService.getPlaylists(this.accessToken);
      const collaborative = items!.filter((item) => item.collaborative);
      await this.$store.dispatch(Actions.setState, {
        availablePlaylists: collaborative,
      });
    },
  },
});
</script>

<style scoped>

</style>
