img = "";
status = "";
objects = [];
function preload()
{
 img = loadImage("dog_cat.jpg");
}

function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: detecting object";
}

function modelLoaded()
{
console.log("Model loaded !");
status = true;
objectDetector.detect(video, gotResult);
}

function draw()
{
    image( video, 0, 0, 380, 380);

    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            r = random(225);
            g = random(225);
            b = random(225);
            fill(r,g,b);
            stroke(r,g,b);
            t1 = objects[i].label;
            percent = floor(objects[i].confidence*100);
            text(t1+ " "+percent+ "%" , objects[i].x+15, objects[i].y+15);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are: "+ objects.length;
        }
     
    }

    /** 
    fill("red");
    stroke("red");
    text("Dog", 45, 75);
    noFill();
    rect(30, 60, 350, 350);

    fill("black");
    stroke("red");
    text("Cat", 255, 120);
    
    noFill();
    rect(250, 100, 350, 250);
*/
}
function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        objects = results;
    }
}
