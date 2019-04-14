<template>
  <div class="container-fluid">
    <template v-if="accessToken">
      <router-view/>
    </template>
    <template v-else>
      <section class="section">
        <div class="columns is-centered">
          <div class="column is-narrow">
            <button class="button is-info" @click="onAuthorize">
              Authorize application
            </button>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { SpotifyService } from '@/services/SpotifyService';

export default Vue.extend({
  name: 'RouterHandler',
  computed: {
    accessToken(): string {
      return this.$store.state.accessToken;
    },
  },
  methods: {
    onAuthorize(): void {
      SpotifyService.authorize();
    },
  },
});
</script>
