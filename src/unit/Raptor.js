import BaseUnit from "./BaseUnit";

class Raptor extends BaseUnit {
    constructor({scene, x, y, bulletGroup, unitGroup, targetGroup, initRotationAdj}) {

        const unitConfig = {
            tri: '0 16 8 24 8 16 24 12 8 8 8 0 0 8',
            speed: 110,
            rotationSpeed: 0.4,
            maxHp: 3,
            range: 500,
            bulletSpeed: 500,
            reloadCd: 400,
        }
        const key = "raptor";
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

export default Raptor;