import { MaterialType, MaterialProps, GroupEnum } from './type.ts'


//基础组件
export const commonentsData = [
    {
        name: '文本',
        id: 1,
        icon: "icon-wenjian1",
        props: {
            placeholder: '请输入文本',
            value: ''
        },

        events: {
            onChange: (e: any) => {
                console.log(e)
            },
            onInput: (e: any) => {
                console.log(e)
            }
        },
        style: {
            width: '100px',
            height: '30px',
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '0 10px',
            fontSize: '14px',
        },
        className: 'text-class',
        type: MaterialType.Text,
        group: GroupEnum.Basic,
      
    },

    {
        name: '图片',
        icon: "icon-tupian",
        id: 2,
        className: "image-class",
        component: Image,
        type: MaterialType.Image,
        group: GroupEnum.Basic,
        props: {

            alt: "图片",
            title: "图",
            src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        },
        events: {
            onChange: (e: any) => {
                console.log(e)
            }
        }, style: {
            width: '100%',
            height: '100px',
        }

    },
    {
        name: '按钮',
        id: 3,
        icon: "icon-anniu",
        type: MaterialType.Button,
        group: GroupEnum.Basic,
        className: "button-class",
        props: {
            type: 'primary',
            size: 'small',
            value: '按钮',
            disabled: false
        },
        events: {
            onClick: (e: any) => {
                console.log(e, '-----')
            }

        },
        style: {
            width: '100px',
            height: '30px',
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '0 10px',
            fontSize: '14px',
        },

    },




]

