//constants 
const FPS = 30;
const shipSize = 30; // size of ship in px
const turnSpeed = 360 //turn speed in deg/sec

// html canvas
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

//placement of ship in the canvas
var ship = {
    x: canvas.width /2, //start the ship in middle of x axis
    y: canvas.height /2, //start the ship in middle of y axis
    r: shipSize /2,  
    a: 90/180 * Math.PI,  // angle, converted into radians
    rot: 0 //rotation speed
}

//event handler to move the ship
document.addEventListener("keydown", keydown)
document.addEventListener("keyup", keyup)

// game loop
setInterval(update, 1000/FPS)

//keyboard events

function keydown(ev) {
    switch (ev.keyCode) {
        case 37: //left key arrow (rotate the ship left)
            ship.rot = turnSpeed/180 * Math.PI /FPS
        break;
        case 38: //up key arrow (move ship forward

        break;
        case 39: //right key arrow (rotate the ship right)
             ship.rot = - turnSpeed/180 * Math.PI /FPS

        break;
    }
}

function keyup(ev) {
    switch (ev.keyCode) {
        case 37: //left key arrow (rotate the ship left)
            ship.rot = 0
        break;
        case 38: //up key arrow (move ship forward

        break;
        case 39: //right key arrow (rotate the ship right)
             ship.rot = 0

        break;
    }
}

function update() {

//draw the background
context.fillStyle = "black";
context.fillRect(0, 0, canvas.width, canvas.height)

//create the ship
context.strokeStyle = "red",
context.lineWidth - shipSize/20,
context.beginPath(); 
context.moveTo( //starting point of the ship (nose)
    ship.x + 4/3 * ship.r * Math.cos(ship.a),
    ship.y - 4/3 * ship.r * Math.sin(ship.a)
);
context.lineTo( //back left of ship
    ship.x - ship.r * (2/3 * Math.cos(ship.a) + Math.sin(ship.a)),
    ship.y + ship.r * (2/3 * Math.sin(ship.a) - Math.cos(ship.a))
);
context.lineTo( //back right of ship
    ship.x - ship.r * (2/3 * Math.cos(ship.a) - Math.sin(ship.a)),
    ship.y + ship.r * (2/3 * Math.sin(ship.a) + Math.cos(ship.a))
);
context.closePath();
context.stroke();

//rotate the ship
ship.a += ship.rot;

//move the ship


//center of ship
context.fillStyle = "white",
context.fillRect (ship.x -1, ship.y -1, 2, 2);


}

