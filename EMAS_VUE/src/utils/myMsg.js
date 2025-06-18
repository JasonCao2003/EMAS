import * as echarts from 'echarts'
function dyEchart () {
  const chartDom = document.querySelector('#emoCharts')
  const myChart = echarts.init(chartDom)
  const data = [120, 200, 80, 70, 110, 130]
  const option = {
    grid: {
      x: 50,
      x2: 50
    },
    xAxis: {
      max: 'dataMax'
    },
    yAxis: {
      type: 'category',
      data: [
        '快乐',
        '焦虑',
        '压力',
        '放松',
        '正念',
        '积极'],
      inverse: true,
      animationDuration: 300,
      animationDurationUpdate: 300
    },
    series: [
      {
        realtimeSort: true,
        // name: 'X',
        type: 'bar',
        data: data,
        label: {
          show: true,
          position: 'right',
          valueAnimation: true
        }
      }
    ],
    legend: {
      show: true
    },
    animationDuration: 0,
    animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
  }

  option && myChart.setOption(option)
}

export default dyEchart
