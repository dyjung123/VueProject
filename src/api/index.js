import axios from 'axios'

// const DOMAIN = 'http://localhost:3003'
const DOMAIN = 'http://192.168.0.7:3003'

const request = (method,url,data) =>{
  // axios 라이브러리 :  https://github.com/axios/axios#example
    return axios ({
      method,
      url: DOMAIN + url,
      data
    }).then(res => res.data).catch(res=>{
      const {status} = res.response
      alert('ERROR CODE : '+ status)
      throw res.response
    })
  
}

export const userAnalys = {

  fetch(id){ // 삭제 예정
    return request('get',`/user/info/${id}`)
  },
  add(data){
    console.log('api : ',data)
    return request('post','/analysis/addata',data)
  },
  get(condition){ // get average emotion datas
    return request('post','/analysis/findrec',condition)
  },
  getlink(uid){ // get image download link 
    return request('post','/analysis/getimage',uid)
  },
  check(target) { // check data exist
    return request('post','/analysis/check',target)
  },
  delete(target) {
    return request('post','/analysis/delete',target)
  }

}