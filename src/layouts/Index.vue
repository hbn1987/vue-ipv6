<script lang="ts" setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

import { provideSearchCondition, provideSearchResult } from '@/lib/providers'

const { multipleKeyword } = provideSearchCondition()

provideSearchResult(multipleKeyword)
</script>

<template>
  <n-layout>
    <Header />
    <n-layout-content
      min-h="screen"
      py="[50px]"
      bg="!transparent"
      class="layout__content"
    >
      <!-- <Banner /> -->
      <div position="relative" container="~" m="-t-16 x-auto" p="x-8" z="10">
        <router-view v-slot="{ Component }">
          <transition :duration="200" name="fade-top" mode="out-in">
            <!-- <keep-alive> -->
            <component :is="Component" />
            <!-- </keep-alive> -->
          </transition>
        </router-view>
      </div>
    </n-layout-content>
    <Footer />
  </n-layout>
</template>
