import { makeAutoObservable } from 'mobx'

import { gameflow } from '../lcu-state-sync/gameflow'
import { lobby } from '../lcu-state-sync/lobby'
import { matchmaking } from '../lcu-state-sync/matchmaking'
import { summoner } from '../lcu-state-sync/summoner'

export type AutoHonorStrategy =
  | 'prefer-lobby-member' // 随机优先组队时房间内成员
  | 'only-lobby-member' // 随机仅限组队时房间内成员
  | 'all-member' // 随机所有可点赞玩家
  | 'opt-out' // 直接跳过

export type AutoSearchRematchStrategy = 'never' | 'fixed-duration' | 'estimated-duration'

class AutoGameflowSettings {
  autoHonorEnabled: boolean = false
  autoHonorStrategy: AutoHonorStrategy = 'prefer-lobby-member'

  playAgainEnabled: boolean = false

  autoAcceptEnabled: boolean = false
  autoAcceptDelaySeconds: number = 0

  autoSearchMatchEnabled: boolean = false
  autoSearchMaximumMatchDuration: number = 0
  autoSearchMatchRematchStrategy: AutoSearchRematchStrategy = 'never'
  autoSearchMatchRematchFixedDuration: number = 2
  autoSearchMatchDelaySeconds: number = 5
  autoSearchMatchMinimumMembers = 1 // 最低满足人数
  autoSearchMatchWaitForInvitees: boolean = true // 等待邀请中的用户

  setAutoHonorEnabled(enabled: boolean) {
    this.autoHonorEnabled = enabled
  }

  setAutoHonorStrategy(strategy: AutoHonorStrategy) {
    this.autoHonorStrategy = strategy
  }

  setPlayAgainEnabled(enabled: boolean) {
    this.playAgainEnabled = enabled
  }

  setAutoAcceptEnabled(enabled: boolean) {
    this.autoAcceptEnabled = enabled
  }

  setAutoAcceptDelaySeconds(seconds: number) {
    this.autoAcceptDelaySeconds = seconds
  }

  setAutoSearchMatchEnabled(enabled: boolean) {
    this.autoSearchMatchEnabled = enabled
  }

  setAutoSearchMatchDelaySeconds(seconds: number) {
    this.autoSearchMatchDelaySeconds = seconds
  }

  setAutoSearchMatchMinimumMembers(count: number) {
    this.autoSearchMatchMinimumMembers = count
  }

  setAutoSearchMatchWaitForInvitees(yes: boolean) {
    this.autoSearchMatchWaitForInvitees = yes
  }

  setAutoSearchMatchRematchStrategy(s: AutoSearchRematchStrategy) {
    this.autoSearchMatchRematchStrategy = s
  }

  setAutoSearchMatchRematchFixedDuration(seconds: number) {
    this.autoSearchMatchRematchFixedDuration = seconds
  }

  constructor() {
    makeAutoObservable(this)
  }
}

class AutoGameflowState {
  settings = new AutoGameflowSettings()

  /**
   * 即将进行自动接受操作
   */
  willAccept: boolean = false

  /**
   * 即将进行的自动接受操作将在指定时间戳完成
   */
  willAcceptAt: number = -1

  willSearchMatch: boolean = false

  /**
   * 即将进行的匹配开始的时间
   */
  willSearchMatchAt: number = -1

  get activityStartStatus() {
    if (!lobby.lobby) {
      return 'unavailable'
    }

    if (gameflow.session?.gameData.isCustomGame) {
      return 'unavailable'
    }

    const self = lobby.lobby.members.find((m) => m.puuid === summoner.me?.puuid)

    if (self) {
      if (!self.isLeader) {
        return 'not-the-leader'
      }
    } else {
      return 'unavailable'
    }

    if (matchmaking.search) {
      const errors = matchmaking.search.errors
      const maxPenaltyTime = errors.reduce(
        (prev, cur) => Math.max(cur.penaltyTimeRemaining, prev),
        -Infinity
      )

      if (maxPenaltyTime > 0) {
        return 'waiting-for-penalty-time'
      }
    }

    if (this.settings.autoSearchMatchWaitForInvitees) {
      const hasPendingInvitation = lobby.lobby.invitations.some((i) => i.state === 'Pending')
      if (hasPendingInvitation) {
        return 'waiting-for-invitees'
      }
    }

    if (lobby.lobby.members.length < this.settings.autoSearchMatchMinimumMembers) {
      return 'insufficient-members'
    }

    if (lobby.lobby.canStartActivity) {
      return 'can-start-activity'
    } else {
      return 'cannot-start-activity'
    }
  }

  setAcceptAt(at: number) {
    this.willAccept = true
    this.willAcceptAt = at
  }

  setSearchMatchAt(at: number) {
    this.willSearchMatch = true
    this.willSearchMatchAt = at
  }

  clearAutoAccept() {
    this.willAccept = false
    this.willAcceptAt = -1
  }

  clearAutoSearchMatch() {
    this.willSearchMatch = false
    this.willSearchMatchAt = -1
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export const autoGameflowState = new AutoGameflowState()
