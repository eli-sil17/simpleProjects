//"y" on a computer grows on a computer 
class Road{
    constructor(x,width,laneCount=4){
        this.x=x;
        this.width=width;
        this.laneCount=laneCount;

        this.left=x-width/2;
        this.right=x+width/2;
        const infinity= 1000000;
        this.top =-infinity;
        this.bottom= infinity;

    }

    draw(ctx){
    ctx.lineWidth=5;
    ctx.strokeStyle="yellow";
    //linear interpolation: determines the horizontal position of each lane line based on the left and right boundaries.
    for (let i=0;i<=this.laneCount;i++){
        const x = lerp(
            this.left,
            this.right,
            i/this.laneCount

        );
        if( i>0 && i<this.laneCount){
            ctx.setLineDash([20,20]);
        }
        else{ctx.setLineDash([])}
    
        ctx.beginPath();
        ctx.moveTo(x,this.top);
        ctx.lineTo(x,this.bottom);
        ctx.stroke();
    }
      
    }

}
//one way to see the function is that when i is 0 then you're just left with A (the left side)
//when t is 1 it would cancel A and just be left with be 
//function lerp(A,B,t){
   // return A+(B-A)*t;
//}