<template>
    <div class="lowCode-container">
        <div class="container-top">
         
        </div>
        <div class="container-main">
            <div class="container-left">
                <codeComponent @dragstart="dragstart" @dragend="drageEnd"></codeComponent>
            </div>
            <div class="container-content" ref='dragRef'>

                <codePlan :dataList="componentsListData"></codePlan>
            </div>
            <div class="container-right">
                <codeParams></codeParams>

            </div>

        </div>

    </div>



</template>

<script setup>
import { ref, shallowRef, provide, readonly } from 'vue';
import { v4 as uuidv4 } from "uuid";
import codeComponent from '@/components/codeComponent.vue';
import codeParams from '@/components/codeParams.vue';
import codePlan from '@/components/codePlan.vue';

const componentsListData = ref([]);
const dragRef = ref(null)

//将画布的数据抛出
provide('componentsListData', readonly(componentsListData.value))

//创建当前的组件
let currentComponent = ref(null)
const dragstart = (data, e) => {

    currentComponent.value = data
    dragRef.value.addEventListener('drop', drop)
    dragRef.value.addEventListener('dragover', dragover)
    dragRef.value.addEventListener('dragenter', dragenter)
}
const drageEnd = (e) => {
    dragRef.value.addEventListener('drop', drop)
    dragRef.value.addEventListener('dragover', dragover)
    dragRef.value.addEventListener('dragenter', dragenter)
    currentComponent.value = null

}
const dragenter = (event) => {
    console.log('wefwfw')
    event.dataTransfer.dropEffect = 'move'
}
const dragover = (event) => {
    //组织浏览器的默认行为
    event.preventDefault()

    // event.dataTransfer.dropEffect = 'none'
}

const drop = async (event) => {
    const data = event.dataTransfer.getData('text/plain')
    // 处理拖拽元素的数据
    let componentData = JSON.parse(currentComponent.value)
    let commonent = await import(`../components/formItem/${componentData.type}.vue`)


    componentsListData.value.push({ ...componentData, key: uuidv4(), commonent: shallowRef(commonent.default) }) //通过这种方式加载的组件得在default 中获取
    currentComponent.value = null

}

</script>

<style  lang='scss'>
.lowCode-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .container-top {
        height: 50px;
        background-color: var(--el-bg-color);
        margin-bottom: 4px;
    }

    .container-main {
        flex: 1;
        display: flex;
        .container-left {
            width: 280px;
            margin-right: 4px;
            background-color: var(--el-bg-color);
        }

        .container-content {
            flex: 1;
            background-color: var(--el-bg-color);
        }

        .container-right {
            width: 280px;
            margin-left: 4px;
            background-color: var(--el-bg-color);
        }
    }


}
</style>