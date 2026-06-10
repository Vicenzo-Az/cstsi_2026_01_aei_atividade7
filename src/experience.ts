import {
    AmbientLight,
    Box3,
    Color,
    DirectionalLight,
    HemisphereLight,
    LoadingManager,
    MathUtils,
    Object3D,
    PerspectiveCamera,
    Scene,
    Vector3,
    WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

const coinObjUrl = "/models/coin/coin.obj";
const coinMtlUrl = "/models/coin/coin.mtl";

export class FinanceActivityExperience {
  private scene: Scene;
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private model: Object3D | null = null;
  private readonly startTime = performance.now();
  private controls: OrbitControls | null = null;
  private readonly stageElement: HTMLElement;
  private readonly statusElement: HTMLElement;

  constructor(stageElement: HTMLElement, statusElement: HTMLElement) {
    this.stageElement = stageElement;
    this.statusElement = statusElement;

    this.scene = new Scene();
    this.scene.background = new Color(0x0c1118);

    this.camera = new PerspectiveCamera(45, 1, 0.1, 100);
    this.camera.position.set(0, 1.0, 6.2);
    this.camera.lookAt(0, 0.15, 0);

    this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    this.stageElement.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.enablePan = false;
    this.controls.minDistance = 3.2;
    this.controls.maxDistance = 10;
    this.controls.minPolarAngle = MathUtils.degToRad(22);
    this.controls.maxPolarAngle = MathUtils.degToRad(86);
    this.controls.target.set(0, 0.12, 0);
    this.controls.update();

    this.initScene();
    this.loadModel();
    this.bindEvents();
    this.resize();
    requestAnimationFrame(() => this.animate());
  }

  private initScene() {
    const ambient = new AmbientLight(0xffffff, 1.05);
    const hemisphere = new HemisphereLight(0x8bb7ff, 0x1b120c, 0.8);
    const key = new DirectionalLight(0xfff0cf, 2.8);
    key.position.set(4, 6, 5);
    const fill = new DirectionalLight(0xffb86b, 0.45);
    fill.position.set(-4, 2, -3);

    this.scene.add(ambient, hemisphere, key, fill);
    this.statusElement.textContent = "Carregando moeda OBJ/MTL...";
  }

  private loadModel() {
    const manager = new LoadingManager();
    const mtlLoader = new MTLLoader(manager);
    const objLoader = new OBJLoader(manager);

    manager.onProgress = (_url, loaded, total) => {
      if (total > 0) {
        const percent = Math.round((loaded / total) * 100);
        this.statusElement.textContent = `Carregando modelo: ${percent}%`;
      }
    };

    manager.onLoad = () => {
      if (!this.model) {
        this.statusElement.textContent = "Modelo carregado com sucesso.";
      }
    };

    manager.onError = () => {
      this.statusElement.textContent = "Erro ao carregar o modelo 3D.";
    };

    mtlLoader.load(
      coinMtlUrl,
      (materials) => {
        materials.preload();
        objLoader.setMaterials(materials);

        objLoader.load(coinObjUrl, (object) => {
          this.prepareModel(object);
        });
      },
      undefined,
      () => {
        this.statusElement.textContent = "Não foi possível ler o arquivo MTL.";
      },
    );
  }

  private prepareModel(object: Object3D) {
    const box = new Box3().setFromObject(object);
    const size = new Vector3();
    const center = new Vector3();

    box.getSize(size);
    box.getCenter(center);

    object.position.sub(center);
    const largestSide = Math.max(size.x, size.y, size.z) || 1;
    const scale = 2.8 / largestSide;
    object.scale.setScalar(scale);
    object.rotation.set(
      MathUtils.degToRad(88),
      MathUtils.degToRad(0),
      MathUtils.degToRad(18),
    );
    object.position.y = -0.15;

    this.scene.add(object);
    this.model = object;
    this.statusElement.textContent = "Moeda carregada e ajustada na cena.";
  }

  private bindEvents() {
    window.addEventListener("resize", () => this.resize());
  }

  private resize() {
    const w = this.stageElement.clientWidth || window.innerWidth;
    const h = this.stageElement.clientHeight || window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
  }

  private animate() {
    const elapsed = (performance.now() - this.startTime) / 1000;

    if (this.model) {
      this.model.rotation.y = elapsed * 0.9;
      this.model.rotation.x =
        MathUtils.degToRad(88) + Math.sin(elapsed * 0.45) * 0.05;
      this.model.rotation.z =
        MathUtils.degToRad(18) + Math.cos(elapsed * 0.35) * 0.05;
      this.model.position.y = -0.15 + Math.sin(elapsed * 1.1) * 0.06;
    }

    this.controls?.update();

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.animate());
  }
}
