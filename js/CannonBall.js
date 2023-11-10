class CannonBall {
    constructor(x,y){
        var options={
            isStatic:true
        };
        this.r=30;
        this.speed=0.05;
        this.body=Bodies.circle(x,y,this.r,options);
        this.cannonBall_img=loadImage("./assets/cannonball.png");
        this.animation=[this.cannonBall_img];
        this.isSink=false;    
        World.add(world,this.body);                 
    }
    animate(){
        this.speed+=0.05;
    }
    display(){
        var angle=this.body.angle;
        var index=floor(this.speed%this.animation.length);
        var pos=this.body.position;
        push()
        translate(pos.x,pos.y);
        rotate(angle);
        imageMode(CENTER)
        image(this.animation[index],0,0,this.r,this.r);
        pop()
    }
    shoot(){
        var new_angle=cannon.angle-28;
        new_angle=new_angle * 3.14 / 180;
        var velocity=p5.Vector.fromAngle(new_angle);
        velocity.mult(0.4);
        Matter.Body.setStatic(this.body,false);
        Matter.Body.setVelocity(this.body,{
            x:velocity.x*180/3.14,
            y:velocity.y*180/3.14
        });
    }
    remove(index){
        this.isSink=true;
        Matter.Body.setVelocity(this.body,{x:0,y:0})
        this.animation=cannonBallSplashAnimation;
        this.speed=0.05;
        this.r=100;
        setTimeout(()=>{
            Matter.World.remove(world,this.body)
            delete cannonBalls[index];
        },100);
    }
}