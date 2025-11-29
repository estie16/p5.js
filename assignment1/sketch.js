function setup() {
  createCanvas(600, 400);
  background(255);
  
}

function draw() {
  
  strokeWeight(0);
  fill('#E0FFC0');
  rect(0,0,600,400);
  
  strokeWeight(2);
  
  fill('#804000');
  rect(200, 300, 200, 100);
  
  fill('#FFB266');
  triangle(250, 200, 350, 200, 300, 300);
  
  fill('#FFCCCC');
  ellipse(300, 150, 100, 100);
  
  fill('#FF6666');
  ellipse(300, 85, 30, 30);
  
  fill('#FFFF99');
  arc(452,100,150,150,radians(173),radians(110));
  line(378,110,450,100);
  line(426,169,450,100);
  
  
  line(270,200,270,240);
  line(300,300,300,200);
  line(330,200,330,240);
  line(310,45,300,75);
 
  
  
  strokeWeight(14);
  point(443,75);
  
  
}