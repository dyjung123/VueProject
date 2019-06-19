// 제일 먼저 들어가는 곳
import Vue from 'vue'
import babelpolyfill from 'babel-polyfill'
import App from './App.vue'
import router from './router'
import store from './store'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

/*
// 제목 : ES6 기반 Vue.js 개발 프로젝트에서 마주치는 render: h => h(App) 해석
// 설명 : render:h => h(App)은 Vue.js의 기본적인 render function의 간소화 버전
// 변환과정 : #1 -> #2 -> #3 -> #4

// #1
render: function (createElement) {
  return createElement(App);
}

// #2
render (createElement) {
  return createElement(App);
}

// #3
render (h){
  return h(App);
}

// #4
// 참고 : h는 hyperscript의 약자로 HTML 구조를 생성하는 스크립트를 의미. Virtual DOM 구현에서 관행적으로 사용
render: h => h(App);
*/