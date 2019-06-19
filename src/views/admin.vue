<template>
    <div>
        <form action="">
            <input type="text" class = "em_happy" placeholder="em_happy">
            <input type="text" class = "em_sad" placeholder="em_sad">
            <input type="text" class = "em_angry" placeholder="em_angry">
            <input type="text" class = "em_calm" placeholder="em_calm">
            <input type="text" class = "em_disgusted" placeholder="em_disgusted">
            <input type="text" class = "em_confused" placeholder="em_confused">
            <input type="text" class = "em_confidence" placeholder="em_confidence">
            <input type="text" class = "em_surprised" placeholder="em_surprised">
            <button class="btn" @click.prevent="admin"></button>
            <button class="btn" @click.prevent="findR"></button>
        </form>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import firebase from 'firebase'
import axios from 'axios'
export default {
    methods:{
        ...mapActions([
            'UPLOAD_ANALYSDATA'
        ]),
        admin(){
            var some = {}
            some.userId = firebase.auth().currentUser.uid
            some.imageName = "test7.jpeg"
            some.uploadDate = '2019/03/28'
            some.HAPPY = parseFloat($(".em_happy").val())
            some.ANGRY = parseFloat($(".em_angry").val())
            some.SAD = parseFloat($(".em_sad").val())            
            some.CALM = parseFloat($(".em_calm").val())
            some.DISGUSTED = parseFloat($(".em_disgusted").val())
            some.SURPRISED = parseFloat($(".em_surprised").val())
            some.CONFUSED = parseFloat($(".em_confused").val())
            some.Confidence = parseFloat($(".em_confidence").val())
            console.log("some : ",some)


            this.UPLOAD_ANALYSDATA(some)
            console.log(firebase.auth().currentUser.uid)
            
        },
        findR(){
            var data = {}
            data.UID = firebase.auth().currentUser.uid
            data.inDate = new Date('2019/03/27')-15/24
            var emotion = new Array(8).fill(0);
            
            // localhost or myIP
            axios.post('http://192.168.0.7:3003/analysis/findrec',data).then(x=>{
                Array.from(x.data).forEach((res)=>{
                    emotion[0]+=res.angry
                    emotion[1]+=res.sad
                    emotion[2]+=res.happy
                    emotion[3]+=res.calm
                    emotion[4]+=res.disgusted
                    emotion[5]+=res.surprised
                    emotion[6]+=res.confused
                    emotion[7]+=res.confi
                })
                const l = Array.from(x.data).length
                emotion.forEach((f,index)=>{
                    emotion[index]=f/l
                })
                console.log(emotion)
            })

        }
    }
}
</script>

<style>

</style>
