<template>
  <section class="section">
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
import SelectedPlaylistTracksTable from '@/components/SelectedPlaylistTracksTable.vue';

export default Vue.extend({
  name: 'Home',
  components: { SelectedPlaylistTracksTable },
});
</script>
