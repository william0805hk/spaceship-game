import BaseUnit from "./BaseUnit";

class Destroyer extends BaseUnit {
    constructor({scene, x, y, bulletGroup, unitGroup, targetGroup, initRotationAdj}) {

        const unitConfig = {
            tri: '0 12 0 18 6 24 12 24 12 30 36 18 36 12 12 0 12 6 6 6',
            speed: 70,
            rotationSpeed: 0.4,
            maxHp: 12,
            range: 500,
            bulletSpeed: 500,
            reloadCd: 350,
        }
        const key = "destroyer";
        super(scene, x, y, key, bulletGroup, unitGroup, targetGroup, unitConfig, initRotationAdj);

        this.fireEvent = scene.time.addEvent({
            delay: 100,
            callback: this.fire,
            args: [this],
            callbackScope: [],
            loop: true
        });
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta)
        this.searchTarget();
        if (this.target){
            this.seek();
        }else {
            this.keepFormation();
        }
    }
}

export default Destroyer;