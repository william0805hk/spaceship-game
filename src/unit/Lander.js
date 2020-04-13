
import BaseUnit from "./BaseUnit";

class Lander extends BaseUnit {
    constructor({scene, x, y, fillColor, bulletGroup, unitGroup, targetGroup, initRotationAdj}) {
        const unitConfig = {
            tri: '0 30 60 30 60 10 50 0 20 0 10 10 0 10',
            speed: 0,
            rotationSpeed: 0,
            maxHp: 30,
        }
        super(scene, x, y, fillColor, bulletGroup, unitGroup, targetGroup, unitConfig, initRotationAdj);
    }
}

export default Lander;