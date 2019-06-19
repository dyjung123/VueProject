<template>
    <div>

        <!-- <DragDrop/> -->
        <div class="container">
            <div class="row">
                <div class="col align-self-center" style="font-size:70px">
                    <h1>Upload image file</h1>
					<div class="imgContainer">
						<img class="inImg" style="display: none;"/>
						<div class="box__uploading">
							<Loading size="50px" color="#7FFFD4" />
						</div>
						<div class="box__success">Done!</div>
						<div class="box__error">ERROR!</div>
					</div>
                    <form class="box has-advanced-upload" v-bind:class="{ isDragover : isDragging }"
                    v-on:dragover="isDragging=true" v-on:dragenter="isDragging=true" v-on:dragleave="isDragging=false">
		                <div class="box__input">
			                <svg class="box__icon" xmlns="http://www.w3.org/2000/svg" width="50" height="43" viewBox="0 0 50 43"><path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"></path></svg>
			                <strong>Choose a file</strong><span class="box__dragndrop"> or drag it here</span>.
		                </div>
						
                    </form>
                </div>
            </div>
            <div class="row">
                <div class="col align-self-center">
                    <a class="btn btn-info btn-xlarge" style="margin:20px;" v-on:click.prevent="send()" :disabled="isAnalyzing">
                        <span class="glyphicon glyphicon-cloud-upload"></span> Analyze
                    </a>
					<input type="file" name="files[]" id="file" class="box__file" data-multiple-caption="{count} files selected" multiple="" :disabled="isAnalyzing">
					<label for="file">
						<a class="btn btn-info btn-xlarge" :disabled="isAnalyzing">
							<span class="glyphicon glyphicon-folder-open"></span> Choose Image
						</a>
					</label>
                </div>
            </div>
        </div>
        <Graph v-if="isUpload" class="graph" />
    </div>
</template>

<script>
import ProcessImage from '../aws'
import DragDrop from './Drag_Drop.vue'
import Graph from './Result.vue'
import fire from '../firebase'
import firebase from 'firebase'
import Loading from './loading'
import { mapActions ,mapState } from 'vuex'

export default {
    data() {
        return {
			isDragging: false,
			isUpload: false, // graph 표시여부
			isAnalyzing: false,
            files: {}
        }
    },
    components:{
        DragDrop,
		Graph,
		Loading
    },
    computed: {
        ...mapState({
			analyzeResult:'analyzeResult',
			dataFromFirebase:'dataFromFirebase',
			dataFromAws:'dataFromAws'
        })
    },
    watch: {
        analyzeResult(val, oldval) {
            // console.log('analyze.vue : ',val)
            this.isUpload = true // 그래프 visible
		},
		dataFromFirebase(val, oldval) {
			// console.log("dataFromFirebase in Analyze",val.readyFb + "  " + this.dataFromAws.readyAws)
			if (val.readyFb && this.dataFromAws.readyAws) {
				val.readyFb = false // This is for UPLOAD_ANALYSDATA only once when user doesn't change image file and click analyze button.
				this.dataFromAws.readyAws = false

				this.UPLOAD_ANALYSDATA({...this.dataFromFirebase, ...this.dataFromAws}).then(()=>{
					this.classToggle(document.querySelector(".imgContainer"), "isSuccess")
					this.isAnalyzing = false // for turn on Analyze and Choose Image buttons
				}).catch(()=>{
					this.classToggle(document.querySelector(".imgContainer"), "isError")
					this.isAnalyzing = false // for turn on Analyze and Choose Image buttons
					console.log("upload error")
				})

			}
		},
		dataFromAws(val, oldval) {
			// console.log("dataFromAws in Analyze",oldval.readyAws + "  " + this.dataFromFirebase.readyFb)
			if (val.readyAws && this.dataFromFirebase.readyFb) {
				val.readyAws = false // This is for UPLOAD_ANALYSDATA only once when user doesn't change image file and click analyze button.
				this.dataFromFirebase.readyFb = false

				this.UPLOAD_ANALYSDATA({...this.dataFromFirebase, ...this.dataFromAws}).then(()=>{
					this.classToggle(document.querySelector(".imgContainer"), "isSuccess")
					this.isAnalyzing = false // for turn on Analyze and Choose Image buttons
				}).catch(()=>{
					this.classToggle(document.querySelector(".imgContainer"), "isError")
					this.isAnalyzing = false // for turn on Analyze and Choose Image buttons
					console.log("upload error")
				})

			}
		}
    },
    mounted() {
        var self = this // eventListener안에서 this는 listener가 부착된 element를 가리킴

        document.querySelector(".col").addEventListener("dragover", function (e) {
            e.preventDefault();
        });

        document.querySelector(".col").addEventListener("drop", function (e) {
			if (self.isAnalyzing) {
				return
			}
			self.classToggle(document.querySelector(".imgContainer"))
			self.imgUploadEventHandler(e)
		})
		
		document.querySelector("input").addEventListener("change", function (e) {
			if (this.files.length > 0 && !self.isAnalyzing) {
				self.classToggle(document.querySelector(".imgContainer"))
				self.imgUploadEventHandler(e, this)
			}
		})

    },
    methods: {
		...mapActions([
			'UPLOAD_ANALYSDATA',
			'CHECK_EXIST',
			'DELETE_DATA'
		]),
        send(){
			if (this.isAnalyzing) {
				return
			} else if (!this.files[0]) {
				alert("Please choose image")
				return
			} else if (this.files.length > 1) {
				alert("We can analyze only one image at once")
				return
			}

			// Check if this.files[0] already exists in the storage.
			this.CHECK_EXIST({'imgId': this.files[0].name, 'uid': firebase.auth().currentUser.uid}).then(imgName => {
				// console.log('imgName',imgName)
				if (imgName.length > 0) { // delete existing data
					fire.deleteImage(imgName)
					this.DELETE_DATA({'imgId': imgName[0].imageId.split("/").pop(-1), 'uid': firebase.auth().currentUser.uid})
				}
			}).then(() => {
				this.isAnalyzing = true // for turn off Analyze and Choose Image buttons
				this.classToggle(document.querySelector(".imgContainer"), "isUploading") // turn on loading bar
				console.log("send",this.files)
				this.isUpload = false // graph hidden
				fire.imageUpload(this.files[0])
				ProcessImage(this.files)
			}).catch(err => {
				console.log(err)
			})
		},
		imgUploadEventHandler(e, targetElement) { // read img, and show
			e.preventDefault()
			var reader = new FileReader()
            
			document.querySelector("form.box").classList.remove("isDragover")
			if (e.type === "drop") {
				this.files = e.dataTransfer.files
			} else if (e.type === "change") {
				this.files = targetElement.files
			}
            console.log(this.files)
            $('.box').hide()

            reader.onload = function (e) {
                $('.inImg').attr('src', e.target.result)
            }
            reader.readAsDataURL(this.files[0])

			$('.inImg').show()
		},
		classToggle(target, to) {
			// initiate status
			[].forEach.call(["isSuccess", "isUploading", "isError"], c => {
					target.classList.remove(c)
			})

			// none-selected status
			if (!to) {
				document.querySelector(".inImg").style = "filter: brightness(100%); opacity: 1;"
			} 
			
			// selected status
			else {
				if (to === "isUploading") {
					target.classList.add(to)
					document.querySelector(".inImg").style = "filter: brightness(50%); opacity: 0.5;"
				} else if (to === "isSuccess") {
					target.classList.add(to)
				} else if (to === "isError") {
					target.classList.add(to)
				}
			}
		}
    }
}
</script>

<style>
.inImg{
    max-width:100%;
    max-height:100%;
}
.container
{
	width: 100%;
	max-width: 680px; /* 800 */
	text-align: center;
	margin: 0 auto;
}

.imgContainer
{
	position: relative;
}

.box
{
	font-size: 1.25rem; /* 20 */
	background-color: #c8dadf;
	position: relative;
	padding: 100px 20px;
}
.box.has-advanced-upload
{
	outline: 2px dashed #92b0b3;
	outline-offset: -10px;
	-webkit-transition: outline-offset .15s ease-in-out, background-color .15s linear;
	transition: outline-offset .15s ease-in-out, background-color .15s linear;
}
.box.isDragover
{
	outline-offset: -20px;
	outline-color: #c8dadf;
	background-color: #fff;
}

.box__dragndrop,
.box__icon
{
	display: none;
}
.box.has-advanced-upload .box__dragndrop
{
	display: inline;
}
.box.has-advanced-upload .box__icon
{
	width: 100%;
	height: 80px;
	fill: #92b0b3;
	display: block;
	margin-bottom: 40px;
}

/* .isUploading .box__input,
.isSuccess .box__input,
.box.isError .box__input
{
	visibility: hidden;
} */

.box__uploading,
.box__success,
.box__error
{
	display: none;
}
.isUploading .box__uploading,
.isSuccess .box__success,
.isError .box__error
{
	display: block;
	position: absolute;
	top: 50%;
	right: 0;
	left: 0;

	-webkit-transform: translateY( -50% );
	transform: translateY( -50% );
}
.box__uploading
{
	font-style: italic;
}
.box__success
{
	-webkit-animation: appear-from-inside .25s ease-in-out;
	animation: appear-from-inside .25s ease-in-out;
}
@-webkit-keyframes appear-from-inside
{
	from	{ -webkit-transform: translateY( -50% ) scale( 0 ); }
	75%		{ -webkit-transform: translateY( -50% ) scale( 1.1 ); }
	to		{ -webkit-transform: translateY( -50% ) scale( 1 ); }
}
@keyframes appear-from-inside
{
	from	{ transform: translateY( -50% ) scale( 0 ); }
	75%		{ transform: translateY( -50% ) scale( 1.1 ); }
	to		{ transform: translateY( -50% ) scale( 1 ); }
}

.box__restart
{
	font-weight: 700;
}
.box__restart:focus,
.box__restart:hover
{
	color: #39bfd3;
}

.box__file
{
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}
.box__file + label
{
	max-width: 80%;
	text-overflow: ellipsis;
	white-space: nowrap;
	cursor: pointer;
	display: inline-block;
	/* overflow: hidden; */
}
.box__file + label:hover strong,
.box__file:focus + label strong,
.box__file.has-focus + label strong
{
	color: #39bfd3;
}
.box__file:focus + label,
.box__file.has-focus + label
{
	outline: 1px dotted #000;
	outline: -webkit-focus-ring-color auto 5px;
}

.no-js .box__file + label
{
	display: none;
}

.no-js .box__button
{
	display: block;
}
.box__button
{
	font-weight: 700;
	color: #ffffff;
	background-color: #39bfd3;
	display: block;
	padding: 8px 16px;
	margin: 40px auto 0;
}
.box__button:hover,
.box__button:focus
{
	background-color: #0f3c4b;
}
strong, .box__input span {
    font-size: x-large
}
.btn-xlarge {
    padding: 16px 25px;
    font-size: 27px;
    line-height: normal;
    -webkit-border-radius: 8px;
       -moz-border-radius: 8px;
            border-radius: 8px;
}

@media (max-width: 500px) {
	.btn-xlarge {
		font-size: 17px;
	}
}

.v-spinner {
	padding-top: 0;
}
</style>
