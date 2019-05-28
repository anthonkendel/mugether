<template>
  <div></div>
</template>

<script lang="ts">
import { SpotifyService } from '@/services/SpotifyService';
import Vue from 'vue';
import { AuthenticationService } from '@/services/AuthenticationService';
import { Actions } from '@/store/actions';

export default Vue.extend({
  name: 'PlayerHandler',
  created(): void {
    this.handlePlayer();
  },
  computed: {
    isAuthorized: () => AuthenticationService.isAuthorized(),
    accessToken: () => AuthenticationService.getAccessToken(),
  },
  methods: {
    handlePlayer(): void {
      if (this.isAuthorized) {
        setInterval(async () => {
          const player = await SpotifyService.getPlayer(this.accessToken);
          if (player) {
            await this.$store.dispatch(Actions.setState, { player });
          }
        }, 1000);
      }
    },
  },
});
</script>

<style scoped>
</style>
