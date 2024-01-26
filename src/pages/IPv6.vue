<!-- eslint-disable prettier/prettier -->
<script lang="ts" setup>
import { DataTableColumns, NButton } from 'naive-ui'

const firstColumns: DataTableColumns<Scan> = [
  {
    title: 'Scan Date',
    key: 'scandate',
    defaultSortOrder: 'ascend',
    sorter: (row1, row2) => {
      const date1 = row1.scandate
        .split('.')
        .map((e) => e.padStart(3, '0'))
        .join('')
      const date2 = row2.scandate
        .split('.')
        .map((e) => e.padStart(3, '0'))
        .join('')
      return parseFloat(date1) - parseFloat(date2)
    },
    render(row: any) {
      return h('span', {}, { default: () => row?.scandate })
    },
  },
  {
    title: 'Scan Protocal',
    key: 'protocal',
    render(row: any) {
      return h('span', {}, { default: () => row?.protocal || '-' })
    },
  },
  {
    title: 'Scan Range',
    key: 'range',
    render(row: any) {
      return h('span', {}, { default: () => row?.range})
    },
  },
  {
    title: '# Addresses',
    key: 'number',
    render(row: any) {
      return h('span', {}, { default: () => row?.number})
    },
  },
  {
    title: 'File Zise',
    key: 'size',
    render(row: any) {
      return h('span', {}, { default: () => row?.size})
    },
  },
  {
    title: 'File Download',
    key: 'download',
    render(row: any) {
      return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => dow(row?.download)
          },
          { default: () => 'Download' }
    )
    },
  },
]

const middleColumns: DataTableColumns<Scan> = [
  {
    title: 'Detection Date',
    key: 'scandate',
    defaultSortOrder: 'ascend',
    // sorter: 'default',
    sorter: (row1, row2) => {
      const date1 = row1.scandate
        .split('.')
        .map((e) => e.padStart(3, '0'))
        .join('')
      const date2 = row2.scandate
        .split('.')
        .map((e) => e.padStart(3, '0'))
        .join('')
      return parseFloat(date1) - parseFloat(date2)
    },
    render(row: any) {
      return h('span', {}, { default: () => row?.scandate })
    },
  },
  {
    title: 'Detection Protocal',
    key: 'protocal',
    render(row: any) {
      return h('span', {}, { default: () => row?.protocal })
    },
  },
  {
    title: 'Detection Range',
    key: 'range',
    render(row: any) {
      return h('span', {}, { default: () => row?.range })
    },
  },
  {
    title: '# Prefixes',
    key: 'number',
    render(row: any) {
      return h('span', {}, { default: () => row?.number })
    },
  },
  {
    title: 'File Size',
    key: 'size',
    render(row: any) {
      return h('span', {}, { default: () => row?.size })
    },
  },
  {
    title: 'File Download',
    key: 'download',
    render(row: any) {
      // return h('span', {}, { default: () => row?.accuracy })
      return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => dow(row?.download)
          },
          { default: () => 'Download' }
    )},
  },
]

const secondColumns: DataTableColumns<Scan> = [
  {
    title: 'Scanner',
    key: 'scandate',
    render(row: any) {
      return h('span', {}, { default: () => row?.scandate })
    },
  },
  {
    title: 'Description',
    key: 'protocal',
    render(row: any) {
      return h('span', {}, { default: () => row?.protocal })
    },
  },
  {
    title: 'Download',
    key: 'download',
    render(row: any) {
      return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => dow(row?.download)
          },
          { default: () => 'Repository' }
    )},
  },
]

function dow(url: string){
  window.location.href = url
}

const firstPagination = reactive({
  page: 1,
  pageSize: 10,
  onChange: (page: number) => {
    firstPagination.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    firstPagination.pageSize = pageSize
    firstPagination.page = 1
  },
})
const secondPagination = reactive({
  page: 1,
  pageSize: 10,
  onChange: (page: number) => {
    secondPagination.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    secondPagination.pageSize = pageSize
    secondPagination.page = 1
  },
})
const middlePagination = reactive({
  page: 1,
  pageSize: 10,
  onChange: (page: number) => {
    middlePagination.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    middlePagination.pageSize = pageSize
    middlePagination.page = 1
  },
})



type Scan1 = {
  scandate: string
  protocal: string
  range: string
  number: string
  size: string
  download: string
}

type Scan2 = {
  scandate: string
  protocal: string
  range: string
  number: string
  size: string
  download: string
}

type Scan3 = {
  scandate: string
  protocal: string
  download: string
}

const Data1: Scan1[] = [
  {scandate: '2024/01/13', protocal: 'ICMPv6', range: 'Global', number: '42.43M', size: '270M', download: 'http://175.6.54.250/H-hitlists_non-alias.zip'}
]

const Data2: Scan2[] = [
  { scandate: '2024/01/13', protocal: 'ICMPv6',  range: 'Global', number: '1.24M (/28 ~ 120 prefix len)', size: '5.3M', download: 'http://175.6.54.250/aliased_prefixes_20231229.zip'}
]

const Data3: Scan3[] = [
  { scandate: '6Scan', protocal: 'IPv6 efficient scanner integrates multiple search strategies such as HMap6, 6Scan, 6Hit+, 6Tree+, and 6Gen+', download: 'http://github.com/hbn1987/6Scan.git'},
]
</script>

<template>
  <div class="animation">
    <div flex="~" justify="between" align="items-baseline" p="b-6" text="white">
      <div flex="~" align="items-center">
        <b p="x-2" text="4xl" font="semibold">''</b>
      </div>
      <div flex="~ gap-2" align="items-center"></div>
    </div>
    <div>
      <div flex="~ gap-6" justify="between" m="y-6">
        <div
          flex="column"
          p="4"
          bg="white"
          border="rounded-sm"
          class="custom-shadow"
        >
          <div
            flex="~ auto"
            align="items-center"
            justify="center"
            border="rounded-sm"
          >
            <b text="base" font="semibold">Scanner Running Example</b>
          </div>
          <div
            flex="~ auto"
            align="items-center"
            justify="end"
            border="rounded-sm"
          >
            <span><img src="~@/assets/run-chart.gif" /></span>
          </div>
        </div>
        <!-- DNS分类 -->
        <div
          flex="column"
          p="4"
          bg="white"
          border="rounded-sm"
          class="custom-shadow"
        >
          <div
            flex="~ auto"
            align="items-center"
            justify="center"
            border="rounded-sm"
          >
            <b text="base" font="semibold">Active Address Distribution</b>
          </div>
          <div
            flex="~ auto"
            align="items-center"
            justify="center"
            border="rounded-sm"
          >
            <img src="~@/assets/worldmap.png" />
          </div>
        </div>
      </div>
      <!-- 上表 -->
      <div m="y-8" bg="white" border="rounded-sm" class="custom-shadow">
        <div flex="~" justify="between" align="items-center" p="4">
          <b text="base" font="semibold">Historical Scan Results</b>
          <!-- <n-button type="primary" size="small" @click="exportResult"
            >导出数据</n-button
          > -->
        </div>
        <n-divider m="!y-0" />
        <n-data-table
          :single-line="false"
          :bordered="false"
          :columns="firstColumns"
          :data="Data1"
          :pagination="firstPagination"
        />
      </div>
      <!-- 中表 -->
      <div m="y-8" bg="white" border="rounded-sm" class="custom-shadow">
        <div flex="~" justify="between" align="items-center" p="4">
          <b text="base" font="semibold">Detected Alias Prefixes</b>
          <!-- <n-button type="primary" size="small" @click="handlers.exportResult"
          >导出数据</n-button
        > -->
        </div>
        <n-divider m="!y-0" />
        <n-data-table
          :single-line="false"
          :bordered="false"
          :columns="middleColumns"
          :data="Data2"
          :pagination="middlePagination"
        />
      </div>
      <!-- 下表 -->
      <div m="y-8" bg="white" border="rounded-sm" class="custom-shadow">
        <div flex="~" justify="between" align="items-center" p="4">
          <b text="base" font="semibold">Scan Tool Download</b>
        </div>
        <n-divider m="!y-0" />
        <n-data-table
          :single-line="false"
          :bordered="false"
          :columns="secondColumns"
          :data="Data3"
          :pagination="secondPagination"
        />
      </div>
    </div>
  </div>
</template>
