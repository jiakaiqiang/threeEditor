class targetEvent {
    constructor(viewer, callback, type = 'clikc') {
        this.viewer = viewer
        this.callback = callback
        this.type = type
    }
    startSelect() {
        this.stopSelect()
        //第一个this指向实例对象 第二个this指向当前对象
        this.viewer.renderer.domElement.addEventListener(this.type,this.#event.bind(this,this))
        

    }
    stopSelect() {
        this.viewer.renderer.domElement.removeEventListener(this.type, this.viewer)
    }
    #event(that, event) {

        // left、top表示canvas画布布局，距离顶部和左侧的距离(px)
        const px = event.offsetX - that.viewer.viewerDom.getBoundingClientRect().left;
        const py = event.offsetY - that.viewer.viewerDom.getBoundingClientRect().top;
        //屏幕坐标px、py转标准设备坐标x、y  坐标转换公式  鼠标坐标/物体长度 *2 -1
        //width、height表示canvas画布宽高度
        const x = (px / this.viewer.viewerDom.clientWidth) * 2 - 1;
        const y = -(py / this.viewer.viewerDom.clientHeight) * 2 + 1;


        //坐标转换  canvas 坐标转换成世界坐标
        const raycaster = new THREE.Raycaster();
        // 设置源
        raycaster.origin = new THREE.Vector3(-100, 1, 200);
        // 设置方向
        raycaster.direction = new THREE.Vector3(1, 1, 0).normalize();

        raycaster.setFromCamera(new THREE.Vector2(x, y), that.viewer.camera);
        // TODO: 第一个参数是否需要外部传入，减小监听范围
        const intersects = raycaster.intersectObject(that.scene, true) // 检测射线与模型是否相交
        if (intersects.length > 0 && intersects[0]) {
            that.callback(intersects[0].object, intersects[0].point)
        }
    }
}

export default targetEvent