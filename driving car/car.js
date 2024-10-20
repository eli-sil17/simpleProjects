class Car{
    constructor(x,y,width,height,color="black"){
        this.width= width;
        this.height=height;
        this.x=x;
        this.y=y;
        this.color = color;
        this.orginalColor=color;
        

        
        this.speed=0;
        this.acceleration=0.2;
        this.maxSpeed=3;
        this.friction=0.05;
        this.angle=0;

        this.controls = new Controls();
    }
    //remeber when you increase the value of v it goes down 
    //# means that it is a provate function
    update(){
       this.#move();
       if(this.speed<0){this.color="red";}
       else{this.color=this.orginalColor;}

    }
    #move(){
        if(this.controls.forward){
            this.speed+=this.acceleration;
        }
        if(this.controls.reverse){
            this.speed-=this.acceleration;
            //this.color="red";
        }
        if(this.speed>this.maxSpeed){
            this.speed=this.maxSpeed;
        }
        //this is if the car is going backwards(it only goes half the max speed as suppose going foward)
        if(this.speed<-this.maxSpeed/2){
            this.speed=-this.maxSpeed/2;
        }
        //when going forward the speed will decreased due to the fiction 
        if(this.speed>0){
            this.speed-=this.friction;
        }
        //when going backwards the speed will increase due to the fiction
        if(this.speed<0){
            this.speed+=this.friction;
        }
        if(Math.abs(this.speed)<this.friction){
            this.speed=0;
        }
        // if the speed is greater than 1 go foward and if not chage the value to a negative number 
       if(this.speed!=0){
        const flip = this.speed>0?1:-1;
       
       //if the speed it's not 0 it "flips" it so it can use the controls backwards
        if(this.controls.right){
            this.angle-=0.03*flip;
        }
        if(this.controls.left){
            this.angle+=0.03*flip;
        }
    }
    
        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;

    }

    draw(ctx){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle);
        ctx.beginPath();
        //starts a new path by emptying the list of sub-paths
        ctx.rect(-this.width/2, -this.height/2,this.width,this.height);
        //ctx(x,y,width, height)
        ctx.fillStyle = this.color;
        ctx.fill();
        //this would fill in the rectangle
        ctx.restore();
    }
}//the x of the car would be the center inside the car
