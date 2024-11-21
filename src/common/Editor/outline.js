import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
class OutLine{
    constructor(viewer) {
        this.viewer = viewer
        this.composer = null
        this.outlinePass = null
        this.#init()
        
    }
    #init(){
        this.composer = new EffectComposer(this.viewer.renderer);
        const renderPass = new RenderPass(this.viewer.scene, this.viewer.camera);
        this.composer.addPass(renderPass);
      
        this.outlinePass = new OutlinePass(new THREE.Vector2(this.viewer.viewDom.clientWidth,this.viewer.viewDom.clientHeight), this.viewer.scene, this.viewer.camera);
        this.outlinePass.visibleEdgeColor.set(0xff0000); // 可见边缘颜色
        this.outlinePass.hiddenEdgeColor.set(0xffffff); // 隐藏边缘颜色
        this.outlinePass.edgeStrength = 5; // 边缘强度
        this.outlinePass.edgeThickness = 1; // 边缘厚度
        this.composer.addPass(outlinePass);
    }
}

export default OutLine