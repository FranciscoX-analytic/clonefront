<template>
    <router-view></router-view>
  </template>
  
  <script setup>
  import { onMounted, onBeforeUnmount, reactive } from 'vue';
  import EventBus from './AppEventBus';
  
  const $appState = reactive({
    theme: 'lara-light-indigo',
    darkTheme: false,
  });
  
  const themeChangeListener = (event) => {
    const elementId = 'theme-link';
    const linkElement = document.getElementById(elementId);
    const cloneLinkElement = linkElement.cloneNode(true);
    const newThemeUrl = linkElement.getAttribute('href').replace($appState.theme, event.theme);
  
    cloneLinkElement.setAttribute('id', elementId + '-clone');
    cloneLinkElement.setAttribute('href', newThemeUrl);
    cloneLinkElement.addEventListener('load', () => {
      linkElement.remove();
      cloneLinkElement.setAttribute('id', elementId);
    });
    linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
  
    $appState.theme = event.theme;
    $appState.darkTheme = event.dark;
  };
  
  onMounted(() => {
    EventBus.on('theme-change', themeChangeListener);
  });
  
  onBeforeUnmount(() => {
    EventBus.off('theme-change', themeChangeListener);
  });
  </script>
  