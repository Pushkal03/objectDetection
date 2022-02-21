img = "";
status = "";
objects = [];

function preload(){
    img = loadImage('bedroom.jpg');
}

function setup(){
    canvas = createCanvas(540, 600);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw(){
    image(img,0,0,540,600);
    objectDetector.detect(img, gotResults);

    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        for(i = 0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("no.objects").innerHTML = "Number of Objects Detected Are :" + object.length;

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent +"%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}