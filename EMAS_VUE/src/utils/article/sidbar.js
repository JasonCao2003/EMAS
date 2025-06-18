import { getRandomArticles } from '@/api/article'
export const scrollArticles = async () => {
  const picArr = [
    '@/assets/article/sidebar/sakura.jpg',
    '@/assets/article/sidebar/芬妮.jpg',
    '@/assets/article/sidebar/谭雅 (8).jpg',
    '@/assets/article/sidebar/阿斯托尔福 (117).jpg',
    '@/assets/article/sidebar/阿斯托尔福 (152).jpg'
  ]
  const arr = (await getRandomArticles()).data.data
  console.log(arr)
  for (let i = 0; i < arr.length; i++) {
    document.querySelector('.cards').innerHTML +=
    `
            <div class="card">${arr[i].title}</div>
    `
  }
  document.querySelector('.card-body').addEventListener('click', function (event) {
    if (event.target.className === 'card') {
      for (let i = 0; i < arr.length; i++) {
        if (event.target.innerHTML === arr[i].title) {
          console.log(event.target.innerHTML)
          event.target.innerHTML = arr[i].content
          event.target.style.textIndent = 'calc(2em + 6px)'
        } else if (event.target.innerHTML === arr[i].content) {
          console.log(event.target.innerHTML)
          event.target.innerHTML = arr[i].title
          event.target.style.textIndent = '0'
        }
      }
    }
  })
  document.querySelector('.card-body').addEventListener('scroll', async function () {
    const scrollTop = document.querySelector('.card-body').scrollTop
    const clientHeight = document.querySelector('.card-body').clientHeight
    const scrollHeight = document.querySelector('.card-body').scrollHeight
    // console.log(scrollTop + clientHeight)
    // console.log(scrollHeight)
    if (scrollTop + clientHeight + 10 >= scrollHeight) {
      const newArr = (await getRandomArticles()).data.data
      for (let i = 0; i < newArr.length; i++) {
        document.querySelector('.cards').innerHTML +=
        `
                <div class="card">${newArr[i].title}</div>
        `
        if (i % 4 === 0) {
          const random = Math.floor(Math.random() * picArr.length)
          console.log(picArr[random])
          document.querySelector('.cards').innerHTML +=
          `
                  <div class="card"><div class="img"></div></div>
          `
          document.querySelector('.img').style.backgroundImage = `url(${picArr[random]})`
        }
      }
      arr.push(newArr)
    }
  })
}
