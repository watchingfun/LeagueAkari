<template>
  <NScrollbar style="max-height: 60vh" trigger="none">
    <NCard size="small">
      <template #header><span class="card-header-title">通用</span></template>
      <ControlItem
        class="control-item-margin"
        label="自动切换到对局页面"
        label-description="在进入英雄选择或其他游戏状态时，自动切换到“对局”页面"
        :label-width="320"
      >
        <NSwitch
          size="small"
          :value="coreFunctionality.settings.autoRouteOnGameStart"
          @update:value="(val) => setAutoRouteOnGameStart(val)"
        />
      </ControlItem>
      <ControlItem
        class="control-item-margin"
        label="重生倒计时"
        label-description="在标题栏展示一个距离重生时间的指示器"
        :label-width="320"
      >
        <NSwitch
          size="small"
          :value="respawnTimer.settings.enabled"
          @update:value="(val) => setEnableRespawnTimer(val)"
        />
      </ControlItem>
    </NCard>
    <NCard size="small" style="margin-top: 8px">
      <template #header><span class="card-header-title">战绩页面</span></template>
      <ControlItem
        class="control-item-margin"
        label="更新页面战绩"
        label-description="在对局结束后，主动刷新所有涉及到本次对局的战绩页面。由于服务器的更新延迟，获取到的战绩仍可能非最新"
        :label-width="320"
      >
        <NSwitch
          size="small"
          :value="coreFunctionality.settings.fetchAfterGame"
          @update:value="(val) => setFetchAfterGame(val)"
        />
      </ControlItem>
      <ControlItem
        class="control-item-margin"
        label="战绩页面拉取详细对局"
        label-description="在请求页面战绩列表时，也同时加载所有对局的详细信息"
        :label-width="320"
      >
        <NSwitch
          size="small"
          :value="coreFunctionality.settings.fetchDetailedGame"
          @update:value="(val) => setFetchDetailedGame(val)"
        />
      </ControlItem>
    </NCard>
    <NCard size="small" style="margin-top: 8px">
      <template #header><span class="card-header-title">对局分析</span></template>
      <ControlItem
        class="control-item-margin"
        label="对局战绩分析数量"
        label-description="在对局页面中，用于分析每名玩家的战绩拉取对局数量"
        :label-width="320"
      >
        <NInputNumber
          style="width: 100px"
          size="tiny"
          :min="2"
          :max="200"
          :value="coreFunctionality.settings.matchHistoryLoadCount"
          @update:value="(val) => setMatchHistoryLoadCount(val || 20)"
        />
      </ControlItem>
      <ControlItem
        class="control-item-margin"
        label="预组队判定阈值"
        :label-description="`目标玩家群体出现在同一阵营超过 ${coreFunctionality.settings.preMadeTeamThreshold} 次时，则判定为预组队。不能超过预组队分析样本局数`"
        :label-width="320"
      >
        <NInputNumber
          style="width: 100px"
          size="tiny"
          :min="2"
          :value="coreFunctionality.settings.preMadeTeamThreshold"
          @update:value="(val) => setPreMadeThreshold(val || 3)"
        />
      </ControlItem>
      <ControlItem
        class="control-item-margin"
        label="预组队分析样本局数"
        label-description="为了分析预组队情况而进行的详细对局拉取数量，不能小于预组队判定阈值"
        :label-width="320"
      >
        <NInputNumber
          style="width: 100px"
          size="tiny"
          :min="2"
          :value="coreFunctionality.settings.teamAnalysisPreloadCount"
          @update:value="(val) => setTeamAnalysisPreloadCount(val || 4)"
        />
      </ControlItem>
      <ControlItem
        class="control-item-margin"
        label="对局中请求并发数"
        label-description="在对局分析中，所进行的所有网络请求总并发数限制。它并不会限制其他模块的请求并发数"
        :label-width="320"
      >
        <NInputNumber
          style="width: 100px"
          size="tiny"
          :min="1"
          :value="coreFunctionality.settings.playerAnalysisFetchConcurrency"
          @update:value="(val) => setPlayerAnalysisFetchConcurrency(val || 10)"
        />
      </ControlItem>
    </NCard>
    <NCard size="small" style="margin-top: 8px">
      <template #header><span class="card-header-title">辅助窗口</span></template>
      <ControlItem
        class="control-item-margin"
        label="使用辅助窗口"
        label-description="在一些游戏流程中使用辅助窗口来展示状态以及提供便捷操作"
        :label-width="320"
      >
        <NSwitch
          size="small"
          :value="aux.settings.enabled"
          @update:value="(val) => setAuxiliaryWindowEnabled(val)"
        />
      </ControlItem>
      <ControlItem
        class="control-item-margin"
        label="辅助窗口不透明度"
        label-description="辅助窗口的半透明状态"
        :label-width="320"
      >
        <NSlider
          size=""
          style="width: 120px"
          :min="0.3"
          :max="1"
          :step="0.01"
          :format-tooltip="(v) => `${(v * 100).toFixed()} %`"
          @update:value="(val) => setAuxiliaryWindowOpacity(val)"
          :value="aux.settings.opacity"
        ></NSlider>
      </ControlItem>
      <ControlItem
        class="control-item-margin"
        label="皮肤设置器"
        label-description="在辅助窗口展示一个设置皮肤的快捷入口"
        :label-width="320"
      >
        <NSwitch
          size="small"
          :value="aux.settings.showSkinSelector"
          @update:value="(val) => setShowSkinSelector(val)"
        />
      </ControlItem>
      <ControlItem
        class="control-item-margin"
        label="缩放"
        label-description="可以调整辅助窗口的大小"
        :label-width="320"
      >
        <NInputNumber
          style="width: 100px"
          size="tiny"
          :min="1"
          :max="3"
          step="0.1"
          :value="aux.settings.zoomFactor"
          @update:value="(val) => setZoomFactor(val || 1.0)"
        />
      </ControlItem>
      <ControlItem
        class="control-item-margin"
        label="重设辅助窗口位置"
        label-description="重新设置辅助窗口的位置，还原到默认主屏幕正中心"
        :label-width="320"
      >
        <NButton size="tiny" type="warning" secondary @click="() => resetAuxiliaryWindowPosition()"
          >重设</NButton
        >
      </ControlItem>
    </NCard>
    <NCard size="small" style="margin-top: 8px">
      <template #header
        ><span class="card-header-title" :class="{ disabled: !app.isAdministrator }">{{
          app.isAdministrator ? 'KDA 简报' : 'KDA 简报 (需要管理员权限)'
        }}</span></template
      >
      <ControlItem
        :disabled="!app.isAdministrator"
        class="control-item-margin"
        label="启用 KDA 发送"
        :label-description="`在对局中或英雄选择中，使用 PageUp 发送己方队伍数据，使用 PageDown 发送敌方队伍 KDA 数据。英雄选择中通过聊天室发送。游戏内发送基于模拟键盘实现，因此在发送前，确保游戏内聊天框是关闭状态。游戏内发送途中，按住 Shift 可将信息发送到全局。统计对局的数量为 ${coreFunctionality.settings.matchHistoryLoadCount} 场，等同于对局战绩分析数量`"
        :label-width="320"
      >
        <template #labelDescription="{ disabled }">
          <div :style="{ filter: disabled ? 'brightness(0.6)' : 'unset' }">
            <span style="font-weight: 700; color: rgb(0, 179, 195)">PageUp</span> - 发送友方 KDA
            简报，<span style="font-weight: 700; color: rgb(0, 179, 195)">PageDown</span> - 发送敌方
            KDA 简报<br />
            在英雄选择中时，将通过聊天室发送。在游戏进行中时，将通过模拟键盘输入发送<br />
            <span style="font-style: italic">🚩 在游戏中发送时，确保聊天框处于关闭状态</span><br />
            <span style="font-style: italic"
              >🚩 在游戏中发送时，可在发送全程按住 Shift 将消息发送到全局</span
            ><br />
            <span style="font-style: italic"
              >KDA 分析局数和 <span style="font-weight: 700">对局战绩分析数量</span> 一致。({{
                coreFunctionality.settings.matchHistoryLoadCount
              }}
              场)</span
            >
          </div>
        </template>
        <NSwitch
          :disabled="!app.isAdministrator"
          size="small"
          :value="coreFunctionality.settings.sendKdaInGame"
          @update:value="(val) => setSendKdaInGame(val)"
        />
      </ControlItem>
      <ControlItem
        :disabled="!app.isAdministrator"
        class="control-item-margin"
        label="KDA 发送最低值"
        label-description="仅当需发送对象的 KDA 值大于此值时，才会发送"
        :label-width="320"
      >
        <NInputNumber
          :disabled="!app.isAdministrator"
          style="width: 100px"
          size="tiny"
          :min="0"
          step="0.1"
          :value="coreFunctionality.settings.sendKdaThreshold"
          @update:value="(val) => setSendKdaThreshold(val || 0)"
        />
      </ControlItem>
      <ControlItem
        :disabled="!app.isAdministrator"
        class="control-item-margin"
        label="KDA 发送时附带预组队信息"
        label-description="在发送 KDA 数据时，将可能的预组队信息也一并发送"
        :label-width="320"
      >
        <NSwitch
          :disabled="!app.isAdministrator"
          size="small"
          :value="coreFunctionality.settings.sendKdaInGameWithPreMadeTeams"
          @update:value="(val) => setSendKdaInGameWithPreMadeTeams(val)"
        />
      </ControlItem>
    </NCard>
  </NScrollbar>
</template>

<script setup lang="ts">
import ControlItem from '@shared/renderer/components/ControlItem.vue'
import { useAppStore } from '@shared/renderer/modules/app/store'
import {
  resetAuxiliaryWindowPosition,
  setAuxiliaryWindowEnabled,
  setAuxiliaryWindowOpacity
} from '@shared/renderer/modules/auxiliary-window'
import { setShowSkinSelector, setZoomFactor } from '@shared/renderer/modules/auxiliary-window'
import { useAuxiliaryWindowStore } from '@shared/renderer/modules/auxiliary-window/store'
import {
  setAutoRouteOnGameStart,
  setFetchAfterGame,
  setFetchDetailedGame,
  setMatchHistoryLoadCount,
  setPlayerAnalysisFetchConcurrency,
  setPreMadeThreshold,
  setSendKdaInGame,
  setSendKdaInGameWithPreMadeTeams,
  setSendKdaThreshold,
  setTeamAnalysisPreloadCount
} from '@shared/renderer/modules/core-functionality'
import { useCoreFunctionalityStore } from '@shared/renderer/modules/core-functionality/store'
import { setEnableRespawnTimer } from '@shared/renderer/modules/respawn-timer'
import { useRespawnTimerStore } from '@shared/renderer/modules/respawn-timer/store'
import { NButton, NCard, NInputNumber, NScrollbar, NSlider, NSwitch } from 'naive-ui'

const respawnTimer = useRespawnTimerStore()
const coreFunctionality = useCoreFunctionalityStore()
const aux = useAuxiliaryWindowStore()
const app = useAppStore()
</script>

<style lang="less" scoped>
.control-item-margin {
  &:not(:last-child) {
    margin-bottom: 12px;
  }
}

.card-header-title {
  font-weight: bold;
  font-size: 18px;
}

.card-header-title.disabled {
  color: rgb(97, 97, 97);
}
</style>
