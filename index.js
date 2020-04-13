import Phaser from "phaser";
import Fighter from './src/unit/Fighter';
import Raptor from "./src/unit/Raptor";
import Lander from "./src/unit/Lander";
import Sentinel from "./src/unit/Sentinel";
import Destroyer from "./src/unit/Destroyer";
import { preload } from './src/scene/preload';

var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            // fps: 60,
            gravity: { y: 0 }
        }
    },
    scene: [{
        preload: preload,
        create: create,
        update: update
    }]
};

var game = new Phaser.Game(config);

function create() {

    this.unitBulletGroup = this.physics.add.group([], {});
    this.enemyBulletGroup = this.physics.add.group([], {});

    var unitGroup = this.physics.add.group([], {});
    var enemyGroup = this.physics.add.group([], {});

    // new Lander({
    //     scene: this,
    //     x: 1024/2,
    //     y: 720,
    //     fillColor: 0x0000ff,
    //     bulletGroup: this.unitBulletGroup, 
    //     unitGroup: unitGroup,
    //     targetGroup: enemyGroup,
    //     initRotationAdj: - Math.PI / 2 
    // });

    new Sentinel({
        scene: this,
        x: 1024/2 + 50,
        y: 720,
        bulletGroup: this.unitBulletGroup, 
        unitGroup: unitGroup,
        targetGroup: enemyGroup,
        initRotationAdj: - Math.PI / 2 
    });

    new Destroyer({
        scene: this,
        x: 1024/2 + 150,
        y: 720,
        bulletGroup: this.unitBulletGroup, 
        unitGroup: unitGroup,
        targetGroup: enemyGroup,
        initRotationAdj: - Math.PI / 2 
    });

    for (let i = 0; i < 3; i++) {
        new Fighter({
            scene: this,
            x: i * 50 + 650,
            y: 700,
            bulletGroup: this.unitBulletGroup, 
            unitGroup: unitGroup,
            targetGroup: enemyGroup,
            initRotationAdj: - Math.PI / 2 
        });
    }

    for (let i = 0; i < 5; i++) {
        new Raptor({
            scene: this,
            x: i * 50 + 500,
            y: 600,
            bulletGroup: this.unitBulletGroup, 
            unitGroup: unitGroup,
            targetGroup: enemyGroup,
            initRotationAdj: - Math.PI / 2 
        })
        new Raptor({
            scene: this,
            x: i * 50 + 500,
            y: 650,
            bulletGroup: this.unitBulletGroup, 
            unitGroup: unitGroup,
            targetGroup: enemyGroup,
            initRotationAdj: - Math.PI / 2 
        })
    }

    this.physics.add.overlap(this.unitBulletGroup, enemyGroup, ((bullet, enemy) => {
        if (bullet.active && enemy.active){
            enemy.hp -=1;
            bullet.kill(); 
        }
    }), null, this);

    this.physics.add.overlap(this.enemyBulletGroup, unitGroup, ((bullet, unit) => {
        if (bullet.active && unit.active){
            unit.hp -=1;
            bullet.kill(); 
        }
    }), null, this);

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
        gameObject.initPosition.x = dragX;
        gameObject.initPosition.y = dragY;
    });

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    });



    var sprite = this.add.sprite(400, 300, 'eye').setInteractive();

    sprite.on('pointerdown', function (pointer) {
        sprite.setTint(0xff0000);
    });

    sprite.on('pointerup', (pointer) => {
        sprite.clearTint();

        for (let i = 0; i < 3; i++) {
            new Fighter({
                scene: this,
                x: i * 50 + 50,
                y: -150,
                bulletGroup: this.enemyBulletGroup, 
                unitGroup: enemyGroup,
                targetGroup: unitGroup,
                initRotationAdj: Math.PI / 2 
            });
        }

        for (let i = 0; i < 3; i++) {
            new Fighter({
                scene: this,
                x: i * 50 + 550,
                y: -150,
                bulletGroup: this.enemyBulletGroup, 
                unitGroup: enemyGroup,
                targetGroup: unitGroup,
                initRotationAdj: Math.PI / 2 
            });
        }
    });

    this.gold = 100;
    this.goldLabel = this.add.text(10, 10, 'Gold: ' + this.gold, { font: '16px Courier', fill: '#00ff00' });
    
    var addPlane = this.add.sprite(100, 700, 'eye').setInteractive();


    addPlane.on('pointerdown', function (pointer) {
        addPlane.setTint(0xff0000);
    });

    addPlane.on('pointerup', (pointer) => {
        addPlane.clearTint();

        if (this.gold > 10){
            this.gold -= 10;
            new Fighter({
                scene: this,
                x: 1024/2 - 150,
                y: 720,
                bulletGroup: this.unitBulletGroup, 
                unitGroup: unitGroup,
                targetGroup: enemyGroup,
                initRotationAdj: - Math.PI / 2 
            });
        }
    });
}

function update(){
    this.goldLabel.setText('Gold: ' + this.gold);
    // var camera = this.cameras.main;
    // camera.setZoom(0.5)
}