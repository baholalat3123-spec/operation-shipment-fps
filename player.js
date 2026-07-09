class Player {

    constructor(scene, canvas) {

        this.camera = new BABYLON.UniversalCamera(
            "player",
            new BABYLON.Vector3(0, 2, -15),
            scene
        );

        this.camera.attachControl(canvas, true);

        this.camera.speed = 0.35;
        this.camera.angularSensibility = 4000;
        this.camera.touchAngularSensibility = 4000;

        this.health = 100;
        this.ammo = 30;
    }

    getCamera() {
        return this.camera;
    }

}