// 创建场景 
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {CSS2DRenderer} from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import targetEvent from './targetEvent'
import outLine  from './outLine'

class Viewer {
    // 创景id
    constructor(id) {
        this.id = id
        this.renderer = undefined
        this.scene = undefined
        this.camera = undefined
        this.controls = undefined
        this.modelSelectOutLine=null
        this.r2DRenderList=[]
        this.#initViewer()

    }
    #initViewer() {
        //渲染器
        this.#initRenderer()
        //相机
        this.#initCamera()
        //场景
        this.#initScene()
        //控制器
        this.#initControl()
        //灯光
        this.#initLight()

        //模型选中
        this.#modelSelect()
        const animate = () => {
            requestAnimationFrame(animate);
            //更新dom
            this.#renderScene()
            //更新视图
            this.#renderSet()
        }

    }
    /**
    * 添加坐标轴
    */
    addAxis() {
        // 显示坐标轴(x轴: 红色; y轴: 绿色; z轴: 蓝色)
        // x轴水平方向(右正); y轴垂直方向(上正); z轴垂直xy平面即屏幕(外正)
        this.scene.add(new AxesHelper(100))
    }
    /*
    * 模型显示边框,参数是传入的模型
    */
    addModelBorder(model) {
        const geo = new THREE.EdgesGeometry(model);
        //创建线条
        const material = new THREE.LineBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.5, depthWrite: false });
        const line = new THREE.LineSegment(geo, material)
        this.scene.add(line)

    }

    //渲染更新
    #renderSet() {
        this.controls.update()
        //重新设置相机视椎体的宽高比
        this.camera.aspect = this.viewerDom.clientWidth / this.viewerDom.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.viewerDom.clientWidth, this.viewerDom.clientHeight) // 设置渲染器的尺寸
        this.renderer.setPixelRatio(window.devicePixelRatio) // 设置渲染器的像素比
    }
    #renderScene() {
        this.renderer.render(this.scene, this.camera)
    }
    //创建创景
    #initScene(color) {
        this.scene = new THREE.Scene()
        this.scene.background = color || new THREE.Color(0x000000)
    }
    //创建相机
    #initCamera() {
        this.camera = new THREE.PerspectiveCamera(45, this.viewerDom.clientWidth / this.viewerDom.clientHeight, 0.1, 1000)
        this.camera.position.set(50, 0, 50)
        this.camera.lookAt(0, 0, 0)
    }
    //创建渲染器
    #initRenderer() {
          
        this.viewDom = document.getElementById(this.id)
        this.renderer = new THREE.WebGLRenderer({
            antialias: true, // true/false表示是否开启反锯齿
            alpha: true, // true/false 表示是否可以设置背景色透明
            precision: "highp", // highp/mediump/lowp 表示着色精度选择
            premultipliedAlpha: true, // true/false 表示是否可以设置像素深度（用来度量图像的分辨率）
        })

        this.viewDom.appendChild(this.renderer.domElement)


  

    // 三维标签
    this.css3DRenderer = new CSS3DRenderer() // 标签渲染器
    this.css3DRenderer.domElement.style.zIndex = 0
    this.css3DRenderer.domElement.style.position = 'absolute'
    this.css3DRenderer.domElement.style.top = '0px'
    this.css3DRenderer.domElement.style.left = '0px'
    this.css3DRenderer.domElement.style.pointerEvents = 'none'// 避免HTML标签遮挡三维场景的鼠标事件
    this.viewerDom.appendChild(this.css3DRenderer.domElement)

    }
    add2DRender(params){
    const {element,top,left,zIndex}    = params
    // 二维标签
    const labelRenderer = new CSS2DRenderer(element) // 标签渲染器
    labelRenderer.domElement.style.zIndex = zIndex||2
    labelRenderer.domElement.style.position = 'absolute'
    labelRenderer.domElement.style.top = left+'px' || '0px'
    labelRenderer.domElement.style.left =top+'px' || '0px'
    labelRenderer.domElement.style.pointerEvents = 'none'// 避免HTML标签遮挡三维场景的鼠标事件
    this.r2DRenderList.push(labelRenderer)
    this.viewerDom.appendChild(labelRenderer.domElement)
    }
    //初始化控制器
    #initControl() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enableDamping = true
        this.controls.dampingFactor = 0.25
        this.controls.screenSpacePanning = false
        this.controls.maxPolarAngle = Math.PI / 2
    }

    //初始化灯光

    #initLight() {
        if (!lights) {
            //模拟太阳光
            const light = new THREE.DirectionalLight(0xffffff, 1)
            light.position.set(0, 100, 50)
            this.scene.add(light)
            //添加环境光
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
            this.scene.add(ambientLight)
        }
    }
    //参数是选中的模型
     #modelSelect(modelSelect){
        this.modelSelectOutLine =  new outLine(this)
        this.#modelSelect.selectedObjects=modelSelect

     }
    addModelLine(model) {
        const gemory = new THREE.EdgesGeometry(model.geometry)
        const masterial = new THREE.LineBasicMaterial({
            color: 0x00ff00,
            transparent: true,
            opacity: 0.5,

        })
        const line = new THREE.LineSegments(gemory, masterial)
        //生成模型的外骨架后添加到对应的模型上
        model.add(line)

    }
    startSelectEvent(mouseType,callback){
        if(!this.mouseType){
            this.mouseType =  new targetEvent(this,callback,mouseType)
        }
    }
    stopSelectEvent(){
        if(this.mouseType){
            this.mouseType.stop()
        }else{
            throw new Error('请先调用startSelectEvent方法')
        }
    }
   







}
