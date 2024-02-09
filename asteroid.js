//constants 
const FPS = 30;
const shipSize = 30; // size of ship in px
const turnSpeed = 360 //turn speed in deg/sec
const shipThrust = 5; //speed of ship when moving forward 
const friction = .5 //friction value (between 0-1, where 0 is none and 1 is full friction)

// html canvas
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

//placement of ship in the canvas
var ship = {
    x: canvas.width / 2, //start the ship in middle of x axis
    y: canvas.height / 2, //start the ship in middle of y axis
    r: shipSize / 2,
    a: 90 / 180 * Math.PI,  // angle, converted into radians
    rot: 0, //rotation speed
    thrusting: false,
    thrust: {
        x: 0,
        y: 0
    },
}

//event handler to move the ship
document.addEventListener("keydown", keydown)
document.addEventListener("keyup", keyup)

// game loop
setInterval(update, 1000 / FPS)

//keyboard events

function keydown(ev) {
    switch (ev.keyCode) {
        case 37: //left key arrow is clicked (rotate the ship left)
            ship.rot = turnSpeed / 180 * Math.PI / FPS
            break;
        case 38: //up key arrow is clicked (move ship forward)
            ship.thrusting = true
            break;
        case 39: //right key arrow is clicked (rotate the ship right)
            ship.rot = - turnSpeed / 180 * Math.PI / FPS

            break;
    }
}

function keyup(ev) {
    switch (ev.keyCode) {
        case 37: //left key arrow is released (rotate the ship left)
            ship.rot = 0
            break;
        case 38: //up key arrow is released (move ship forward
            ship.thrusting = false

            break;
        case 39: //right key arrow is released (rotate the ship right)
            ship.rot = 0

            break;
    }
}

function update() {

    //draw the background
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height)

    //thrust ship
    if (ship.thrusting) {
        ship.thrust.x += shipThrust * Math.cos(ship.a) / FPS;
        ship.thrust.y -= shipThrust * Math.sin(ship.a) / FPS;

        //draw the thrust
        context.fillStyle = "red";
        context.strokeStyle = "yellow";
        context.lineWidth = shipSize / 10,
            context.beginPath();
        context.moveTo( //starting point of the ship (nose)
            ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + .5 * Math.sin(ship.a)),
            ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - .5 * Math.cos(ship.a))
        );
        context.lineTo( //back left of ship
            ship.x - ship.r * 5 / 3 * Math.cos(ship.a),
            ship.y + ship.r * 5 / 3 * Math.sin(ship.a)
        );
        context.lineTo( //back right of ship
            ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - .5 * Math.sin(ship.a)),
            ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + .5 * Math.cos(ship.a))
        );
        context.closePath();
        context.stroke();
        context.fill();

    } else {
        ship.thrust.x -= friction * ship.thrust.x / FPS
        ship.thrust.y -= friction * ship.thrust.y / FPS

    }

    //create the ship
    context.strokeStyle = "green";
    context.lineWidth = shipSize / 20,
        context.beginPath();
    context.moveTo( //starting point of the ship (nose)
        ship.x + 4 / 3 * ship.r * Math.cos(ship.a),
        ship.y - 4 / 3 * ship.r * Math.sin(ship.a)
    );
    context.lineTo( //back left of ship
        ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + Math.sin(ship.a)),
        ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - Math.cos(ship.a))
    );
    context.lineTo( //back right of ship
        ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - Math.sin(ship.a)),
        ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + Math.cos(ship.a))
    );
    context.closePath();
    context.stroke();

    //rotate the ship
    ship.a += ship.rot;

    //move the ship
    ship.x += ship.thrust.x
    ship.y += ship.thrust.y

    //screen edge - if the ship goes off the edge, it will show up on the opposite side 
    if (ship.x < 0 - ship.r) {
        ship.x = canvas.width + ship.r
    } else if (ship.x > canvas.width + ship.r) {
        ship.x = 0 - ship.r
    }
    if (ship.y < 0 - ship.r) {
        ship.y = canvas.height + ship.r
    } else if (ship.y > canvas.height + ship.r) {
        ship.y = 0 - ship.r
    }

    //center of ship
    context.fillStyle = "white",
        context.fillRect(ship.x - 1, ship.y - 1, 2, 2);


}

