status = ""; 

objects = [];

function preload() {

}


function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(video, gotResult);
}

function start() {
    objects_name = document.getElementById("object").value;
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
   
}

function draw() {
    image(video, 0, 0, 380, 380);

    
    if (status != "" ) {
        
        objectDetector.detect(video, gotResult);
        for (var i = 0; i < objects.length; i++) {
            if (objects_name == objects[i].label) {
                document.getElementById("status").innerHTML = "Status: objects detected";
                document.getElementById("number_of_objects").innerHTML = "object found";
            }
        
            else{
                document.getElementById("number_of_objects").innerHTML = "object not found";
            }
        
           
            percent = floor(objects[i].confidence *100);
            fill("red");
            text(objects[i].label +" "+ percent +"%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("red");
            rect( objects[i].x , objects[i].y , objects[i].width , objects[i].height);
            
            
        }
    }
}