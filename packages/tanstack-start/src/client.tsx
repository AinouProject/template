import { scan } from 'react-scan'
import React, { StrictMode } from 'react'
import { StartClient } from '@tanstack/react-start/client'
import { hydrateRoot } from 'react-dom/client'

scan({
  enabled: import.meta.env.DEV,
})

const App = <StartClient />

hydrateRoot(document, import.meta.env.DEV ? <StrictMode>{App}</StrictMode> : App)
