import { mainCall, mainStateSync } from '@renderer/utils/ipc'

import { useAppStore } from './store'

export const id = 'core:app'

export async function setupApp() {
  const app = useAppStore()

  mainStateSync('main-window/state', (s) => {
    app.windowState = s
  })

  mainStateSync('app/is-administrator', (s) => {
    app.isAdministrator = s
  })

  mainStateSync('app/settings/auto-connect', (s) => (app.settings.autoConnect = s))

  mainStateSync('app/settings/auto-check-updates', (s) => (app.settings.autoCheckUpdates = s))

  mainStateSync('league-client-ux/settings/fix-window-method-a-options', (s) => {
    app.settings.fixWindowMethodAOptions = s
  })

  mainStateSync(
    'app/settings/show-free-software-declaration',
    (s) => (app.settings.showFreeSoftwareDeclaration = s)
  )

  mainStateSync('app/updates/is-checking-updates', (s) => (app.updates.isCheckingUpdates = s))

  mainStateSync('app/updates/new-updates', (s) => (app.updates.newUpdates = s))

  mainStateSync('app/updates/last-check-at', (s) => (app.updates.lastCheckAt = s))

  mainCall('app/version/get').then((version) => {
    app.version = version
  })
}

export function setAutoConnect(enabled: boolean) {
  return mainCall('app/settings/auto-connect/set', enabled)
}

export function setAutoCheckUpdates(enabled: boolean) {
  return mainCall('app/settings/auto-check-updates/set', enabled)
}

export function setShowFreeSoftwareDeclaration(enabled: boolean) {
  return mainCall('app/settings/show-free-software-declaration/set', enabled)
}

export function setFixWindowMethodAOptions(options: { baseWidth: number; baseHeight: number }) {
  return mainCall('league-client-ux/settings/fix-window-method-a-options/set', options)
}