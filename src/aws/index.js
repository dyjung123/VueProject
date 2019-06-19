import * as aws from 'aws-sdk'
import store from '../store'

//Calls DetectFaces API and shows estimated ages of detected faces
const DetectFaces = (imageData) => {
    AWS.region = "us-east-1";
    var rekognition = new AWS.Rekognition();
    var params = {
      Image: {
        Bytes: imageData
      },
      Attributes: [
        'ALL',
      ]
    };
    rekognition.detectFaces(params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else {
        //store data
        const emotions = data.FaceDetails[0].Emotions
        console.log('data',data)

        var tmp = { "readyAws": true, "Confidence": data.FaceDetails[0].Confidence, "emoType": ''}
        var max = emotions[0]
        for (var i=0; i < emotions.length; i++) {
          tmp[emotions[i].Type] = emotions[i].Confidence
          if (i != 0 && emotions[i].Confidence > max.Confidence) { // 가장 큰 감정 타입 탐색
            max = emotions[i]
          }
        }
        tmp.emoType = max.Type
        
        // Graph 표시용
        store.commit('imageResult',data)
        // DB 업로드 데이터
        store.commit('fromAws', tmp)
      }
    });
}
  //Loads selected image and unencodes image bytes for Rekognition DetectFaces API
const ProcessImage = (file) => {
    AnonLog();
    // var file = input.files[0];
    // Load base64 encoded image 
    var reader = new FileReader();
    reader.onload = (function (theFile) {
      return function (e) {
        var img = document.createElement('img');
        var image = null;
        img.src = e.target.result;
        var jpg = true;
        try {
          image = atob(e.target.result.split("data:image/jpeg;base64,")[1]);
        } catch (e) {
          jpg = false;
        }
        if (jpg == false) {
          try {
            image = atob(e.target.result.split("data:image/png;base64,")[1]);
          } catch (e) {
            alert("Not an image file Rekognition can process");
            return;
          }
        }
        //unencode image bytes for Rekognition DetectFaces API 
        var length = image.length;
        var imageBytes = new ArrayBuffer(length);
        var ua = new Uint8Array(imageBytes);
        for (var i = 0; i < length; i++) {
          ua[i] = image.charCodeAt(i);
        }
        //Call Rekognition  
        DetectFaces(imageBytes);
      };
    })(file);
    console.log('detected',file)
    reader.readAsDataURL(file[0]);
    console.log('ok')
}
  //Provides anonymous log on to AWS services
function AnonLog() {
    // Configure the credentials provider to use your identity pool
    AWS.config.region = 'us-east-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:ec9817b2-9e4f-4edb-9528-c5e475d010b4',
    });
    // Make the call to obtain credentials
    AWS.config.credentials.get(function () {
        // Credentials will be available when this function is called.
        var accessKeyId = AWS.config.credentials.accessKeyId;
        var secretAccessKey = AWS.config.credentials.secretAccessKey;
        var sessionToken = AWS.config.credentials.sessionToken;
    });
}
export default ProcessImage