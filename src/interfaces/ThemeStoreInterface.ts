export interface ThemeStoreInterface {
  readonly available: object
  current: string
  theme(): object
  setTheme(theme: string): void
}
