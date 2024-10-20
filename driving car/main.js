const canvas = document.getElementById("myCanvas");
// the constant variable canvas holds the reference to the HtML elemennt that has the id to "myCanvas"
//canvas.height = window.innerHeight;
//the hight would be basically the height of the windpw
canvas.width=200;

const ctx = canvas.getContext("2d");
// canvas.getContext("2d") gets a CanvasRenderingContext2D object, which provides methods and properties to draw and manipulate graphics on the canvas
const road = new Road(canvas.width/2,canvas.width*.90)
const car = new Car( 100,200,20,50);

car.draw(ctx);    
animate();

function animate(){
    //canvas.height = window.innerHeight;
    car.update();
    //update would listen for the key and continue to update based on what it is pressed
    canvas.height = window.innerHeight;
    road.draw(ctx);
    car.draw(ctx); 
    
    //canvas.height = window.innerHeight;
    requestAnimationFrame(animate);
}
//requestAnimationFrame calles the animate function again and again so it can "update" the drawing (gives the illusion of moving )
