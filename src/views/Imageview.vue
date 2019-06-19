<template>
    <div id="grid" class="grid">
        <template v-for="(item, index) in imageurls">
            <a class="card" :data-groups="item.emotype" :key="index">
                <img v-show="isReadyLoad" :src="item.downlink" @load="loaded" />
                <!-- <div class="title">Project Title test me more please do this for me please dood.</div> -->
            </a>
        </template>
        <div class="guide"></div>
    </div>
</template>

<script>
import firebase from 'firebase'
import { mapActions } from 'vuex'
import Loading from './loading'

export default {
    components: {
      Loading
    },
    data() {
        return {
            imageurls: [],
            aspectRatio: 1.0,
            filteredProjects: [],
            loadedImg: 0,
            isReadyLoad: false
        }
    },
    created() { // fetch image download links
      this.loadedImg = 0
      this.isReadyLoad = false
      this.FETCH_IMAGELINKS({'uid': firebase.auth().currentUser.uid}).then(res => {
        this.imageurls = res
        console.log('res',this.imageurls)
      }).catch(res=>{
		    console.log(res)
        alert("ERROR "+res)
		  })
    },
    watch: {
        imageurls(val, oldval) { // imageurls를 받아오면 실행
            var self = this

            this.$nextTick(() => {
                var projects = $('.card')
                var selection = "all"
                var running = false
                window.setTimeout(function() {
                  $('.all').trigger('click')
                }, 100)

                $(window).off('resize')
                $(window).resize(function() {
                  console.log('resize',self.filteredProjects)
                  self.buildGrid(self.filteredProjects)
                })

                $('.category-buttons a').off('click')
                $('.category-buttons a').on('click', function(e) {
                  e.preventDefault()
                  if (!running) { // running중에는 클릭 이벤트 처리x
                    running = true
                    selection = $(this).data('group') // 선택한 카테고리 (HAPPY,SAD,ANGRY,...)
                    $('.category-buttons a').removeClass('active')
                    $(this).addClass('active')
                    self.filteredProjects = []
                    console.log('before for excecuted',projects)
                    for (i = 0; i < projects.length; i++) {
                      var project = projects[i]
                      var dataString = $(project).data('groups') // projects는 jquery로 받아온것이나 그 배열의 요소인 project는 jquery객체가 아닌듯?
                      var dataArray = dataString.split(',') // 현재는 data-groups이 가장 높은 감정 1개.
                      console.log('selection',selection)
                      if (selection === 'all') { // 선택한 카테고리가 all 일 경우
                        $(project).addClass('setScale').queue(function(next) {
                          console.log('push')
                          self.filteredProjects.push(project)
                          next()
                        }).queue(function(next) {
                          $(this).removeClass('setScale')
                          next()
                        }).queue(function(next) {
                          $(this).addClass('animating show')
                          next()
                        }).delay(750).queue(function() {
                          running = false
                          $(this).removeClass('animating').dequeue()
                        })
                      } else { // 선택한 카테고리가 all이 아닌 나머지
                         // 선택한 카테고리의 아이템이 존재하면 실행
                        if ($.inArray(selection, dataArray) > -1) {
                          $(project).addClass('setScale').queue(function(next) {
                            self.filteredProjects.push(project)
                            next()
                          }).queue(function(next) {
                            $(this).removeClass('setScale')
                            next()
                          }).queue(function(next) {
                            $(this).addClass('animating show')
                            next()
                          }).delay(750).queue(function() {
                            running = false
                            $(this).removeClass('animating').dequeue()
                          })
                          /*$(project).css({
                            '-webkit-transition': 'all 750ms cubic-bezier(0.175, 0.885, 0.32, 1.1)',
                            'transition': 'all 750ms cubic-bezier(0.175, 0.885, 0.32, 1.1);',
                            '-webkit-transform': 'scale(' + 1 + ')',
                            '-ms-transform': 'scale(' + 1 + ')',
                            'transform': 'scale(' + 1 + ')',
                            'opacity': 1
                          });*/
                        } 
                        // 선택한 카테고리의 이미지가 존재하지 않으면 실행
                        else {
                          $(project).queue(function(next) {
                            $(this).addClass('animating')
                            next()
                          }).queue(function(next) {
                            $(this).removeClass('show')
                            next()
                          }).delay(750).queue(function() {
                            running = false
                            $(this).removeClass('animating').dequeue()
                          })
  
                          /*$(project).css({
                            '-webkit-transition': 'all 750ms cubic-bezier(0.175, 0.885, 0.32, 1.1)',
                            'transition': 'all 750ms cubic-bezier(0.175, 0.885, 0.32, 1.1);',
                            '-webkit-transform': 'scale(' + 0 + ')',
                            '-webkit-transform': 'scale(' + 0 + ')',
                            '-ms-transform': 'scale(' + 0 + ')',
                            'transform': 'scale(' + 0 + ')',
                            'opacity': 0
                          });*/
                        }
                      }
                    }
                    self.buildGrid(self.filteredProjects)
                    console.log('filteredProjects',self.filteredProjects)
                  }


                  // e.preventDefault()
                  // if (!running) { // running중에는 클릭 이벤트 처리x
                  //   running = true
                  //   selection = $(this).data('group') // 선택한 카테고리 (HAPPY,SAD,ANGRY,...)
                  //   $('.category-buttons a').removeClass('active')
                  //   $(this).addClass('active')
                  //   filteredProjects = []
                  //   console.log('before for excecuted',projects)
                  //   for (i = 0; i < projects.length; i++) {
                  //     var project = projects[i]
                  //     var dataString = $(project).data('groups') // projects는 jquery로 받아온것이나 그 배열의 요소인 project는 jquery객체가 아닌듯?
                  //     var dataArray = dataString.split(',') // 현재는 data-groups이 가장 높은 감정 1개.
                  //     if (selection === 'all') { // 선택한 카테고리가 all 일 경우
                  //       $(project).addClass('setScale').queue(function(next) {
                  //         filteredProjects.push(project)
                  //         next()
                  //       }).queue(function(next) {
                  //         $(this).removeClass('setScale')
                  //         next()
                  //       }).queue(function(next) {
                  //         $(this).addClass('animating show')
                  //         next()
                  //       }).delay(750).queue(function() {
                  //         running = false
                  //         $(this).removeClass('animating').dequeue()
                  //       })
                  //     } else { // 선택한 카테고리가 all이 아닌 나머지
                  //        // 선택한 카테고리의 아이템이 존재하면 실행
                  //       if ($.inArray(selection, dataArray) > -1) {
                  //         $(project).addClass('setScale').queue(function(next) {
                  //           filteredProjects.push(project)
                  //           next()
                  //         }).queue(function(next) {
                  //           $(this).removeClass('setScale')
                  //           next()
                  //         }).queue(function(next) {
                  //           $(this).addClass('animating show')
                  //           next()
                  //         }).delay(750).queue(function() {
                  //           running = false
                  //           $(this).removeClass('animating').dequeue()
                  //         })
                  //         /*$(project).css({
                  //           '-webkit-transition': 'all 750ms cubic-bezier(0.175, 0.885, 0.32, 1.1)',
                  //           'transition': 'all 750ms cubic-bezier(0.175, 0.885, 0.32, 1.1);',
                  //           '-webkit-transform': 'scale(' + 1 + ')',
                  //           '-ms-transform': 'scale(' + 1 + ')',
                  //           'transform': 'scale(' + 1 + ')',
                  //           'opacity': 1
                  //         });*/
                  //       } 
                  //       // 선택한 카테고리의 이미지가 존재하지 않으면 실행
                  //       else {
                  //         $(project).queue(function(next) {
                  //           $(this).addClass('animating')
                  //           next()
                  //         }).queue(function(next) {
                  //           $(this).removeClass('show')
                  //           next()
                  //         }).delay(750).queue(function() {
                  //           running = false
                  //           $(this).removeClass('animating').dequeue()
                  //         })

                  //         /*$(project).css({
                  //           '-webkit-transition': 'all 750ms cubic-bezier(0.175, 0.885, 0.32, 1.1)',
                  //           'transition': 'all 750ms cubic-bezier(0.175, 0.885, 0.32, 1.1);',
                  //           '-webkit-transform': 'scale(' + 0 + ')',
                  //           '-webkit-transform': 'scale(' + 0 + ')',
                  //           '-ms-transform': 'scale(' + 0 + ')',
                  //           'transform': 'scale(' + 0 + ')',
                  //           'opacity': 0
                  //         });*/
                  //       }
                  //     }
                  //   }
                  //   self.buildGrid(filteredProjects)
                  // }
                })
            })
        },
        loadedImg(val, oldval) {
          if (val == this.imageurls.length) {
            this.isReadyLoad = true
          }
        },
        isReadyLoad(val, oldval) {
          if (val) {
            this.buildGrid(this.filteredProjects)
          }
        }
    },
    methods: {
        ...mapActions([
            'FETCH_IMAGELINKS'
        ]),
        buildGrid(projects) {
          var left = [0, $('.guide').width() / $('#grid').width() * 100 + 2, 2*($('.guide').width() / $('#grid').width() * 100 + 2)]
          var top = [0, 0, 0]
          var minTopIdx = 0
          var totalHeight = 0
          var heights = []
          var i
          for (i = 0; i < projects.length; i++) {
            console.log('project height1',$(projects[i].children).height())
            // $(projects[i]).css({ height: 'auto' })
            heights.push($(projects[i].children).height())
            console.log('project height2',$(projects[i].children).height())
          }
          var maxIndex = 0
          var maxHeight = parseInt($('.guide').width() / this.aspectRatio)
          $('.guide').height(maxHeight)

          // for (i = 0; i <= heights.length; i++) {
            // if (heights[i] > maxHeight) {
            //   maxHeight = heights[i]
            //   maxIndex = i
            //   $('.guide').height(maxHeight)
            // }
            if (i === heights.length) {
              for (i = 0; i < projects.length; i++) {
                if ($(window).width() > 768) {
                  $(projects[i]).css({ position: 'absolute', left: left[minTopIdx] + '%', top: top[minTopIdx] })
                  top[minTopIdx] = top[minTopIdx] + heights[i] + 20
                  totalHeight = totalHeight < top[minTopIdx] ? top[minTopIdx] : totalHeight
                  minTopIdx = this.getMinIdx(top, 3)
                } else if ($(window).width() <= 768 && $(window).width() > 480) {
                  // $(projects[i]).css({ position: 'absolute', left: left[i%2] + '%', top: top[i%2] })
                  // top[i%2] = top[i%2] + heights[i] + 20
                  // totalHeight = totalHeight + $('.guide').height() + 20
                  $(projects[i]).css({ position: 'absolute', left: left[minTopIdx] + '%', top: top[minTopIdx] })
                  top[minTopIdx] = top[minTopIdx] + heights[i] + 20
                  totalHeight = totalHeight < top[minTopIdx] ? top[minTopIdx] : totalHeight 
                  minTopIdx = this.getMinIdx(top, 2)
                } else if ($(window).width() <= 480) {
                  $(projects[i]).css({ position: 'absolute', left: left[0] + '%', top: top[0] })
                  top[0] = top[0] + heights[i] + 20
                  totalHeight = totalHeight + heights[i] + 20
                }
                // $(projects[i]).css({ position: 'absolute', left: left[i%3] + '%', top: top[i%3] })
                // left = left + ($('.guide').width() / $('#grid').width() * 100) + 2

                // if (i === maxIndex) {
                //   $(projects[i]).css({ height: 'auto' })
                // } else {
                //   $(projects[i]).css({ height: maxHeight })
                // }
                $(projects[i]).css({ height: 'auto' })
                // top = top + heights[i] + 20
                // if ((i + 1) % 3 === 0 && projects.length > 3 && $(window).width() >= 700) {
                //   top = top + $('.guide').height() + 20
                //   left = 0
                //   totalHeight = totalHeight + $('.guide').height() + 20

                // } else if ((i + 1) % 2 === 0 && projects.length > 2 && $(window).width() < 700 && $(window).width() >= 480) {
                //   top = top + $('.guide').height() + 20
                //   left = 0
                //   totalHeight = totalHeight + $('.guide').height() + 20

                // } else if ((i + 1) % 1 === 0 && projects.length > 1 && $(window).width() < 480) {
                //   top = top + $('.guide').height() + 20
                //   left = 0
                //   totalHeight = totalHeight + $('.guide').height() + 20
                // }
                $('#grid').height(totalHeight)
                // console.log('grid height',top)
              }
            }
          // }
        },
        getMinIdx(arr, size) {
          var min = 0
          for (var i = 1; i < size; i++) {
            min = arr[min]>arr[i] ? i : min
          }
          return min
        },
        loaded(event) {
          ++this.loadedImg
        }
    }
}
</script>

<style>
@import '../assets/css/gallery.css';
</style>
