import axios from 'axios'
// tab栏切换
function changeFooter () {
  const lis = document.querySelectorAll('.classify ul li')
  const footers = document.querySelectorAll('.each-show')
  // console.log(lis)
  for (let i = 0; i < lis.length; i++) {
    footers.forEach(function (item, index) {
      item.style.display = 'none'
    })
    footers[0].style.display = 'block'
    lis[i].addEventListener('click', () => {
      if (i === 2) {
        document.querySelector('.web-characteristic').style.height = '980px'
      } else {
        document.querySelector('.web-characteristic').style.height = '680px'
      }
      lis.forEach(function (item, index) {
        item.classList.remove('active')
      })
      footers.forEach(function (item, index) {
        item.style.display = 'none'
      })
      lis[i].classList.add('active')
      footers[i].style.display = 'block'
    })
  }
}

// 获取并渲染城市天气函数
function getWeather (cityCode) {
  // 1.1 获取天气数据
  axios({
    url: 'https://hmajax.itheima.net/api/weather',
    params: {
      city: cityCode
    }
  }).then(result => {
    // console.log(result)
    const weaObj = result.data.data
    // console.log(weaObj)
    const date = new Date(weaObj.date)
    const month = date.getMonth() + 1
    const day = date.getDate()
    // 1.2 数据展示到页面
    // 阳历和农历日期
    const dataStr = `
      <span class="dateShort">${month}月${day}日</span>
      <span class="calendar">农历&nbsp;
          <span class="dateLunar">${weaObj.dateLunar}</span>
      </span>
      `
    document.querySelector('.top-box .title').innerHTML = dataStr
    // 城市名字
    document.querySelector('.area').innerHTML = weaObj.area
    // 当天气温
    const nowWeaStr = `
      <div class="tem-box">
      <span class="temp">
        <span class="temperature">${weaObj.temperature}</span>
        <span>°</span>
      </span>
    </div>
    <div class="climate-box">
      <div class="air">
        <span class="psPm25">${weaObj.psPm25}</span>
        <span class="psPm25Level">${weaObj.psPm25Level}</span>
      </div>
      <ul class="weather-list">
        <li>
          <img src="${weaObj.weatherImg}" class="weatherImg" alt="">
          <span class="weather">${weaObj.weather}</span>
        </li>
        <li class="windDirection">${weaObj.windDirection}</li>
        <li class="windPower">${weaObj.windPower}</li>
      </ul>
    </div>
      `
    document.querySelector('.weather-box').innerHTML = nowWeaStr
    // 当天天气
    const toWeaStr = `
      <div class="range-box">
      <span>今天：</span>
      <span class="range">
        <span class="weather">${weaObj.todayWeather.weather}</span>
        <span class="temNight">${weaObj.todayWeather.temNight}</span>
        <span>-</span>
        <span class="temDay">${weaObj.todayWeather.temDay}</span>
        <span>℃</span>
      </span>
    </div>
    <ul class="sun-list">
      <li>
        <span>紫外线</span>
        <span class="ultraviolet">${weaObj.todayWeather.ultraviolet}</span>
      </li>
      <li>
        <span>湿度</span>
        <span class="humidity">${weaObj.todayWeather.humidity}</span>%
      </li>
      <li>
        <span>日出</span>
        <span class="sunriseTime">${weaObj.todayWeather.sunriseTime}</span>
      </li>
      <li>
        <span>日落</span>
        <span class="sunsetTime">${weaObj.todayWeather.sunsetTime}</span>
      </li>
    </ul>
      `
    document.querySelector('.today-weather').innerHTML = toWeaStr

    // 7日天气预报数据展示
    const dayForecast = weaObj.dayForecast
    document.querySelector('.week-wrap').innerHTML = dayForecast.map(item => {
      return `
          <li class="item">
              <div class="date-box">
                  <span class="dateFormat">${item.dateFormat}</span>
                  <span class="date">${item.date}</span>
              </div>
              <img src="${item.weatherImg}" alt="" class="weatherImg">
              <span class="weather">${item.weather}</span>
              <div class="temp">
                  <span class="temNight">${item.temNight}</span>-
                  <span class="temDay">${item.temDay}</span>
                  <span>℃</span>
              </div>
              <div class="wind">
                  <span class="windDirection">${item.windDirection}</span>
                  <span class="windPower">${item.windPower}</span>
              </div>
          </li>
          `
    }).join('')
  })
}

// 2.1 绑定input事件，获取关键字
function inputCheck () {
  // 控制搜索列表，显示/隐藏
  const searchList = document.querySelector('.search-list')
  // 输入框内容改变时，有城市关键字出现列表，没有则不出现列表
  document.querySelector('.search-city').addEventListener('input', e => {
    if (e.target.value.length > 0) {
      searchList.classList.add('show')
    } else {
      searchList.classList.remove('show')
    }
  })
  // 输入框失焦，隐藏搜索列表
  document.querySelector('.search-city').addEventListener('blur', e => {
    // 延迟消失，保证点击获取到城市code后，再隐藏下拉列表
    setTimeout(() => {
      searchList.classList.remove('show')
    }, 500)
  })
  // 输入框聚焦，显示搜索列表
  document.querySelector('.search-city').addEventListener('focus', e => {
    if (e.target.value.length > 0) {
      searchList.classList.add('show')
    }
  })

  document.querySelector('.search input').addEventListener('input', (e) => {
    console.log(e.target.value)
    // 2.2 获取展示城市列表数据
    axios({
      url: 'http://hmajax.itheima.net/api/weather/city',
      params: {
        city: e.target.value
      }
    }).then(result => {
      console.log(result.data.data)
      const liStr = result.data.data.map(item => {
        return `
            <li class="city-item" data-code="${item.code}">${item.name}</li>
            `
      }).join('')
      console.log(liStr)
      document.querySelector('.search-list').innerHTML = liStr
    })
  })
}

// 3.1 绑定城市点击事件，获取城市code值
function updateCity () {
  document.querySelector('.search-list').addEventListener('click', e => {
    if (e.target.classList.contains('city-item')) {
      // 只有点击城市li才会执行这里的代码
      const cityCode = e.target.dataset.code
      console.log(cityCode)
      getWeather(cityCode)
    }
  })
}
export { changeFooter, getWeather, inputCheck, updateCity }
