(function () {
  let devToolsOpen = false
  const threshold = 160 // 设置一个阈值，当窗口宽度或高度的变化超过这个值时，认为开发者工具可能被打开了

  function checkDevTools () {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold
    const heightThreshold = window.outerHeight - window.innerHeight > threshold
    if (!(heightThreshold && widthThreshold) && ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)) {
      if (!devToolsOpen) {
        // alert("开发者工具已打开！");
        devToolsOpen = true
        window.location.href = 'about:blank'
      }
    } else {
      devToolsOpen = false
    }
  }

  window.addEventListener('resize', checkDevTools)
  window.addEventListener('DOMContentLoaded', checkDevTools)
})()
