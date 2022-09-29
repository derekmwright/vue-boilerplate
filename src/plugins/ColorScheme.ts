import { App, inject } from "vue";

const colorSchemeKey = Symbol('colorScheme')

export function createColorScheme(options: ColorSchemeConfig): ColorScheme {
  return new ColorScheme(options)
}

export interface ColorSchemeConfig {
  primary: string
}

export class ColorScheme {
  readonly primaryColor: string

  constructor(options: ColorSchemeConfig) {
    this.primaryColor = options.primary
  }

  primaryInteractiveBg(): string {
    return `bg-${this.primaryColor}-600`
  }

  install(app: App): void {
    app.provide(colorSchemeKey, this)
    app.config.globalProperties.$colorScheme = this
  }
}

export function useColorScheme(): ColorScheme {
  return inject(colorSchemeKey) as ColorScheme
}
