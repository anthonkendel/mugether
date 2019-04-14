<template>
  <div class="container-fluid">
    <template v-if="isAuthorized">
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
import { AuthenticationService } from '@/services/AuthenticationService';

export default Vue.extend({
  name: 'RouterHandler',
  computed: {
    isAuthorized: () => AuthenticationService.isAuthorized(),
  },
  methods: {
    onAuthorize(): void {
      SpotifyService.authorize();
    },
  },
});
</script>
