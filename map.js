/*
Operation Shipment FPS
Created by: Thaoduy Make
Programming Partner: ChatGPT
Version: Alpha 0.1
*/

class GameMap {

    constructor(scene) {
        this.scene = scene;
        this.createGround();
        this.createContainers();
    }

    createGround() {

        const ground = BABYLON.MeshBuilder.CreateGround(
            "ground",
            {
                width: 200,
                height: 200
            },
            this.scene
        );

        const mat = new BABYLON.StandardMaterial(
            "groundMat",
            this.scene
        );

        mat.diffuseColor = new BABYLON.Color3(
            0.30,
            0.65,
            0.30
        );

        ground.material = mat;
    }

    createContainers() {

        const mat = new BABYLON.StandardMaterial(
            "containerMat",
            this.scene
        );

        mat.diffuseColor = new BABYLON.Color3(
            0.15,
            0.35,
            0.85
        );

        const positions = [

            [0,0],
            [6,0],
            [-6,0],

            [0,6],
            [6,6],
            [-6,6],

            [0,-6],
            [6,-6],
            [-6,-6],

            [12,0],
            [-12,0],

            [12,6],
            [-12,6]

        ];

        positions.forEach(p=>{

            const box =
            BABYLON.MeshBuilder.CreateBox(
                "container",
                {
                    width:4,
                    height:2,
                    depth:2
                },
                this.scene
            );

            box.position =
            new BABYLON.Vector3(
                p[0],
                1,
                p[1]
            );

            box.material = mat;

        });

    }

}