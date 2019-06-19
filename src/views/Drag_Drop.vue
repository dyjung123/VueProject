<template>
    <div>
        <div id="app">
<!-- File Drop Zone -->
            <div style="visibility:hidden; opacity:0" id="dropzone">
                <div id="textnode">Drop files to add data.</div>
            </div>
        </div>
    </div>
</template>

<script>
import ProcessImage from '../aws'
export default {
    data(){
        return{
            uploadedFiles : {}
        }
    },
    mounted() {
        var self = this;
        window.addEventListener("dragenter", function (e) {
            document.querySelector("#dropzone").style.visibility = "";
            document.querySelector("#dropzone").style.opacity = 1;
            document.querySelector("#textnode").style.fontSize = "48px";
        });

        window.addEventListener("dragleave", function (e) {
            e.preventDefault();

            document.querySelector("#dropzone").style.visibility = "hidden";
            document.querySelector("#dropzone").style.opacity = 0;
            document.querySelector("#textnode").style.fontSize = "42px";
            
        });

        window.addEventListener("dragover", function (e) {
            e.preventDefault();
            document.querySelector("#dropzone").style.visibility = "";
            document.querySelector("#dropzone").style.opacity = 1;
            document.querySelector("#textnode").style.fontSize = "48px";
        });

        window.addEventListener("drop", function (e) {
            e.preventDefault();
            document.querySelector("#dropzone").style.visibility = "hidden";
            document.querySelector("#dropzone").style.opacity = 0;
            document.querySelector("#textnode").style.fontSize = "42px";
            
            var files = e.dataTransfer.files;
            self.uploadedFiles = files
            ProcessImage(files)
        });
    }
}
</script>

<style>
#file-panel {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: auto;
}

.panel-body {
  height: auto;
}


#upload-list {
  height: auto;
  padding: 0px;
}

ul {
  list-style-type: none;
}

div#dropzone {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999999999;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: visibility 175ms, opacity 175ms;
    display: table;
    text-shadow: 1px 1px 2px #000;
    color: #fff;
    background: rgba(0, 0, 0, 0.45);
    font: bold 42px Oswald, DejaVu Sans, Tahoma, sans-serif;
}
div#textnode {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    transition: font-size 175ms;
}
</style>
