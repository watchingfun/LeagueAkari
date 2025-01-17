import { mainCall, mainStateSync } from '@shared/renderer/utils/ipc'

import { useAutoGameflowStore } from './store'

export async function setupAutoGameflow() {
  const autoGameflow = useAutoGameflowStore()

  mainStateSync(
    'auto-gameflow/settings/auto-honor-enabled',
    (s) => (autoGameflow.settings.autoHonorEnabled = s)
  )
  mainStateSync(
    'auto-gameflow/settings/auto-honor-strategy',
    (s) => (autoGameflow.settings.autoHonorStrategy = s)
  )
  mainStateSync(
    'auto-gameflow/settings/play-again-enabled',
    (s) => (autoGameflow.settings.playAgainEnabled = s)
  )

  mainStateSync('auto-gameflow/will-accept', (s) => (autoGameflow.willAccept = s))

  mainStateSync('auto-gameflow/will-accept-at', (s) => (autoGameflow.willAcceptAt = s))

  mainStateSync(
    'auto-gameflow/settings/auto-accept-enabled',
    (s) => (autoGameflow.settings.autoAcceptEnabled = s)
  )

  mainStateSync(
    'auto-gameflow/settings/auto-accept-delay-seconds',
    (s) => (autoGameflow.settings.autoAcceptDelaySeconds = s)
  )

  mainStateSync('auto-gameflow/will-search-match', (s) => (autoGameflow.willSearchMatch = s))

  mainStateSync('auto-gameflow/will-search-match-at', (s) => (autoGameflow.willSearchMatchAt = s))

  mainStateSync(
    'auto-gameflow/settings/auto-search-match-enabled',
    (s) => (autoGameflow.settings.autoSearchMatchEnabled = s)
  )

  mainStateSync(
    'auto-gameflow/settings/auto-search-match-delay-seconds',
    (s) => (autoGameflow.settings.autoSearchMatchDelaySeconds = s)
  )

  mainStateSync(
    'auto-gameflow/activity-start-status',
    (s) => (autoGameflow.activityStartStatus = s)
  )

  mainStateSync(
    'auto-gameflow/settings/auto-search-match-minimum-members',
    (s) => (autoGameflow.settings.autoSearchMatchMinimumMembers = s)
  )

  mainStateSync(
    'auto-gameflow/settings/auto-search-match-wait-for-invitees',
    (s) => (autoGameflow.settings.autoSearchMatchWaitForInvitees = s)
  )

  mainStateSync(
    'auto-gameflow/settings/auto-search-match-rematch-strategy',
    (s) => (autoGameflow.settings.autoSearchMatchRematchStrategy = s)
  )

  mainStateSync(
    'auto-gameflow/settings/auto-search-match-rematch-fixed-duration',
    (s) => (autoGameflow.settings.autoSearchMatchRematchFixedDuration = s)
  )
}

export function setAutoHonorEnabled(enabled: boolean) {
  return mainCall('auto-gameflow/settings/auto-honor-enabled/set', enabled)
}

export function setAutoHonorStrategy(strategy: string) {
  return mainCall('auto-gameflow/settings/auto-honor-strategy/set', strategy)
}

export function setPlayAgainEnabled(enabled: boolean) {
  return mainCall('auto-gameflow/settings/play-again-enabled/set', enabled)
}

export function setAutoAcceptEnabled(enabled: boolean) {
  return mainCall('auto-gameflow/settings/auto-accept-enabled/set', enabled)
}

export async function cancelAutoAccept() {
  return mainCall('auto-gameflow/cancel-auto-accept')
}

export async function setAutoAcceptDelaySeconds(seconds: number) {
  return mainCall('auto-gameflow/settings/auto-accept-delay-seconds/set', seconds)
}

export async function setAutoSearchMatchEnabled(enabled: boolean) {
  return mainCall('auto-gameflow/settings/auto-search-match-enabled/set', enabled)
}

export async function setAutoSearchMatchDelaySeconds(seconds: number) {
  return mainCall('auto-gameflow/settings/auto-search-match-delay-seconds/set', seconds)
}

export async function cancelAutoSearchMatch() {
  return mainCall('auto-gameflow/cancel-auto-search-match')
}

export async function setAutoSearchMatchMinimumMembers(count: number) {
  return mainCall('auto-gameflow/settings/auto-search-match-minimum-members/set', count)
}

export async function setAutoSearchMatchWaitForInvitees(yes: number) {
  return mainCall('auto-gameflow/settings/auto-search-match-wait-for-invitees/set', yes)
}

export async function setAutoSearchMatchRematchStrategy(s: string) {
  return mainCall('auto-gameflow/settings/auto-search-match-rematch-strategy/set', s)
}

export async function setAutoSearchMatchRematchFixedDuration(s: number) {
  return mainCall('auto-gameflow/settings/auto-search-match-rematch-fixed-duration/set', s)
}
