images = "";
img = "";
status = "";
object = [];
function preload(){
    images = loadImage("download.png");
    console.log(image);
}
function setup(){
    canvas = createCanvas(380,380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd',loaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}
function loaded(){
    console.log("Model has been loaded");
    objectDetector.detect(video, results);
    status = true;
}
function results(error,result){
    if(error){
        console.error(error);
    }else{
        console.log(result);
        document.getElementById("status").innerHTML = "Status : Objects Detected";
        object = result;
    }
}
function draw(){
    image(video,0,0,380,380);
    if(status != ""){
        objectDetector.detect(video, results);
        r = random(255);
        g = random(255);
        b = random(255);
        for(i = 0;i<object.length;i++){
            fill(r,g,b);
            percent = Math.floor(object[i].confidence*100);
            document.getElementById("objects").innerHTML = "The number of elements are "+object.length;
            text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
}
function apply(){
    File = document.getElementById("FILE").files;
var reader = new FileReader;
reader.onload = function(event){
    img = event.target.result;
    console.log(event);
    newI = new Image(620,480);
newI.src = img;
newI.onload = function(){
    console.log("Width - "+newI.width+" Height - "+newI.height);
    images = loadImage(newI.src);
}
};
base = reader.readAsDataURL(File[0]);

setTimeout(function(){
    console.log("bye")
objectDetector.detect(newI, results);
status = true;
console.log("hello!!!");
},1500);
}
