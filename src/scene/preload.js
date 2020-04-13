import raptor from "../../public/img/units/raptor.png";
import fighter from '../../public/img/units/Fighter/Fighter.png';
import destroyer from '../../public/img/units/Destroyer/Destroyer.png';
import sentinel from '../../public/img/units/Sentinel/Sentinel.png';

export function preload() {
    this.load.image('raptor', raptor);
    this.load.image('fighter', fighter);
    this.load.image('destroyer', destroyer);
    this.load.image('sentinel', sentinel);
}
