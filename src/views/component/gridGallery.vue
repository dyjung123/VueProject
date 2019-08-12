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
        this.offset = 0
        this.imageurls = []
        this.fetchImgLinks(this.imageurls)
      }
    },
    methods: {
      ...mapActions([
            'FETCH_IMAGELINKS'
      ]),
      fetchImgLinks(imgurls) { // parameter type is list
         const nPromise = async ()=>{
            this.offset += this.limit
            var res = await this.FETCH_IMAGELINKS({'uid': firebase.auth().currentUser.uid, 'category': this.category, 'limit': this.limit, 'offset': this.offset - this.limit})
            imgurls.push(...res)
          }
         return nPromise()
      },
      scrollEvt() {
        this.fetchImgLinks(this.imageurls)
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
