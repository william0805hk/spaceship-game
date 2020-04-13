const unitService = {
    addUnit : function(x, y){
        return new Fighter({
            scene: this,
            x: i * 50 + 650,
            y: 700,
            bulletGroup: this.unitBulletGroup, 
            unitGroup: unitGroup,
            targetGroup: enemyGroup,
            initRotationAdj: - Math.PI / 2 
        });
    }
}

export default unitService;