<template>
  <section class="section">
    <section>
      <div class="columns">
        <div class="column is-2">
          <ActiveDeviceDropdown/>
        </div>
        <div class="column is-2">
          <SelectedPlaylistDropdown/>
        </div>
      </div>

      <div class="columns">
        <div class="column is-4">
          <Player/>
        </div>
      </div>
    </section>

    <section>
      <div class="columns">
        <div class="column is-4">
          <h2 class="title is-5">Tracks for selected playlist:</h2>
          <SelectedPlaylistTracksTable/>
        </div>
        <div class="column is-8"></div>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import SelectedPlaylistDropdown from '@/components/SelectedPlaylistDropdown.vue';
import ActiveDeviceDropdown from '@/components/ActiveDeviceDropdown.vue';
import SelectedPlaylistTracksTable from '@/components/SelectedPlaylistTracksTable.vue';
import Player from '@/components/Player.vue';

export default Vue.extend({
  name: 'MuHost',
  components: {
    ActiveDeviceDropdown,
    Player,
    SelectedPlaylistDropdown,
    SelectedPlaylistTracksTable,
  },
});
</script>
