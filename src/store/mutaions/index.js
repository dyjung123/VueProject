const mutations = { // state만 바꿈
    login (state){
        console.log('mutations : login')
        state.isLogin = true
        state.isCheckAuth = true
    },
    logout (state){
        console.log('mutations : logout')
        state.isLogin = false
        state.isCheckAuth = true
    },
    imageResult(state,result) {
        console.log('imageResult',result)
        state.analyzeResult = result
    },
    getApi (state,result){ // 삭제 예정
        state.analyz_express = result
    },
    fromFirebase (state,result){
        state.dataFromFirebase = result
    },
    fromAws(state,result){
        state.dataFromAws = result
    }
}

export default mutations