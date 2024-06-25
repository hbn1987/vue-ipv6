<template>
  <div class="screen-bg">
    <iframe
      frameborder="0"
      :src="iframeSrc"
      style="width: 100%; height: 100%; z-index: -20"
    ></iframe>
    <div class="container" ref="dataScreenRef">
      <div class="header">
        <div class="date">
          {{ currentDate }}
        </div>
        <div class="title">
          Global IPv6 Network Asset Distribution Dashboard<br />
          <span class="chinese">全球IPv6网络资产分布</span>
        </div>
      </div>

      <div class="body">
        <div class="left" style="flex: 0 1 30%">
          <border-box1
            style="width: 100%; height: 50%; overflow: hidden"
            ref="borderRef"
          >
            <div style="width: 90%; margin: 0 auto; text-align: center">
              <div class="subtitle">Top10 Country</div>
              <scroll-ranking-board
                :config="topCountryData"
                style="
                  width: 100%;
                  height: 400px;
                  position: relative;
                  top: 18px;
                "
              />
            </div>
          </border-box1>
          <border-box1
            style="
              width: 100%;
              height: 50%;
              overflow: hidden;
              display: inline-block;
            "
            ref="borderRef"
          >
            <div style="width: 90%; margin: 0 auto; text-align: center">
              <div class="subtitle">Top10 AS</div>
              <scroll-ranking-board
                :config="topASData"
                style="
                  width: 100%;
                  height: 400px;
                  position: relative;
                  top: 18px;
                "
              />
            </div>
          </border-box1>
        </div>
        <div class="central" style="flex: 0 1 60%">
          <border-box1 ref="borderRef">
            <div class="mapBox">
              <img class="imgItem1" src="@/assets/mapImg/lbx.png" />
              <img class="imgItem2" src="@/assets/mapImg/jt.png" alt="" />
              <img class="imgItem3" src="@/assets/mapImg/map.png" alt="" />
              <div
                style="width: 95%; height: 80%; position: absolute"
                id="map"
              />
            </div>
          </border-box1>
        </div>
        <div
          class="right"
          style="
            flex: 0 1 30%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          "
        >
          <border-box1
            ref="borderRef"
            style="width: 100%; height: 30%; overflow: hidden"
          >
            <div
              id="echart1"
              style="
                width: 90%;
                height: 85%;
                margin: 0 auto;
                position: relative;
                top: 20px;
                left: 15px;
              "
            ></div>
          </border-box1>
          <border-box1
            ref="borderRef"
            style="width: 100%; height: 30%; overflow: hidden"
          >
            <div
              id="echart2"
              style="
                width: 90%;
                height: 85%;
                margin: 0 auto;
                position: relative;
                top: 20px;
                left: 15px;
              "
            ></div>
          </border-box1>
          <border-box1
            ref="borderRef"
            style="
              width: 100%;
              height: 40%;
              overflow: hidden;
              position: relative;
            "
          >
            <div
              style="
                width: 90%;
                margin: 0 auto;
                text-align: center;
                position: relative;
              "
            >
              <div
                class="subtitle"
                style="
                  position: absolute;
                  top: -40px;
                  left: 50%;
                  transform: translateX(-50%);
                "
              >
                Monthly Scan Results
              </div>
              <n-config-provider :theme-overrides="themeOverrides">
                <n-data-table
                  :single-line="true"
                  :bordered="true"
                  :columns="table"
                  :data="scanInfoData"
                  :pagination="Pagination"
                />
              </n-config-provider>
            </div>
            <div class="goto-button" @click="goto">HMap Repository</div>
          </border-box1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import { init, EChartsOption } from 'echarts'
import { BorderBox1, ScrollRankingBoard } from '@kjgl77/datav-vue3'
import { DataTableColumns, NButton, NConfigProvider } from 'naive-ui'

import worldmapJson from '@/assets/modules/worldmap.json'
import ISO2Json from '@/assets/modules/ISO2.json'

//引入数据
import topCountry from '@/data/topCountry.json'
import topAS from '@/data/topAS.json'
import countryAsset from '@/data/countryAsset.json'
import assetType from '@/data/assetType.json'
import monthlyScan from '@/data/monthlyScan.json'
import scanInfo from '@/data/scanInfo.json'

// 获取当前时间
const currentDate = ref('')
// const a = ['日', '一', '二', '三', '四', '五', '六']
// const week = ref<number>(0)
// const str = ref('')
setInterval(() => {
  currentDate.value = new Date().toLocaleString()
  // week.value = new Date().getDay()
  // str.value = '今天是星期' + a[week.value]
}, 1000)

// 获取自适应的盒子
const dataScreenRef = ref<HTMLElement | null>(null)
//粒子效果html的地址
const iframeSrc = ref('http://175.6.54.250/bg.html')
// 左上top国家排行
const topCountryData = ref(topCountry)
// 左下top自治域排行
const topASData = ref(topAS)
//地图数据
const countryAssetData = ref(countryAsset)
//右上IPv6各类型资产数量
const assetTypeData = ref(assetType)
//右中每月探测数量
const monthlyScanData = ref(monthlyScan)
const scanInfoData = ref(scanInfo)

// 页面跳转
let Url = 'https://github.com/hbn1987/6Scan'
const goto = () => {
  window.open(Url)
}

onMounted(() => {
  //根据当前访问的域名动态修改粒子效果的地址协议
  if (location.protocol === 'http:') {
    iframeSrc.value = 'http://175.6.54.250/bg.html'
  } else {
    iframeSrc.value = 'https://175.6.54.250/bg.html'
  }
  // 初始化时为外层盒子加上缩放属性，防止刷新界面时就已经缩放
  if (dataScreenRef.value) {
    dataScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
    dataScreenRef.value.style.width = '1920px'
    dataScreenRef.value.style.height = '1080px'
  }
  // 初始化echarts
  initChart()
  initChart1()
  initChart2()
  // 为浏览器绑定事件
  window.addEventListener('resize', resize)
})

// 根据浏览器大小推断缩放比例
const getScale = (width = 1920, height = 1080) => {
  let ww = window.innerWidth / width
  let wh = window.innerHeight / height
  return ww < wh ? ww : wh
}

// 监听浏览器 resize 事件
const resize = () => {
  if (dataScreenRef.value) {
    dataScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
  }
}

// 地图echarts
function initChart() {
  const myChart = init(document.getElementById('map') as HTMLDivElement)
  let nameMap = ISO2Json.nameMap

  echarts.registerMap('world', worldmapJson as any)
  const option = <EChartsOption>{
    title: {
      text: countryAssetData.value.title,
      // subtext: '',
      x: 'center',
      textStyle: {
        color: '#ffffff',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: 18,
        fontWeight: 'bold',
      },
    },
    backgroundColor: 'transparent',
    //左侧小导航图标
    visualMap: {
      min: 0,
      max: 600,
      text: ['高', '低'],
      inRange: {
        color: ['#D8FAFE', '#006EDD'],
      },
      textStyle: {
        color: '#ffffff',
      },
    },
    series: [
      {
        name: 'worldmap',
        type: 'map',
        top: 200,
        mapType: 'world',
        label: {
          normal: {
            show: false,
            textStyle: {
              color: '#fff',
              fontSize: 15,
            },
          },
          emphasis: {
            textStyle: {
              color: '#fff',
            },
          },
        },
        itemStyle: {
          normal: {
            // borderWidth: 1.5,
            areaColor: '#4c60ff',
            borderColor: '#002097',
          },
          emphasis: {
            areaColor: '#293fff',
            borderWidth: 0,
            color: 'green',
          },
        },
        zoom: 1.2,
        roam: true,
        nameMap: nameMap,
        data: countryAssetData.value.data,
      },
    ],
    tooltip: {
      formatter: function (val: { data: { name: string; value: number } }) {
        if (val.data == null) return
        return val.data.name + ': ' + val.data.value
      },
    },
  }
  myChart.setOption(option)
  window.addEventListener('resize', function () {
    myChart.resize()
  })
}

// 右上设备类型数量
function initChart1() {
  const myChart = init(document.getElementById('echart1') as HTMLDivElement)
  let option = {
    title: {
      text: assetTypeData.value.title,
      // subtext: '',
      x: 'center',
      textStyle: {
        color: '#ffffff',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: 18,
        fontWeight: 'bold',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: [
      {
        type: 'category',
        data: assetTypeData.value.data.map((item) => item.label),
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,.1)',
            width: 1,
            type: 'solid',
          },
        },

        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          show: true,
          splitNumber: 15,
          textStyle: {
            color: 'rgba(255,255,255,.6)',
            fontSize: '12',
          },
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          formatter: '{value}',
          show: true,
          textStyle: {
            color: 'rgba(255,255,255,.6)',
            fontSize: '12',
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,.1	)',
            width: 1,
            type: 'solid',
          },
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.1)',
          },
        },
      },
    ],
    series: [
      {
        type: 'bar',
        data: assetTypeData.value.data.map((item) => item.value),
        barWidth: '35%', //柱子宽度
        itemStyle: {
          normal: {
            color: '#27d08a',
            opacity: 1,
            barBorderRadius: 5,
          },
        },
      },
    ],
  }

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option as EChartsOption)
}

// 右中折线图
function initChart2() {
  const myChart = init(document.getElementById('echart2') as HTMLDivElement)
  let option = {
    title: {
      text: monthlyScanData.value.title,
      // subtext: '',
      x: 'center',
      textStyle: {
        color: '#ffffff',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: 18,
        fontWeight: 'bold',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: '#dddc6b',
        },
      },
    },
    legend: {
      top: '10%', // 下移的位置
      orient: 'vertical',
      x: 'center', // 图例居中
      data: monthlyScanData.value.legendLabel,
      textStyle: {
        color: 'rgba(255,255,255,.5)',
        fontSize: '12',
      },
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisLabel: {
          textStyle: {
            color: 'rgba(255,255,255,.6)',
            fontSize: 12,
          },
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.2)',
          },
        },

        data: monthlyScanData.value.data.map((item) => item.label),
      },
      {
        axisPointer: { show: false },
        axisLine: { show: false },
        position: 'bottom',
        offset: 20,
      },
    ],

    yAxis: [
      {
        type: 'value',
        axisTick: { show: false },
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.1)',
          },
        },
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: 'rgba(255,255,255,.6)',
            fontSize: 12,
          },
        },

        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.1)',
          },
        },
      },
    ],
    series: [
      {
        name: monthlyScanData.value.legendLabel[0],
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          normal: {
            color: '#0184d5',
            width: 2,
          },
        },
        areaStyle: {
          normal: {
            color: new (echarts as any).graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(1, 132, 213, 0.4)',
                },
                {
                  offset: 0.8,
                  color: 'rgba(1, 132, 213, 0.1)',
                },
              ],
              false
            ),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
          },
        },
        itemStyle: {
          normal: {
            color: '#0184d5',
            borderColor: 'rgba(221, 220, 107, .1)',
            borderWidth: 12,
          },
        },
        data: monthlyScanData.value.data.map((item) => item.value),
      },
    ],
  }

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option as EChartsOption)
}

const table: DataTableColumns<Scan> = [
  {
    title: 'Scan Date',
    key: 'scandate',
    render(row: any) {
      return h('span', {}, { default: () => row?.scandate })
    },
  },
  {
    title: '# Addresses',
    key: 'number',
    render(row: any) {
      return h('span', {}, { default: () => row?.number })
    },
  },
  {
    title: 'File Sise',
    key: 'size',
    render(row: any) {
      return h('span', {}, { default: () => row?.size })
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
          onClick: () => dow(row?.download),
        },
        { default: () => 'Download' }
      )
    },
  },
]

function dow(url: string) {
  window.location.href = url
}

const Pagination = reactive({
  page: 1,
  pageSize: 3,
  onChange: (page: number) => {
    Pagination.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    Pagination.pageSize = pageSize
    Pagination.page = 1
  },
})

// 表格样式
const themeOverrides = ref({
  DataTable: {
    thColor: 'rgba(0, 0, 0, 0)', // Header background color
    tdColor: 'rgba(0, 0, 0, 0)', // Cell background color
    thTextColor: 'rgba(255, 255, 255, 1)', // Header text color
    tdTextColor: 'rgba(255, 255, 255, 1)', // Cell text color
    borderColor: 'rgba(255, 255, 255, 0.6)', // Border color
    tdColorHover: 'rgba(11, 33, 135, 0.3)', // Cell background color on hover
  },
  Button: {
    color: 'rgba(0, 0, 0, 0)', // 设置背景颜色
    textColor: '#FFFFFF', // 设置文字颜色
    colorHover: 'rgba(11, 33, 135, 1)', // 设置悬停时的背景颜色
    textColorHover: '#FFFFFF', // 设置悬停时的文字颜色
    colorPressed: '#0A1C73', // 设置按下时的背景颜色
    textColorPressed: '#FFFFFF', // 设置按下时的文字颜色
  },
  Pagination: {
    itemTextColor: 'rgba(255, 255, 255, 1)', // Text color for pagination items
    itemTextColorHover: 'rgba(255, 255, 255, 0.8)', // Text color when hovering over pagination items
    itemTextColorPressed: 'rgba(255, 255, 255, 0.6)', // Text color when pagination item is pressed
    itemTextColorActive: 'rgba(255, 255, 255, 1)', // Text color for active pagination item
    itemBackgroundColor: 'rgba(0, 0, 0, 0)', // Background color for pagination items
    itemBackgroundColorHover: 'rgba(0, 0, 0, 0.1)', // Background color when hovering over pagination items
    itemBackgroundColorPressed: 'rgba(0, 0, 0, 0.2)', // Background color when pagination item is pressed
    itemBackgroundColorActive: 'rgba(0, 0, 0, 0.3)', // Background color for active pagination item
    itemBorderColor: 'rgba(255, 255, 255, 0.6)', // Border color for pagination items
    itemBorderColorHover: 'rgba(255, 255, 255, 0.8)', // Border color when hovering over pagination items
    itemBorderColorPressed: 'rgba(255, 255, 255, 1)', // Border color when pagination item is pressed
    itemBorderColorActive: 'rgba(255, 255, 255, 1)', // Border color for active pagination item
    arrowColor: 'rgba(255, 255, 255, 1)', // Arrow color
    arrowColorHover: 'rgba(255, 255, 255, 0.8)', // Arrow color on hover
    arrowColorPressed: 'rgba(255, 255, 255, 0.6)', // Arrow color when pressed
    arrowColorDisabled: 'rgba(255, 255, 255, 0.3)', // Arrow color when disabled
  },
})
</script>

<style scoped lang="scss">
// 背景
.screen-bg {
  width: 100vw;
  height: 100vh;
  .light {
    width: 40px;
    height: 30px;
    position: absolute;
    top: 37px;
    right: 50px;
    z-index: 99999;
    transform: translate(-50%, -50%);
    /* width: fit-content; */
    text-align: center;
    line-height: 30px;
    color: #ffffff;
    font-size: 20px;
    text-transform: uppercase;
    transition: 0.5s;
    letter-spacing: 4px;
    cursor: pointer;
    overflow: hidden;
  }

  .light:hover {
    background-color: #ffffff;
    color: #050801;
    box-shadow: 0 0 5px #ffffff, 0 0 25px #ffffff, 0 0 50px #ffffff,
      0 0 200px #ffffff;
  }

  .light div {
    position: absolute;
  }

  .light div:nth-child(1) {
    width: 100%;
    height: 2px;
    top: 0;
    left: -100%;
    background: linear-gradient(to right, transparent, #ffffff);
    animation: animate1 1s linear infinite;
  }

  .light div:nth-child(2) {
    width: 2px;
    height: 100%;
    top: -100%;
    right: 0;
    background: linear-gradient(to bottom, transparent, #ffffff);
    animation: animate2 1s linear infinite;
    animation-delay: 0.25s;
  }

  .light div:nth-child(3) {
    width: 100%;
    height: 2px;
    bottom: 0;
    right: -100%;
    background: linear-gradient(to left, transparent, #ffffff);
    animation: animate3 1s linear infinite;
    animation-delay: 0.5s;
  }

  .light div:nth-child(4) {
    width: 2px;
    height: 100%;
    bottom: -100%;
    left: 0;
    background: linear-gradient(to top, transparent, #ffffff);
    animation: animate4 1s linear infinite;
    animation-delay: 0.75s;
  }

  @keyframes animate1 {
    0% {
      left: -100%;
    }

    50%,
    100% {
      left: 100%;
    }
  }

  @keyframes animate2 {
    0% {
      top: -100%;
    }

    50%,
    100% {
      top: 100%;
    }
  }

  @keyframes animate3 {
    0% {
      right: -100%;
    }

    50%,
    100% {
      right: 100%;
    }
  }

  @keyframes animate4 {
    0% {
      bottom: -100%;
    }

    50%,
    100% {
      bottom: 100%;
    }
  }
  // 中心容器
  .container {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 999;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: all 0.3s;
    transform-origin: left top;
    /*!* 设置一个最小的宽度 *!*/
    min-width: 1800px;
    /* 设置一个最大的宽度 */
    max-width: 1800px;
    margin: 0 auto;
    padding-top: 10px;

    .header {
      position: relative;
      /*height: 5.2rem;*/
      height: 77px;
      margin-bottom: 10px;
      background-image: url('@/assets/mapImg/header.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;

      .date {
        position: absolute;
        left: 135px;
        top: 55%;
        transform: translateY(-50%);
        font-family: FZHei-B01S, Arial, sans-serif;
        font-size: 20px;
        color: rgb(255, 255, 255);
        font-weight: normal;
        justify-content: center;
        text-align: center;
      }

      .title {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-family: FZHei-B01S, Arial, sans-serif;
        font-size: 30px;
        color: rgb(255, 255, 255);
        font-weight: normal;
        justify-content: center;
        text-align: center;
      }

      .chinese {
        font-size: smaller;
        display: block; /* Ensures it appears on a new line */
      }
    }

    .body {
      height: 100%;
      display: flex;
      justify-content: space-between;
      .goto-button {
        position: absolute;
        right: 20px;
        bottom: 20px;
        padding: 10px 20px;
        border: none;
        background-color: 'rgba(0, 0, 0, 0)'; /* 蓝色背景 */
        color: #ffffff; /* 白色文字 */
        border-radius: 5px; /* 圆角边框 */
        cursor: pointer; /* 鼠标悬停时的手形图标 */
        transition: background-color 0.3s; /* 鼠标悬停时背景颜色变化的过渡效果 */
        z-index: 999;
      }
      .goto-button:hover {
        background-color: rgb(11, 33, 135); /* 鼠标悬停时的背景颜色 */
      }
      .subtitle {
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 18px;
        font-family: Arial, Helvetica, sans-serif;
        color: rgb(255, 255, 255);
        font-weight: bold;
        justify-content: center;
        text-align: center;
      }
    }
  }

  .mapBox {
    width: 100%;
    height: 100%;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;

    .imgItem1 {
      width: 90%;
      height: 80%;
      position: absolute;
      animation: rotate 10s linear infinite;
    }

    .imgItem2 {
      /*width: 90%;*/
      /*height: 80%;*/
      position: absolute;
      animation: rotate2 10s linear infinite;
    }

    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }
    @keyframes rotate2 {
      100% {
        transform: rotate(-360deg);
      }
    }
  }
  ::v-deep .dv-border-box-1 .border-box-content {
    display: flex !important;
    align-items: center !important;
  }
}
</style>
