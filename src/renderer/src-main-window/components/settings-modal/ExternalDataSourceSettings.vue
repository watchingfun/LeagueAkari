<template>
  <NScrollbar style="max-height: 60vh" trigger="none">
    <NCard size="small">
      <template #header><span class="card-header-title">基础</span></template>
      <ControlItem
        class="control-item-margin"
        label="自动检查更新"
        label-description="在应用启动时，自动从 Github 拉取最新版本信息"
        :label-width="320"
      >
        <NSwitch
          size="small"
          :value="app.settings.autoCheckUpdates"
          @update:value="(val: boolean) => setAutoCheckUpdates(val)"
        />
      </ControlItem>
      <ControlItem
        class="control-item-margin"
        label="自动连接"
        label-description="存在唯一的客户端时，则自动连接该客户端"
        :label-width="320"
      >
        <NSwitch
          size="small"
          :value="app.settings.autoConnect"
          @update:value="(val: boolean) => setAutoConnect(val)"
        />
      </ControlItem>
      <ControlItem
        class="control-item-margin"
        label="窗口关闭策略"
        label-description="当关闭主窗口时所执行的行为"
        :label-width="320"
      >
        <NSelect
          style="width: 160px"
          size="tiny"
          :value="app.settings.closeStrategy"
          @update:value="(val) => setCloseStrategy(val)"
          :options="closeStrategies"
        />
      </ControlItem>
      <ControlItem
        class="control-item-margin"
        label="使用 WMIC"
        label-description="使用 WMIC 获取客户端命令行信息，而不是默认的 Win32 API 方式"
        :label-width="320"
      >
        <NSwitch
          size="small"
          :value="app.settings.useWmic"
          @update:value="(val: boolean) => setUseWmic(val)"
        />
      </ControlItem>
    </NCard>
  </NScrollbar>
</template>

<script setup lang="ts">
import ControlItem from '@shared/renderer/components/ControlItem.vue'
import {
  setAutoCheckUpdates,
  setAutoConnect,
  setCloseStrategy,
  setUseWmic
} from '@shared/renderer/modules/app'
import { useAppStore } from '@shared/renderer/modules/app/store'
import { NCard, NScrollbar, NSelect, NSwitch } from 'naive-ui'

const app = useAppStore()

const closeStrategies = [
  { label: '最小化到托盘区', value: 'minimize-to-tray' },
  { label: '退出程序', value: 'quit' },
  { label: '每次询问', value: 'unset' }
]
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
</style>
