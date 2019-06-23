import * as firebase from 'firebase'
import store from '../store'
import router from '../router'

var my_fire = {}

var app = firebase.initializeApp({
    apiKey: "AIzaSyAxL7kTzrF-hcQkFUazOKioeDinWJMTgy8",
    authDomain: "jolchak-96b96.firebaseapp.com",
    databaseURL: "https://jolchak-96b96.firebaseio.com",
    projectId: "jolchak-96b96",
    storageBucket: "jolchak-96b96.appspot.com",
    messagingSenderId: "44876085795"
})

my_fire.signup = function(email,password) {
    app.auth().createUserWithEmailAndPassword(email, password).then(()=>{
        router.push('/')
        console.log('signup success')
    }).catch(function(err) {
        alert(err.message)
    });
}

my_fire.login = function(email,password) {

    app.auth().signInWithEmailAndPassword(email, password).then(() => {
        router.push('/')
        console.log('login success',document.cookie)
    }).catch(err=>{
        console.log('firebase login err',err)
        alert('firebase login err : '+err.message)
        // router.push('/login')
    })

}
my_fire.logout = function() {
    app.auth().signOut().then(function() {
        router.push('/login')
        console.log('logout success')
    }).catch(function(error) {
        alert(error.message)
    });
}

// isLogin 자체는 앱이 생성될때 한번만 호출됨.
my_fire.isLogin = function() {
    app.auth().onAuthStateChanged(function(user) {
        console.log('firesbase func : isLogin  ',user)
        if (user) {
            store.commit('login')
        } else {
            store.commit('logout')
        }
    })
}

my_fire.imageUpload = function(file) { // uuid, imagename, uploaddate express 저장요청
    var uuid = app.auth().currentUser.uid || ''
    var dd = new Date()
    var dateForStorePath = dd.getFullYear()+'/'+('0'+(dd.getMonth()+1)).slice(-2)+'/'+('0'+dd.getDate()).slice(-2)
    var storageRef = app.storage().ref()
    var pathToFile = 'img/'+uuid+'/'+dateForStorePath+'/'+file.name
    
    // Create the file metadata
    var metadata = {
        contentType: 'image/jpeg'
    };
    console.log(file)
    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storageRef.child(pathToFile).put(file, metadata);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
        }, 
        function(error) {
            console.log('firebase upload error',error)
        }, 
        function() { // upload completed successfully
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                // Firebase Image upload data for storing in express
                store.commit('fromFirebase',{ "imageName": pathToFile, "userId": uuid, 
                    "uploadDate": dateForStorePath, "downloadURL": downloadURL, "readyFb": true })
                console.log('File available at', downloadURL);
            });
        });
}

// delete image from firebase storage
my_fire.deleteImage = function(imgList) {
    var storageRef = app.storage().ref();

    [].forEach.call(imgList, img => {
        var desertRef = storageRef.child(img.imageId)  
        // Delete the file
        desertRef.delete().catch(err => {
            console.log(err)
        })
    })
}

export default my_fire