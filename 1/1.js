window.onload = function() {
  
    var file = document.getElementById("thefile");
    var audio = document.getElementById("audio");
    var ctx ,ctx2;
    file.onchange = function() {
      var files = this.files;
      audio.src = URL.createObjectURL(files[0]);
      audio.load();
      audio.play();
      var context = new AudioContext();
      var src = context.createMediaElementSource(audio);
      var analyser = context.createAnalyser();
  
      var canvas = document.getElementById("canvas");
      var canvas2 = document.getElementById("canvas2");
      canvas.width = window.innerWidth;
      canvas2.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas2.height = window.innerHeight;
     
      ctx = canvas.getContext("2d");
      ctx2 = canvas2.getContext("2d");
      ctx.globalAlpha =0.2;
      

       make_image();
  
      src.connect(analyser);
      analyser.connect(context.destination);
  
      analyser.fftSize = 256;
  
      var bufferLength = analyser.frequencyBinCount;
      console.log(bufferLength);
  
      var dataArray = new Uint8Array(bufferLength);
  
      var WIDTH = canvas.width;
      var HEIGHT = canvas.height;
  
      var barWidth = (WIDTH / bufferLength) * 2.5;
      var barHeight;
      var x = 0;
    
      function renderFrame() {
        requestAnimationFrame(renderFrame);
  
        x = 0;
  
        analyser.getByteFrequencyData(dataArray);
    
        ctx2.fillStyle = "#fff";
        ctx2.fillRect(0, 0, WIDTH, HEIGHT);
  
        for (var i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i];
          
          var r = barHeight + (25 * (i/bufferLength));
          var g = 250 * (i/bufferLength);
          var b = 50;
  
          ctx2.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
          ctx2.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
  
          x += barWidth + 1;
        }
      
      }
  
      audio.play();
      renderFrame();
    };
    function make_image(){
        baseimage = new Image();
        baseimage.src = '2.jpg';
      
      
        baseimage.onload =function(){
            ctx.drawImage(baseimage,0,0,window.innerWidth,window.innerHeight);
        }
        
    }
  };
  
  
