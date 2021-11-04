<template>
  <v-card class="mx-auto overflow-hidden" height="50">
    <v-app-bar color="grey darken-4" dark app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Guided Vuefire</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h5">
            WEB VUE
            <v-icon color="red">
              mdi-fire
            </v-icon>
          </v-list-item-title>
          <v-list-item-subtitle>
            Contoh Guided
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="grey darken-1--text text--accent-4"
        >
          <router-link
            v-for="route in routes"
            :key="route.path"
            :to="route.path"
            tag="p"
          >
            <v-list-item>
              <v-list-item-icon>
                <v-icon>{{ route.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ route.name }}</v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  name: "Bars",

  data: () => ({
    drawer: true,
    group: null,
    routes: [
      { path: "drink", name: "Drinks", icon: "mdi-glass-mug" },
      { path: "food", name: "Foods", icon: "mdi-food" },
    ],
  }),
};
</script>
