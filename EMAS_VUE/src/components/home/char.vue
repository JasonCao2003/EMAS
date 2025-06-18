<template>
  <section class="web-characteristic">
    <!-- 选项栏 -->
    <nav class="classify">
      <ul>
        <li class="active">
          互动对话
          <br />
          <span style="font-size: 16px;">Interactive conversations</span>
        </li>
        <li>
          文章推荐
          <br />
          <span style="font-size: 16px;">Article recommendation</span>
        </li>
        <li>
          天气指南
          <br />
          <span style="font-size: 16px;">Weather guide</span>
        </li>
        <li>
          情绪记录
          <br />
          <span style="font-size: 16px;">Mood recording</span>
        </li>
      </ul>
    </nav>
    <!-- 展示栏 -->
    <main class="classify-show">
      <ul>
        <!-- 互动对话 -->
        <li class="each-show Interactive-conversations">
          <div class="eveImg">
            <div class="image">
              <img src="@/assets/home/char/psychology.jpg" alt />
              <span>心理咨询</span>
            </div>
            <div class="image">
              <img src="@/assets/home/char/keyboard.jpg" alt />
              <span>文字</span>
            </div>
            <div class="image">
              <img src="@/assets/home/char/microphone.jpg" alt />
              <span>录音</span>
            </div>
            <div class="image">
              <img src="@/assets/home/char/photo.jpg" alt />
              <span>图片</span>
            </div>
          </div>
        </li>
        <!-- 文章推荐 -->
        <li class="each-show">文章推荐</li>
        <!-- 天气指南 -->
        <li class="each-show Weather-guide">
          <!-- 顶部 -->
          <div class="top-box">
            <div class="title">
              <span class="dateShort">10月28日</span>
              <span class="calendar">
                农历&nbsp;
                <span class="dateLunar">十月初四</span>
              </span>
            </div>
            <div class="search-box">
              <div class="location">
                <img src="@/assets/weatherImgs/定位.png" alt />
                <span class="area">城市名</span>
              </div>
              <!-- 搜索框+搜索列表 -->
              <div class="search">
                <input type="text" class="search-city" placeholder="搜索城市" />
                <ul class="search-list">
                  <li class="city-item">北京市</li>
                </ul>
              </div>
            </div>
          </div>
          <!-- 当前天气 -->
          <div class="weather-box">
            <div class="tem-box">
              <span class="temp">
                <span class="temperature">12</span>
                <span>°</span>
              </span>
            </div>
            <div class="climate-box">
              <div class="air">
                <span class="psPm25">55</span>
                <span class="psPm25Level">良</span>
              </div>
              <ul class="weather-list">
                <li>
                  <img src="@/assets/weatherImgs/小雨-line.png" class="weatherImg" alt />
                  <span class="weather">多云</span>
                </li>
                <li class="windDirection">东南风</li>
                <li class="windPower">2级</li>
              </ul>
            </div>
          </div>
          <!-- 今日详细天气 -->
          <div class="today-weather">
            <div class="range-box">
              <span>今天：</span>
              <span class="range">
                <span class="weather">晴</span>
                <span class="temNight">9</span>
                <span>-</span>
                <span class="temDay">14</span>
                <span>℃</span>
              </span>
            </div>
            <ul class="sun-list">
              <li>
                <span>紫外线</span>
                <span class="ultraviolet">强</span>
              </li>
              <li>
                <span>湿度</span>
                <span class="humidity">53</span>%
              </li>
              <li>
                <span>日出</span>
                <span class="sunriseTime">06:38</span>
              </li>
              <li>
                <span>日落</span>
                <span class="sunsetTime">17:18</span>
              </li>
            </ul>
          </div>
          <!-- 周天气预报 -->
          <div class="week-weather-box">
            <div class="title">7日内天气预报</div>
            <ul class="week-wrap">
              <li class="item">
                <div class="date-box">
                  <span class="dateFormat">今天</span>
                  <span class="date">10月28日</span>
                </div>
                <img src="@/assets/weatherImgs/多云.png" alt class="weatherImg" />
                <span class="weather">多云</span>
                <div class="temp">
                  <span class="temNight">12</span>-
                  <span class="temDay">12</span>
                  <span>℃</span>
                </div>
                <div class="wind">
                  <span class="windDirection">东南风</span>
                  <span class="windPower">&lt;3级</span>
                </div>
              </li>
              <li class="item">
                <div class="date-box">
                  <span class="dateFormat">今天</span>
                  <span class="date">10月28日</span>
                </div>
                <img src="@/assets/weatherImgs/多云.png" alt class="weatherImg" />
                <span class="weather">多云</span>
                <div class="temp">
                  <span class="temDay">12</span>-
                  <span class="temNight">12</span>
                  <span>℃</span>
                </div>
                <div class="wind">
                  <span class="windDirection">东南风</span>
                  <span class="windPower">&lt;3级</span>
                </div>
              </li>
              <li class="item">
                <div class="date-box">
                  <span class="dateFormat">今天</span>
                  <span class="date">10月28日</span>
                </div>
                <img src="@/assets/weatherImgs/多云.png" alt class="weatherImg" />
                <span class="weather">多云</span>
                <div class="temp">
                  <span class="temDay">12</span>-
                  <span class="temNight">12</span>
                  <span>℃</span>
                </div>
                <div class="wind">
                  <span class="windDirection">东南风</span>
                  <span class="windPower">&lt;3级</span>
                </div>
              </li>
              <li class="item">
                <div class="date-box">
                  <span class="dateFormat">今天</span>
                  <span class="date">10月28日</span>
                </div>
                <img src="@/assets/weatherImgs/多云.png" alt class="weatherImg" />
                <span class="weather">多云</span>
                <div class="temp">
                  <span class="temDay">12</span>-
                  <span class="temNight">12</span>
                  <span>℃</span>
                </div>
                <div class="wind">
                  <span class="windDirection">东南风</span>
                  <span class="windPower">&lt;3级</span>
                </div>
              </li>
              <li class="item">
                <div class="date-box">
                  <span class="dateFormat">今天</span>
                  <span class="date">10月28日</span>
                </div>
                <img src="@/assets/weatherImgs/多云.png" alt class="weatherImg" />
                <span class="weather">多云</span>
                <div class="temp">
                  <span class="temDay">12</span>-
                  <span class="temNight">12</span>
                  <span>℃</span>
                </div>
                <div class="wind">
                  <span class="windDirection">东南风</span>
                  <span class="windPower">&lt;3级</span>
                </div>
              </li>
              <li class="item">
                <div class="date-box">
                  <span class="dateFormat">今天</span>
                  <span class="date">10月28日</span>
                </div>
                <img src="@/assets/weatherImgs/多云.png" alt class="weatherImg" />
                <span class="weather">多云</span>
                <div class="temp">
                  <span class="temDay">12</span>-
                  <span class="temNight">12</span>
                  <span>℃</span>
                </div>
                <div class="wind">
                  <span class="windDirection">东南风</span>
                  <span class="windPower">&lt;3级</span>
                </div>
              </li>
              <li class="item">
                <div class="date-box">
                  <span class="dateFormat">今天</span>
                  <span class="date">10月28日</span>
                </div>
                <img src="@/assets/weatherImgs/多云.png" alt class="weatherImg" />
                <span class="weather">多云</span>
                <div class="temp">
                  <span class="temDay">12</span>-
                  <span class="temNight">12</span>
                  <span>℃</span>
                </div>
                <div class="wind">
                  <span class="windDirection">东南风</span>
                  <span class="windPower">&lt;3级</span>
                </div>
              </li>
            </ul>
          </div>
        </li>
        <!-- 情绪记录 -->
        <li class="each-show">情绪记录</li>
      </ul>
    </main>
  </section>
</template>

<script>
import { changeFooter, getWeather, inputCheck, updateCity } from '@/utils/home/char.js'
export default {
  name: 'homeChar',
  mounted () {
    changeFooter()
    getWeather('610100')
    inputCheck()
    updateCity()
  }
}
</script>

<style lang="less" src="@/styles/home/char.less">
</style>
