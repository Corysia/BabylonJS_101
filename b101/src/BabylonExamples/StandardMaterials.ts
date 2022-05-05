import {
    Scene,
    Engine,
    FreeCamera,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    StandardMaterial,
    Texture,
} from '@babylonjs/core';

export class StandardMaterials {

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
        camera.speed = 0.25;

        const hemiLight = new HemisphericLight("hemiLight", new Vector3(0, 1, 0), this.scene);
        hemiLight.intensity = 1.0;

        const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, this.scene);

        const ball = MeshBuilder.CreateSphere("ball", { diameter: 1 }, this.scene);
        ball.position.y = 1;

        ground.material = this.CreateGroundMaterial();
        ball.material = this.CreateBallMaterial();
        return scene;
    }

    CreateGroundMaterial(): StandardMaterial {
        const groundMat = new StandardMaterial("groundMat", this.scene);
        const uvScale = 4;
        const texArray: Texture[] = [];
        const normalTex = new Texture("./images/stone/cobblestone_05_nor_gl_1k.jpg", this.scene);
        const aoTex = new Texture("./images/stone/cobblestone_05_ao_1k.jpg", this.scene);
        const specTex = new Texture("./images/stone/cobblestone_05_spec_1k.jpg", this.scene);
        const diffuseTex = new Texture("./images/stone/cobblestone_05_diff_1k.jpg", this.scene);

        groundMat.diffuseTexture = diffuseTex;
        groundMat.bumpTexture = normalTex;
        groundMat.ambientTexture = aoTex;
        groundMat.specularTexture = specTex;
        texArray.push(diffuseTex);
        texArray.push(normalTex);
        texArray.push(aoTex);
        texArray.push(specTex);

        texArray.forEach(tex => {
                tex.uScale = uvScale;
                tex.vScale = uvScale;
        });
        return groundMat;
    }

    CreateBallMaterial(): StandardMaterial {
        const ballMat = new StandardMaterial("ballMat", this.scene);
        const uvScale = 1;
        const texArray: Texture[] = [];
        const normalTex = new Texture("./images/metal/metal_plate_nor_gl_1k.jpg", this.scene);
        const aoTex = new Texture("./images/metal/metal_plate_ao_1k.jpg", this.scene);
        const specTex = new Texture("./images/metal/metal_plate_spec_1k.jpg", this.scene);
        const diffuseTex = new Texture("./images/metal/metal_plate_diff_1k.jpg", this.scene);

        ballMat.diffuseTexture = diffuseTex;
        ballMat.bumpTexture = normalTex;
        ballMat.invertNormalMapX = true;
        ballMat.invertNormalMapY = true;
        ballMat.ambientTexture = aoTex;
        ballMat.specularTexture = specTex;
        ballMat.specularPower = 1;
        texArray.push(diffuseTex);
        texArray.push(normalTex);
        texArray.push(aoTex);
        texArray.push(specTex);

        texArray.forEach(tex => {
                tex.uScale = uvScale;
                tex.vScale = uvScale;
        });
        return ballMat;
    }
}