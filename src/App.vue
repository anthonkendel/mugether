<template>
  <div>
    <AuthorizeCallbackHandler/>
    <Navbar/>
    <RouterHandler/>
    <PlayerHandler/>
  </div>
</template>

<script lang="ts">
import AuthorizeCallbackHandler from '@/components/AuthorizeCallbackHandler.vue';
import Navbar from '@/components/Navbar.vue';
import RouterHandler from '@/components/RouterHandler.vue';
import PlayerHandler from '@/components/PlayerHandler.vue';
import Vue from 'vue';

export default Vue.extend({
  name: 'Mutogether',
  components: { AuthorizeCallbackHandler, Navbar, RouterHandler, PlayerHandler },

});
</script>
