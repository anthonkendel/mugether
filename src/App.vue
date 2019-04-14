<template>
  <div>
    <AuthorizeCallbackHandler/>
    <Navbar/>
    <RouterHandler/>
  </div>
</template>

<script lang="ts">
import AuthorizeCallbackHandler from '@/components/AuthorizeCallbackHandler.vue';
import Navbar from '@/components/Navbar.vue';
import RouterHandler from '@/components/RouterHandler.vue';
import Vue from 'vue';

export default Vue.extend({
  name: 'Mutogether',
  components: { AuthorizeCallbackHandler, Navbar, RouterHandler },

});
</script>
