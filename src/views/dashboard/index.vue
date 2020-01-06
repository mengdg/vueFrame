/* eslint-disable vue/require-v-for-key */
/* eslint-disable vue/require-v-for-key */
<template>
  <div class="dashboard-container dashboardbox">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <el-row class="top" :gutter="20">
      <el-col :span="6">
        <div class="toplabel">
          <div class="titlebox">
            <p class="title">
              <span class="title-text">实时监控</span>
              <i class="title-icon el-icon-warning-outline" title="提示信息~" />
            </p>
          </div>
          <div class="contentbox">
            <p class="content">
              888888
              <span class="unit">/台</span>
            </p>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="toplabel">
          <div class="titlebox">
            <p class="title">
              <span class="title-text">实时监控</span>
              <i class="title-icon el-icon-warning-outline" title="提示信息~" />
            </p>
          </div>
          <div class="contentbox">
            <p class="content">
              888888
              <span class="unit">/台</span>
            </p>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="toplabel">
          <div class="titlebox">
            <p class="title">
              <span class="title-text">实时监控</span>
              <i class="title-icon el-icon-warning-outline" title="提示信息~" />
            </p>
          </div>
          <div class="contentbox">
            <p class="content">
              888888
              <span class="unit">/台</span>
            </p>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="toplabel">
          <div class="titlebox">
            <p class="title">
              <span class="title-text">实时监控</span>
              <i class="title-icon el-icon-warning-outline" title="提示信息~" />
            </p>
          </div>
          <div class="contentbox">
            <p class="content">
              888888
              <span class="unit">/台</span>
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="middle">
      <div class="filterbox">
        <div class="datatype">
          <ul>
            <li :class="{'active':active}">销售额</li>
            <li :class="{'active':!active}">访问量</li>
          </ul>
        </div>
        <div class="datatime">
          <ul>
            <li
              v-for="(item,index) in aDataTime"
              :key="index"
              :class="{'active':datatimeCheck === index}"
              @click="checkdatatime(item,index)"
            >{{ item.label }}</li>
          </ul>
          <div class="datepickerbox">
            <el-date-picker
              v-model="value1"
              type="daterange"
              size="mini"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>
        </div>
      </div>
      <div class="meta" />
      <div class="chartsbox1">
        <el-col :span="18">
          <div id="chart_example" style="width:100%;height:370px" />
        </el-col>
        <el-col :span="6" class="rightlist">
          <p class="smalltitle">
            <b>门店销售排名</b>
          </p>
          <ul>
            <li v-for="(item,index) in aListData" :key="index" class="fl">
              <div class="fl">
                <span class="serial" :class="{'top-tree':index<3}">{{ index + 1 }}</span>
                <span>{{ item.name }}</span>
              </div>
              <div class="fr">
                <span>{{ threeCutNum(item.value) }}</span>
              </div>
            </li>
          </ul>
        </el-col>
      </div>
    </el-row>
    <el-row class="bottom" :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>线上热门搜索</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div class="text item" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>销售额类别占比</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div class="text item" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  data() {
    return {
      active: true,
      datatimeCheck: null,
      aDataTime: [
        {
          label: '今日',
        },
        {
          label: '本周',
        },
        {
          label: '本月',
        },
        {
          label: '本年'
        },
      ],
      // 时间范围
      value1: '',
      aListData: [
        {
          name: '工专路0号店',
          value: 323234,
        },
        {
          name: '工专路0号店',
          value: 323234,
        },
        {
          name: '工专路0号店',
          value: 323234,
        },
        {
          name: '工专路0号店',
          value: 323234
        },
        {
          name: '工专路0号店',
          value: 323234,
        },
        {
          name: '工专路0号店',
          value: 323234,
        },
        {
          name: '工专路0号店',
          value: 323234,
        },
      ]
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  mounted() {
    console.log(22222)
    this.drawBar()
  },
  methods: {
    // 三位分割数字函数
    threeCutNum(s) {
      s = String(s)
      if (/[^0-9\.]/.test(s)) return 'invalid value'
      s = s.replace(/^(\d*)$/, '$1.')
      s = (s + '00').replace(/(\d*\.\d\d)\d*/, '$1') // 自动补小数点后两位
      s = s.replace('.', ',')
      var re = /(\d)(\d{3},)/
      while (re.test(s)) { s = s.replace(re, '$1,$2') }
      s = s.replace(/,(\d\d)$/, '.$1')
      return s.replace(/^\./, '0.')
    },
    // 时间范围选择事件
    checkdatatime(item, index) {
      this.datatimeCheck = index
    },
    // 柱状图
    drawBar() {
      var myChart = this.$echarts.init(
        document.getElementById('chart_example')
      )
      console.log(myChart)
      const option = {
        color: ['#58a2f8'],
        title: {
          text: '销售趋势',
          textStyle: {
            fontSize: 14
          },
          left: '24px',
          top: '20px'
        },
        grid: {
          left: '5%',
          right: '5%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: [
              '1月',
              '2月',
              '3月',
              '4月',
              '5月',
              '6月',
              '7月',
              '8月',
              '9月',
              '10月',
              '11月',
              '12月'
            ],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '每月花费',
            type: 'bar',
            barWidth: '60%',
            data: [995, 666, 444, 858, 654, 236, 645, 546, 846, 225, 547, 356]
          }
        ]
      }
      myChart.setOption(option)

      // 建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 24px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
