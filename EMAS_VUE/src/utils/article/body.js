import { getRandomArticles, getLikedArticles, submitFeedback, dislikeFeedback } from '@/api/article'
// 定义一个显示 summary 和 title 的函数
export async function updateArticles () {
  const res = await getRandomArticles()
  // console.log(res)
  const randomArticles = res.data.data
  return randomArticles
}

// 整理 所有的收藏文章 的id
export async function likedArticles () {
  const res = await getLikedArticles()
  const articles = res.data.data
  // console.log(likedArticles)
  const articleIdArr = []
  for (let i = 0; i < articles.length; i++) {
    articleIdArr.push(articles[i].articleId)
  }
  const array = articleIdArr
  const arr = [...new Set(array)]

  return arr
}

// 展示 summary 和 title
export const summaryShow = async () => {
  const arr = await likedArticles()
  // console.log(arr)
  const feedback = document.querySelector('.feedback')
  // 定义一个计时器
  let timer = null
  if (timer) {
    clearTimeout(timer)
  }
  // 定时器默认设置 - 页面加载完成后展示第一条数据
  let i = 1
  let articleId = ''
  let randomArticles = null
  randomArticles = await updateArticles()
  // console.log(randomArticles)
  articleId = randomArticles[0].articleId
  if (arr.includes(articleId)) {
    // console.log('已经like')
    // console.log(articleId)
    feedback.classList.add('liked')
  }
  const summary = randomArticles[0].summary
  const title = randomArticles[0].title
  document.querySelector('.innerArea').innerHTML = `
      <div class="art-content-rec">${summary}</div>
      <div class="art-content-author">—— ${title}</div>
  `
  // 开启定时器 - 轮播展示
  timer = setInterval(async () => {
    feedback.classList.remove('liked')
    articleId = randomArticles[i].articleId
    if (arr.includes(articleId)) {
      // console.log('已经like')
      // console.log(articleId)
      feedback.classList.add('liked')
    }
    const summary = randomArticles[i].summary
    const title = randomArticles[i].title
    document.querySelector('.innerArea').innerHTML = `
          <div class="art-content-rec">${summary}</div>
          <div class="art-content-author">—— ${title}</div>
      `
    i++
    if (i === 10) {
      randomArticles = await updateArticles()
      // console.log(randomArticles)
      i = 0
    }
  }, 4000)
  document.querySelector('.feedback').addEventListener('click', async () => {
    if (!arr.includes(articleId)) {
      console.log('提交like')
      feedback.classList.add('liked')
      const res = await submitFeedback(articleId, 'like')
      console.log(res)
    } else if (arr.includes(articleId)) {
      console.log('提交dislike')
      feedback.classList.remove('liked')
      const res = await dislikeFeedback(articleId)
      console.log(res)
    }
  })
}
