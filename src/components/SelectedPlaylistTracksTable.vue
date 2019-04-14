<template>
  <b-table
    :data="tracks"
    :loading="isLoading"
    :total="totalNumberOfTracks"
    :per-page="pageSize"
    :current-page="currentPage"
    @page-change="onPageChange"
    paginated
    backend-pagination
  >
    <template v-slot="{ row }">
      <b-table-column field="name" label="Name">
        {{ row.track.name }}
      </b-table-column>
      <b-table-column field="name" label="Artist(s)">
        {{ getArtists(row.track.artists) }}
      </b-table-column>
    </template>

    <template v-slot:empty>
      <section class="section has-text-centered">
        <h2 class="title is-5">No playlist selected.</h2>
      </section>
    </template>
  </b-table>
</template>

<script lang="ts">
import Vue from 'vue';
import { IArtist, IPlaylist, ITrack } from '@/services/SpotifyInterfaces';
import { SpotifyService } from '@/services/SpotifyService';

export default Vue.extend({
  name: 'SelectedPlaylistTracksList',
  watch: {
    async '$store.state.selectedPlaylist'(): Promise<void> {
      await this.loadTracks();
    },
  },
  data: () => ({
    tracks: new Array<ITrack>(),
    totalNumberOfTracks: 0,
    currentPage: 1,
    pageSize: 14,
    isLoading: false,
  }),
  computed: {
    selectedPlaylist(): IPlaylist {
      return this.$store.state.selectedPlaylist;
    },
  },
  async created(): Promise<void> {
    await this.loadTracks();
  },
  methods: {
    async loadTracks(): Promise<void> {
      if (this.selectedPlaylist && this.selectedPlaylist.id) {
        this.isLoading = true;

        const indexOffset = (this.currentPage - 1) * this.pageSize;
        const result = await SpotifyService.getTracks(
          this.selectedPlaylist.id,
          this.$store.state.accessToken,
          this.pageSize,
          indexOffset,
        );

        this.tracks = result.items || [];
        this.totalNumberOfTracks = result.total;
        this.isLoading = false;
      }
    },
    async onPageChange(page: number): Promise<void> {
      this.currentPage = page;
      await this.loadTracks();
    },

    getArtists(artists: IArtist[] = []): string {
      return artists.map((artist) => artist.name).join(', ');
    },
  },
});
</script>

<style scoped>

</style>
