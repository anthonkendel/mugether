<template>
  <div class="columns">
    <div class="column is-narrow">
      <button class="button is-black">
        <b-icon v-if="isPlaying" icon="pause"/>
        <b-icon v-else icon="play"/>
      </button>
    </div>
    <div class="column is-center-flex">
      <progress class="progress is-link" :value="progressInSeconds" :max="trackTimeInSeconds"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { GetPlayer } from '@/services/SpotifyInterfaces';

export default Vue.extend({
  name: 'Player',
  computed: {
    player(): GetPlayer {
      return this.$store.state.player;
    },
    isPlaying(): boolean {
      return this.player.is_playing;
    },
    progressInSeconds(): number {
      return this.player.progress_ms / 1000;
    },
    trackTimeInSeconds(): number {
      return (this.player.item || {}).duration_ms / 1000;
    },
  },
});
</script>

<style lang="scss" scoped>
.is-center-flex {
  display: flex;
  align-items: center;
}
</style>


