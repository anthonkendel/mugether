<template>
  <section class="section">
    <div class="columns">
      <div class="column is-2">
        <SelectedPlaylistDropdown class="is-full-width"/>
      </div>
      <div class="column is-2">
        <SelectedPlaylistDropdown/>
      </div>
    </div>
    <div class="columns">
      <div class="column is-4">
        <h2 class="title is-5">Tracks for selected playlist:</h2>
        <SelectedPlaylistTracksTable/>
      </div>
      <div class="column is-8"></div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import SelectedPlaylistDropdown from '@/components/SelectedPlaylistDropdown.vue';
import ActiveDeviceDropdown from '@/components/ActiveDeviceDropdown.vue';
import SelectedPlaylistTracksTable from '@/components/SelectedPlaylistTracksTable.vue';

export default Vue.extend({
  name: 'MuHost',
  components: { SelectedPlaylistTracksTable, ActiveDeviceDropdown, SelectedPlaylistDropdown },
});
</script>
