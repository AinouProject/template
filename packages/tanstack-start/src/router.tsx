import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen.js'
import { QueryClient } from '@tanstack/react-query'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { createI18n } from './i18n.js'

export async function getRouter() {
  const queryClient = new QueryClient()
  const i18n = await createI18n()

  const router = createRouter({
    routeTree,
    context: { queryClient, i18n },
    defaultPreload: false,
    scrollRestoration: true,
  })

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: Awaited<ReturnType<typeof getRouter>>
  }
}
