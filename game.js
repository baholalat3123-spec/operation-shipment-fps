const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

function createScene() {

    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0.53, 0.81, 0.98, 1);

    // Camera
    const camera = new BABYLON.UniversalCamera(
        "camera",
        new BABYLON.Vector3(0, 2, -15),
        scene
    );

    camera.attachControl(canvas, true);
    camera.speed = 0.4;
    camera.angularSensibility = 4000;
    camera.touchAngularSensibility = 4000;
    camera.setTarget(new BABYLON.Vector3(0, 2, 0));

    // Light
    const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );

    light.intensity = 1.2;

    // Ground
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {
        width: 100,
        height: 100
    }, scene);

    const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
    groundMat.diffuseColor = new BABYLON.Color3(0.3, 0.7, 0.3);
    ground.material = groundMat;

    // Container Material
    const containerMat = new BABYLON.StandardMaterial("containerMat", scene);
    containerMat.diffuseColor = new BABYLON.Color3(0.2, 0.4, 0.9);

    function createContainer(x, z) {

        const box = BABYLON.MeshBuilder.CreateBox("box", {
            width: 4,
            height: 2,
            depth: 2
        }, scene);

        box.position = new BABYLON.Vector3(x, 1, z);
        box.material = containerMat;
    }

    // Container Yard
    createContainer(0, 0);
    createContainer(6, 0);
    createContainer(-6, 0);

    createContainer(0, 6);
    createContainer(6, 6);
    createContainer(-6, 6);

    createContainer(0, -6);
    createContainer(6, -6);
    createContainer(-6, -6);

    createContainer(12, 0);
    createContainer(-12, 0);

    createContainer(12, 6);
    createContainer(-12, 6);

    // Enemy Bot
    const bot = BABYLON.MeshBuilder.CreateCapsule("bot", {
        height: 2,
        radius: 0.5
    }, scene);

    bot.position = new BABYLON.Vector3(15, 1, 15);

    const botMat = new BABYLON.StandardMaterial("botMat", scene);
    botMat.diffuseColor = new BABYLON.Color3(1, 0, 0);
    bot.material = botMat;

    // Game Loop
    scene.onBeforeRenderObservable.add(() => {

        // Bot faces player
        bot.lookAt(camera.position);

        // Chase player
        const dx = camera.position.x - bot.position.x;
        const dz = camera.position.z - bot.position.z;

        const distance = Math.sqrt(dx * dx + dz * dz);

        if (distance > 2) {
            bot.position.x += (dx / distance) * 0.03;
            bot.position.z += (dz / distance) * 0.03;
        }

    });

    return scene;
}

const scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener("resize", () => {
    engine.resize();
});