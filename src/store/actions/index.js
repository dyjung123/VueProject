import router from '../../router'
import * as api from '../../api'

const actions = { // 필요에 따라 비동기로 만들수 있다.
    LOGIN (context){ // 필요x
        // setTimeout(() => {
        //     context.commit('login')
        // }, 10);
        context.commit('login')
        
    },
    LOGOUT (context){ // 필요x
        context.commit('logout')
    },
    GOPAGE ({},url){
        console.log(url)
        router.push(url)
    },
    GOTEST ({commit},msg){ // 필요x
        setTimeout(()=>{
            console.log('GOTEST action', msg)
        },10)
    },
    FETCH_ANALYSDATA ({commit},{id}){ // context에서 commit만, msg에서 id만 빼옴 삭제 예정
        return api.userAnalys.fetch(id).then(data => {
            commit('getApi', data)
        })
    },
    UPLOAD_ANALYSDATA ({}, data){
        // console.log('before upload : ',data)
        return api.userAnalys.add(data).then(data => {
            console.log('UPLOAD_ANALYSDATA : ',data)
        })
    },
    FETCH_AVGDATA ({}, conditionData){
        return api.userAnalys.get(conditionData)
    },
    FETCH_IMAGELINKS ({}, uid) {
        return api.userAnalys.getlink(uid)
    },
    CHECK_EXIST ({}, target) {
        return api.userAnalys.check(target)
    },
    DELETE_DATA ({}, target) {
        return api.userAnalys.delete(target)
    }
}

export default actions

//aness