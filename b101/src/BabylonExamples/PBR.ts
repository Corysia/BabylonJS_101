import {
    Scene, 
    Engine, 
    FreeCamera,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    CubeTexture,
} from '@babylonjs/core';

export class PBR {

    scene: Scene;
    engine: Engine;

    constructor(private canvas: HTMLCanvasElement) {
        // Create canvas and engine.
        this.canvas = canvas;
        this.engine = new Engine(this.canvas, true);
        this.scene = this.CreateScene();

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    CreateScene(): Scene {
        const scene = new Scene(this.engine);
        const camera = new FreeCamera("camera", new Vector3(0, 1, -5), this.scene);
        camera.attachControl();

        const hemiLight = new HemisphericLight("hemiLight", new Vector3(0, 1, 0), this.scene);
        hemiLight.intensity = 0.5;

        const envTex = CubeTexture.CreateFromPrefilteredData("./images/environment/skybox.env", scene);
        scene.environmentTexture = envTex;
        // scene.createDefaultEnvironment();
        scene.createDefaultSkybox(envTex, true);


        const ground = MeshBuilder.CreateGround("ground", {width: 10, height: 10}, this.scene);

        const ball = MeshBuilder.CreateSphere("ball", {diameter: 1}, this.scene);
        ball.position.y = 1;

        return scene;
    }

}