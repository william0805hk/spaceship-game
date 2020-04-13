import BaseUnit from "./BaseUnit";

class Sentinel extends BaseUnit {
    constructor({scene, x, y, bulletGroup, unitGroup, targetGroup, initRotationAdj}) {

        const unitConfig = {
            tri: '0 6 0 18 6 24 18 24 24 18 24 6 18 0 6 0',
            speed: 30,
            rotationSpeed: 0.8,
            maxHp: 12,
            range: 1500,
            bulletSpeed: 1000,
            reloadCd: 700,
        }
        const key = "sentinel";
        super(scene, x, y, key, bulletGroup, unitGroup, targetGroup, unitConfig, initRotationAdj);

        this.fireEvent = scene.time.addEvent({
            delay: 500,
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

export default Sentinel;