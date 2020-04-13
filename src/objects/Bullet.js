class Bullet extends Phaser.GameObjects.Arc {
    constructor(scene, x, y, range, speed) {
        super(scene, x, y, 2, 0, 360, false, 0xffffff, 1);
        // ...
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.speed = speed;
        this.lifespan = range;
    }
    // ...

    kill(){
        this.setActive(false);
        this.setVisible(false);
        this.body.stop();
    }

    preUpdate(time, delta) {
        this.lifespan -= delta;

        if (this.lifespan <= 0){
            this.kill();
        }
    }

    fire(unit){
        var angle = Phaser.Math.DegToRad(unit.body.rotation);
        this.scene.physics.velocityFromRotation(angle, this.speed, this.body.velocity);
    }
}

export default Bullet;