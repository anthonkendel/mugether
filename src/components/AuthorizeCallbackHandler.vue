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
    handleAuthorizeFromCallback(): void {
      if (!this.$store.state.accessToken) {
        const { accessToken, expiresIn } = SpotifyService.authorizeFromCallback();
        this.$store.dispatch(Actions.setState, { accessToken, expiresIn });
      }
    },
  },
});
</script>

<style scoped>

</style>
