export const APP_CONFIG = {
  name: "StackIt",
  defaultUser: "Zevanya",
  colors: {
    primary: "blue-500",
    secondary: "orange-500",
  },
} as const

export const ROUTES = {
  dashboard: "/dashboard",
  decklist: "/decklist",
  deck: (id: number | string) => `/deck/${id}`,
  flashcard: (id: number | string) => `/flashcard/${id}`,
  study: (deckId: number | string) => `/study/${deckId}`,
  login: "/login",
  register: "/register",
} as const
