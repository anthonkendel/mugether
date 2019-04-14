<template>
  <div>
    <AuthorizeCallbackHandler/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AuthorizeCallbackHandler from '@/components/AuthorizeCallbackHandler.vue';

export default Vue.extend({
  name: 'Mutogether',
  components: { AuthorizeCallbackHandler },
});
</script>
