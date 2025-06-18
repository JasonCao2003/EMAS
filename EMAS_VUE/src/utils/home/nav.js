// 选项栏是否可以显示
function isShow (value) {
  // 防止点击div内部时触发隐藏事件
  document.querySelector('.nav').addEventListener('click', e => {
    e.stopPropagation()
  })
  if (value) {
    document.querySelector('.userSelect').style.display = 'block'
    // 点击页面其他区域时隐藏div
    document.querySelector('.nav').addEventListener('blur', e => {
      // console.log(e)
      if (document.querySelector('.nav').contains(e.target)) {
        setTimeout(() => {
          document.querySelector('.userSelect').style.display = 'none'
        }, 100)
      }
    })
  }
}
export { isShow }
