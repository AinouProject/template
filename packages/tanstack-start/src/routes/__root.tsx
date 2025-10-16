/// <reference types="vite/client" />
import React, { type ReactNode } from 'react'
import { Outlet, createRootRouteWithContext, HeadContent, Scripts } from '@tanstack/react-router'
import appCss from '@/styles/app.css?url'
import { Devtools } from '@/components/devtools'
import { type i18n as i18nType } from 'i18next'
import { QueryClient } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'

export const Route = createRootRouteWithContext<{ i18n: i18nType; queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: '[FIXME]: Project Name',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  const { i18n } = Route.useRouteContext()

  return (
    <RootDocument>
      <I18nextProvider i18n={i18n} defaultNS={'common'}>
        <Outlet />
      </I18nextProvider>
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
        <Devtools />
      </body>
    </html>
  )
}
