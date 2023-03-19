const { createFFmpeg } = FFmpeg;
const ffmpeg = createFFmpeg({
  log: true
});

const transcode = async (webcamData) => {
  const message = document.getElementById('message');
  const name = 'record.mp4';
  await ffmpeg.load();
  message.innerHTML = 'Start transcoding';
  await ffmpeg.write(name, webcamData);
  await ffmpeg.transcode(name,  'output.mp4');
  message.innerHTML = 'Complete transcoding';
  const data = ffmpeg.read('output.mp4');

  const video = document.getElementById('output-video');
  video.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
  dl.href = video.src;
  dl.innerHTML = "download mp4"
}

fn().then(async ({url, blob})=>{
    transcode(new Uint8Array(await (blob).arrayBuffer()));
})

function fn() {
var recordedChunks = [];

var time = 0;

var canvas = document.getElementById("canvas2");

return new Promise(function (res, rej) {
    var stream = canvas.captureStream(60);

    mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm; codecs=vp9"
        // mimeType: "video/mp4; codecs=vp9"
    });

    document.getElementById("start").addEventListener('click',function(){
        mediaRecorder.start(time);
    });
    document.getElementById("stop").addEventListener('click',function(){
        mediaRecorder.stop();
    });
    

    mediaRecorder.ondataavailable = function (e) {
        recordedChunks.push(event.data);
        // for demo, removed stop() call to capture more than one frame
    }

    mediaRecorder.onstop = function (event) {
        var blob = new Blob(recordedChunks, {
            "type": "video/webm"
        });
        var url = URL.createObjectURL(blob);
        res({url, blob}); // resolve both blob and url in an object

        myVideo.src = url;
        console.log(url);
        // removed data url conversion for brevity
    }

// for demo, draw random lines and then stop recording
// var i = 0,
// tid = setInterval(()=>{
// //   if(i++ > 20) { // draw 20 lines
//     clearInterval(tid);
//     mediaRecorder.stop();
// //   }
// //   let canvas = document.querySelector("canvas");
// //   let cx = canvas.getContext("2d");
// //   cx.beginPath();
// //   cx.strokeStyle = 'green';
// //   cx.moveTo(Math.random()*100, Math.random()*100);
// //   cx.lineTo(Math.random()*100, Math.random()*100);
// //   cx.stroke();
// },4000)

function stop(){    
    clearInterval(tid);
    mediaRecorder.stop();
    alert("s");
}

});
}