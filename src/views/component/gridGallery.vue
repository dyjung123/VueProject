<template>
  <div>
    <stack :column-min-width="320" :gutter-width="8" :gutter-height="8" :monitor-images-loaded="true">
      <stack-item v-for="(item, i) in imageurls" class="card" :data-groups="item.emotype" :key="i">
        <img :src="item.downlink" />
      </stack-item>
    </stack>
    <ScrollBotEvt @scrollEvt="scrollEvt()"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Stack, StackItem } from 'vue-stack-grid';
import firebase from 'firebase'
import ScrollBotEvt from './scrollBotEvt.vue'

export default {
  components: {
    Stack,
    StackItem,
    ScrollBotEvt
  },
  data() {
        return {
            imageurls: [],
            running: false,
            limit: 10,
            offset: 0
        }
    },
    props: {
      category: {
        type: String,
        default: 'all'
      }
    },
    created() { // fetch image download links
      this.fetchImgLinks(this.imageurls)
    },
    watch: {
      category(val, oldval) {
        console.log('change category',val)
        this.initImgurls().then(() => {
          this.fetchImgLinks(this.imageurls)
        })
      }
    },
    methods: {
      ...mapActions([
            'FETCH_IMAGELINKS'
      ]),
      fetchImgLinks(imgurls) { // parameter type is list
        if (!this.running) {
          this.running = true
          this.FETCH_IMAGELINKS({'uid': firebase.auth().currentUser.uid, 'category': this.category, 'limit': this.limit, 'offset': this.offset}).then(res => {
            this.offset += this.limit
            imgurls.push(...res)
            console.log('res',res)
          }).then(() => {
            this.running = false
          }).catch(res=>{
		        console.log(res)
            alert("ERROR "+res)
          })
        }
      },
      scrollEvt() {
        console.log("scrollEvt")
        this.fetchImgLinks(this.imageurls)
      },
      initImgurls() {
        var self = this
        return new Promise(function(resolve, reject) {
          try {
            self.offset = 0
            self.imageurls = []
            console.log('init Imgurls',self.imageurls)
            resolve(self.imageurls)
          } catch (error) {
            reject(error)
          }
        })
      }
    }
}
</script>

<style>
.card > img {
  display: block;
  width: 100%;
}
</style>
