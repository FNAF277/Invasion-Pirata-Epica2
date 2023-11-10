class Boat{
    constructor(x,y,width,height,Boat_position,Boat_animation){
       
        this.animation=Boat_animation;
        this.speed=0.05;
        this.body=Bodies.rectangle(x,y,width,height);
        this.width=width;
        this.height=height;
        this.Boat_position=Boat_position;
        this.isBroken=false;
        World.add(world,this.body);
    }
    animate(){
        this.speed+=0.05;
    }
    display(){
        var index=floor(this.speed%this.animation.length);
        push();
        translate(this.body.position.x,this.body.position.y);
        imageMode(CENTER);
        image(this.animation[index],0,this.Boat_position,this.width,this.height);
        pop();
    }
    remove(index){
        this.animation=boatCrashesAnimation;
        this.speed=0.05;
        this.width=300;
        this.height=300;
        this.isBroken=true;
        setTimeout(()=>{
            Matter.World.remove(world,this.body);
            delete boats[index];
        },2000);
    }
}