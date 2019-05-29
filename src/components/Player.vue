<template>
  <div class="columns">
    <div class="column is-narrow">
      <button class="button is-black" @click="onClickPlayPause">
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
import { SpotifyService } from '../services/SpotifyService';
import { AuthenticationService } from '@/services/AuthenticationService';

export default Vue.extend({
  name: 'Player',
  computed: {
    accessToken: () => AuthenticationService.getAccessToken(),
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
  methods: {
    async onClickPlayPause(): Promise<void> {
      if (this.isPlaying) {
        await SpotifyService.setPause(this.accessToken);
      } else {
        await SpotifyService.setPlay({}, this.accessToken);
      }
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


