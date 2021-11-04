<template>
  <v-app>
    <Bars/>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Bars from '@/components/Bars';

export default {
  name: 'App',

  components: {
    Bars,
  },

  data: () => ({
    //
  }),
};
</script>
