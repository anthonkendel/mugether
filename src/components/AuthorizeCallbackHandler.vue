<template>
  <div></div>
</template>

<script lang="ts">
import { SpotifyService } from '@/services/SpotifyService';
import Vue from 'vue';
import { AuthenticationService } from '@/services/AuthenticationService';

export default Vue.extend({
  name: 'AuthorizeCallbackHandler',
  created(): void {
    this.handleAuthorizeFromCallback();
  },
  computed: {
    isAuthorized: () => AuthenticationService.isAuthorized(),
  },
  methods: {
    async handleAuthorizeFromCallback(): Promise<void> {
      if (!this.isAuthorized) {
        const { accessToken, expiresIn } = SpotifyService.authorizeFromCallback();
        await AuthenticationService.authorize(accessToken, expiresIn);
        this.$router.replace({ params: {}, query: {} });
      } else {
        this.$router.replace({ params: {}, query: {} });
      }
    }
    ,
  },
})
;
</script>

<style scoped>

</style>
