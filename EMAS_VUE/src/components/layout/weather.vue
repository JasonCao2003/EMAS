<template>
  <div class="weather">
    <!-- 顶部 -->
    <div class="top-box">
      <div class="title">
        <span class="dateShort">10月28日</span>
        <span class="calendar">农历&nbsp;
          <span class="dateLunar">十月初四</span>
        </span>
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
            <img src="@/assets/imgs/晴天-line.png" class="weatherImg" alt="">
          </li>
          <li class="windDirection">东南风</li>
          <li class="windPower">2级</li>
        </ul>
      </div>
    </div>
    <div class="today-weather">
      <div class="range-box">
        <span>今天：</span>
        <span class="range">
          <span class="weatherWord">晴</span>
          &nbsp;
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
  </div>
</template>

<script>
export default {
  name: 'layoutWeather'
}
</script>

<style src="@/styles/layout/weather.css"></style>
