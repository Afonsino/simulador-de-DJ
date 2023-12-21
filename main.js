function preload(){
    song = loadSound("music.mp3");
}
rightWristX=0;
rightWristY=0;
leftWristY=0;
leftWristX=0;

function setup(){
canvas = createCanvas(600,500);
canvas.center();
video = createCapture(VIDEO);
video.hide();
poseNet = ml5.poseNet(video,modelLoaded);
poseNet.on("pose", gotPoses);
}
function modelLoaded(){
    console.log("poseNet foi inicializado")
}
function gotPoses(results){
if (results.length > 0){
    console.log(results);
    leftWristY = results[0].pose.leftWrist.y;
    leftWristX = results[0].pose.leftWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    rightWristX = results[0].pose.rightWrist.x;
}
}
function draw(){
    image(video,0,0,600,500);
    fill("cyan");
    stroke("cyan");

    circle(leftWristX, leftWristY, 20);
    leftWristYNumero = Number(leftWristY)
    ajustado = floor(leftWristYNumero)

    volume=ajustado/500

    document.getElementById("volume").innerHTML = "Volume = "+volume;
    song.setVolume(volume)

    circle(rightWristX, rightWristY, 20);
    rightWristYNumero = Number(rightWristY)
    ajustado = floor(rightWristYNumero)

    if(rightWristY >= 0 && rightWristY <= 100) {
        document.getElementById("velocidade").innerHTML = "Velocidade = 0.5x";
     r=0.5
    }
    else if(rightWristY >=100 && rightWristY <= 200) {
        document.getElementById("velocidade").innerHTML = "Velocidade = 1.0x";
     r=1.0
    }
    else if(rightWristY >=200 && rightWristY <= 300) {
        document.getElementById("velocidade").innerHTML = "Velocidade = 1.5x";
     r=1.5
    }
    else if(rightWristY >=300 && rightWristY <= 400) {
        document.getElementById("velocidade").innerHTML = "Velocidade = 2.0x";
     r=2.0
    }
    else if(rightWristY >=400 && rightWristY <= 500) {
        document.getElementById("velocidade").innerHTML = "Velocidade = 2.5x";
     r=2.5
    }
    song.rate(r);
}
function reproduzir(){
song.play();

}