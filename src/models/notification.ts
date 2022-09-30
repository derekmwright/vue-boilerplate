import { InjectionKey } from "vue"

export interface NotificationOpts {
  show: boolean
  title: string
  message: string
  icon: any
}

export type sendNotification = (params:NotificationOpts) => void

export const notification: InjectionKey<sendNotification> = Symbol('notification')
