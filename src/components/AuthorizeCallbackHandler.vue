<template>
  <div></div>
</template>

<script lang="ts">
import { SpotifyService } from '@/services/SpotifyService';
import Vue from 'vue';
import { Actions } from '@/store/actions';

export default Vue.extend({
  name: 'AuthorizeCallbackHandler',
  created(): void {
    this.handleAuthorizeFromCallback();
  },
  methods: {
    async handleAuthorizeFromCallback(): Promise<void> {
      if (!this.$store.state.accessToken) {
        const { accessToken, expiresIn } = SpotifyService.authorizeFromCallback();
        await this.$store.dispatch(Actions.setState, { accessToken, expiresIn });
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
