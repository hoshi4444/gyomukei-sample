<script lang="ts" setup>
const route = useRoute();

const appName = `業務系システムサンプル`;

useHead({
  titleTemplate: (titleChunk) =>
    titleChunk ? `${appName} - ${titleChunk}` : `${appName}`,
});
</script>
<template>
  <v-app>
    <v-main>
      {{ route.meta.title }}
      <app-header />
      <slot />
    </v-main>
  </v-app>
</template>
