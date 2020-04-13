import Bullet from "../objects/Bullet";

class BaseUnit extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, bulletGroup, unitGroup, targetGroup, unitConfig, initRotationAdj = 0) {
        super(scene, x, y, key);
        
        scene.add.existing(this);

        this.scene.physics.add.existing(this);
        this.target = null;

        this.speed = unitConfig.speed;
        this.rotationSpeed = unitConfig.rotationSpeed * Math.PI;
        this.maxHp = unitConfig.maxHp;
        this.tolerance = 0.02 * this.rotationSpeed;

        this.hp = this.maxHp;
        this.range = unitConfig.range;
        this.bulletSpeed = unitConfig.bulletSpeed;
        this.bulletAngle = unitConfig.bulletAngle || 10;
        this.reloadCd = unitConfig.reloadCd;
        this.rotation = this.rotation + initRotationAdj; // Math.PI/2;

        this.setInteractive();

        scene.input.setDraggable(this);

        this.bulletGroup = bulletGroup;

        this.unitGroup = unitGroup;
        this.unitGroup.add(this);

        this.targetGroup = targetGroup;

        this.initPosition = {
            x: x, 
            y: y,
            initRotationAdj: initRotationAdj
        }

        this.isWeaponReady = true;
    }

    preUpdate(time, delta) {
        if(this.hp <= 0){
            this.kill();
        }
    }

    seek(){
        if (this.target){
            let angle = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y);
            this.scene.physics.velocityFromRotation(this.rotation, this.speed, this.body.velocity);
            var angleDelta = Phaser.Math.Angle.Wrap(angle - this.rotation);

            if (Phaser.Math.Within(angleDelta, 0, this.tolerance)) {
                // this.rotation = angle;
                this.body.setAngularVelocity(0);
            } else {
                this.body.setAngularVelocity(Math.sign(angleDelta) * Phaser.Math.RadToDeg(this.rotationSpeed));
            }
        }
    }
    
    flee(){
        if (this.target){
            let angle =  Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y);
            this.scene.physics.velocityFromRotation(-this.rotation, this.speed, this.body.velocity);
            var angleDelta = Phaser.Math.Angle.Wrap(angle - this.rotation);

            if (Phaser.Math.Within(angleDelta, 0, this.tolerance)) {
                // this.rotation = angle;
                this.body.setAngularVelocity(0);
            } else {
                this.body.setAngularVelocity(Math.sign(angleDelta) * Phaser.Math.RadToDeg(this.rotationSpeed));
            }
        }
    }

    searchTarget(){
        if (this.targetGroup){
            let nearestTarget = null;
            this.targetGroup.getChildren().map(unit => {
                if (unit.active){
                    const targetDistance = Phaser.Math.Distance.Between(this.x, this.y, unit.x, unit.y);
                    let nearestTargetDistance = null;
                    if (nearestTarget){
                        nearestTargetDistance = Phaser.Math.Distance.Between(this.x, this.y, nearestTarget.x, nearestTarget.y);
                    }
                    if (!nearestTarget || targetDistance < nearestTargetDistance){
                        nearestTarget = unit;
                    }
                }
            })
            this.target = nearestTarget;
        }
    }

    fire(unit){
        if (unit && unit.target && unit.active && unit.isWeaponReady) {
        let angle = Phaser.Math.Angle.Between(unit.x, unit.y, unit.target.x, unit.target.y);
        var angleDelta = Phaser.Math.Angle.Wrap(angle - unit.rotation);
        let shouldFire = Phaser.Math.Within(angleDelta, 0, unit.tolerance * 10)

            if (shouldFire){
                const targetDistance = Phaser.Math.Distance.Between(unit.x, unit.y, unit.target.x, unit.target.y);
                if (targetDistance < unit.range){
                    unit.isWeaponReady = false;

                    var bullet = new Bullet(unit.scene,unit.x,unit.y,unit.range, unit.bulletSpeed);
                    unit.bulletGroup.add(bullet);
                    bullet.fire(unit)

                    unit.reload = unit.scene.time.delayedCall(unit.reloadCd, (unit) => {unit.isWeaponReady = true}, [unit]);
                }
            }
        }
    }

    kill(){
        this.setActive(false);
        this.setVisible(false);
        this.body.stop();
    }

    keepFormation(){
        
        const targetDistance = Phaser.Math.Distance.Between(this.x, this.y, this.initPosition.x, this.initPosition.y);
        let angle = targetDistance > 10 
            ? Phaser.Math.Angle.Between(this.x, this.y, this.initPosition.x, this.initPosition.y)
            : this.initPosition.initRotationAdj;

        let speed = targetDistance < 100 ? this.speed * targetDistance / 100 : this.speed;
        if (targetDistance < 10){
            speed = 0;
        }
        this.scene.physics.velocityFromRotation(this.rotation, speed, this.body.velocity);

        var angleDelta = Phaser.Math.Angle.Wrap(angle - this.rotation);

        if (Phaser.Math.Within(angleDelta, 0, this.tolerance)) {
            this.body.setAngularVelocity(0);
        } else {
            this.body.setAngularVelocity(Math.sign(angleDelta) * Phaser.Math.RadToDeg(this.rotationSpeed));
        }
    }
}

export default BaseUnit;