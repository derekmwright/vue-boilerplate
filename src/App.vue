<script setup lang="ts">
import { InjectionKey, provide, ref } from "vue";
import DefaultNotification from '@/components/Notifications/DefaultNotification.vue'
import { NotificationOpts, sendNotification, notification } from "./models/notification";

const flash = ref({
  show: false,
  icon: {},
  title: '',
  message: '',
})

const updateFlash = (params: NotificationOpts) => {
  flash.value.show = params.show
  flash.value.title = params.title
  flash.value.message = params.message
  flash.value.icon = params.icon
}

provide(notification, updateFlash)
</script>

<template>
  <RouterView />
  <div aria-live="assertive" class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <DefaultNotification v-if="flash.show" :title="flash.title" :message="flash.message" />
    </div>
  </div>
</template>
