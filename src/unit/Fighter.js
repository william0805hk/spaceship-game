import BaseUnit from "./BaseUnit";

class Fighter extends BaseUnit {
    constructor({scene, x, y, bulletGroup, unitGroup, targetGroup, initRotationAdj}) {

        const unitConfig = {
            tri: '20 10 0 20 0 0',
            speed: 80,
            rotationSpeed: 0.3,
            maxHp: 5,
            range: 500,
            bulletSpeed: 500,
            reloadCd: 500,
        }
        const key = "fighter";
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
        // if (this.hp <= 1){
        //     this.flee();
        // }else {
            if (this.target){
                this.seek();
            }else {
                this.keepFormation();
            }
        // }
        // this.traceTarget();
    }
}

export default Fighter;