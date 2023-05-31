import {defineStore} from 'pinia'
import {t} from '@/lang'
import {toRaw, watch} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import {cloneDeep, range, isEmpty} from 'lodash-es'

const useDiyStore = defineStore('diy', {
    state: () => {
        return {
            id: 0,
            load: false, // 加载状态
            currentIndex: -99, // 当前正在编辑的组件下标
            currentComponent: 'edit-page', // 当前正在编辑的组件名称
            editTab: 'content',// 编辑页面
            name: '', // 页面标识
            type: '', // 页面模板
            typeName: '',  // 页面模板名称
            isDefault: 0, // 是否默认页面
            predefineColors: [
                '#F4391c',
                '#ff4500',
                '#ff8c00',
                '#FFD009',
                '#ffd700',
                '#19C650',
                '#90ee90',
                '#00ced1',
                '#1e90ff',
                '#c71585',
                '#FF407E',
                '#CFAF70',
                '#A253FF',
                'rgba(255, 69, 0, 0.68)',
                'rgb(255, 120, 0)',
                'hsl(181, 100%, 37%)',
                'hsla(209, 100%, 56%, 0.73)',
                '#c7158577'
            ],
            components: [], // 组件集合
            global: {
                title: "页面", // 页面标题

                pageBgColor: "", // 页面背景颜色
                bgUrl: '', // 页面背景图片
                imgWidth: '',  // 页面背景图片宽度
                imgHeight: '', // 页面背景图片高度

                // 顶部状态栏
                topStatusBar: {
                    bgColor: "#ffffff", // 背景颜色
                    isTransparent: false, // 是否透明
                    isShow: true, // 是否显示
                    style: 'style-1', // 风格样式
                    textColor: "#333333", // 文字颜色
                    textAlign: 'center', // 文字对齐方式
                },

                bottomTabBarSwitch: true, // 底部导航开关

                // 弹框 count：不弹出 -1，首次弹出 1，每次弹出 0
                popWindow: {
                    imgUrl: "",
                    imgWidth: '',
                    imgHeight: '',
                    count: -1,
                    show: 0,
                    link: {
                        name: ""
                    },
                },

                // 公共模板属性，所有组件都继承，无需重复定义，组件内部根据业务自行调用
                template: {
                    textColor: "#303133", // 文字颜色
                    pageBgColor: '', // 底部背景颜色

                    componentBgColor: '', // 组件背景颜色
                    topRounded: 0, // 组件上圆角
                    bottomRounded: 0, // 组件下圆角

                    elementBgColor: '', // 元素背景颜色
                    topElementRounded: 0, // 元素上圆角
                    bottomElementRounded: 0, // 元素下圆角

                    margin: {
                        top: 0, // 上边距
                        bottom: 0, // 下边距
                        both: 0, // 左右边距
                    }
                }

            },
            // 组件集合
            value: []
        }
    },
    getters: {
        editComponent: (state) => {
            if (state.currentIndex == -99) {
                return state.global;
            } else {
                return state.value[state.currentIndex];
            }
        },
    },
    actions: {
        // 初始化数据
        init() {
            this.global = {
                title: "页面", // 页面标题

                pageBgColor: "", // 页面背景颜色
                bgUrl: '', // 页面背景图片
                imgWidth: '',  // 页面背景图片宽度
                imgHeight: '', // 页面背景图片高度

                // 顶部状态栏
                topStatusBar: {
                    bgColor: "#ffffff", // 背景颜色
                    isTransparent: false, // 是否透明
                    isShow: true, // 是否显示
                    style: 'style-1', // 风格样式
                    textColor: "#333333", // 文字颜色
                    textAlign: 'center', // 文字对齐方式
                },

                bottomTabBarSwitch: true, // 底部导航开关

                // 弹框 count：不弹出 -1，首次弹出 1，每次弹出 0
                popWindow: {
                    imgUrl: "",
                    imgWidth: '',
                    imgHeight: '',
                    count: -1,
                    show: 0,
                    link: {
                        name: ""
                    },
                },

                // 公共模板属性，所有组件都继承，无需重复定义，组件内部根据业务自行调用
                template: {
                    textColor: "#303133", // 文字颜色
                    pageBgColor: '', // 底部背景颜色

                    componentBgColor: '', // 组件背景颜色
                    topRounded: 0, // 组件上圆角
                    bottomRounded: 0, // 组件下圆角

                    elementBgColor: '', // 元素背景颜色
                    topElementRounded: 0, // 元素上圆角
                    bottomElementRounded: 0, // 元素下圆角

                    margin: {
                        top: 0, // 上边距
                        bottom: 0, // 下边距
                        both: 0, // 左右边距
                    }
                }

            };
            this.value = [];
        },
        // 添加组件
        addComponent(key: string, data: any) {
            // 加载完才能添加组件
            if (!this.load) return;

            // 删除不用的字段
            let component = cloneDeep(data);

            component.id = this.generateRandom();
            component.componentName = key;
            component.componentTitle = component.title;
            component.ignore = []; // 忽略公共属性

            Object.assign(component, component.value);
            delete component.title;
            delete component.value;
            delete component.type;
            delete component.icon;

            // 继承全局属性
            let template = cloneDeep(this.global.template);
            Object.assign(component, template);

            if (!this.checkComponentIsAdd(component)) return;

            if (this.currentIndex === -99) {
                this.value.push(component);
                // 添加组件后（不是编辑调用的），选择最后一个
                this.currentIndex = this.value.length - 1;
            } else {
                // 指定位置添加组件
                this.value.splice(++this.currentIndex, 0, component);
            }

            this.currentComponent = component.path;
        },
        generateRandom(len: number = 5) {
            return Number(Math.random().toString().substr(3, len) + Date.now()).toString(36);
        },
        // 将数据发送到uniapp
        postMessage() {
            var diyData = JSON.stringify({
                currentIndex: this.currentIndex,
                global: toRaw(this.global),
                value: toRaw(this.value)
            });
            window.previewIframe.contentWindow.postMessage(diyData, '*');
        },
        // 选中正在编辑的组件
        changeCurrentIndex(index: number, component: any = null) {
            this.currentIndex = index;
            if (this.currentIndex == -99) {
                this.currentComponent = 'edit-page';
            } else if (component) {
                this.currentComponent = component.path;
            }
        },
        // 删除组件
        delComponent() {
            if (this.currentIndex == -99) return;

            ElMessageBox.confirm(
                t('delComponentTips'),
                t('warning'),
                {
                    confirmButtonText: t('confirm'),
                    cancelButtonText: t('cancel'),
                    type: 'warning',
                    autofocus: false
                }
            ).then(() => {
                this.value.splice(this.currentIndex, 1);

                // 如果组件全部删除，则选中页面设置
                if (this.value.length === 0) {
                    this.currentIndex = -99;
                }

                // 如果当前选中的组件不存在，则选择上一个
                if (this.currentIndex === this.value.length) {
                    this.currentIndex--;
                }
                let component = cloneDeep(this.value[this.currentIndex]);

                this.changeCurrentIndex(this.currentIndex, component)

            }).catch(() => {
            })

        },
        // 上移组件
        moveUpComponent() {
            if ((this.currentIndex - 1) < 0) return; // 从0开始

            var temp = cloneDeep(this.value[this.currentIndex]); // 当前选中组件
            temp.id = this.generateRandom(); // 更新id，刷新组件数据

            let prevIndex = this.currentIndex - 1;
            var temp2 = cloneDeep(this.value[prevIndex]); // 上个组件
            temp2.id = this.generateRandom(); // 更新id，刷新组件数据

            this.value[this.currentIndex] = temp2;
            this.value[prevIndex] = temp;

            this.changeCurrentIndex(prevIndex, temp);
        },
        // 下移组件
        moveDownComponent() {
            if ((this.currentIndex + 1) >= this.value.length) return; // 最后一个不能下移

            var nextIndex = this.currentIndex + 1;

            var temp = cloneDeep(this.value[this.currentIndex]); // 当前选中组件
            temp.id = this.generateRandom(); // 更新id，刷新组件数据

            var temp2 = cloneDeep(this.value[nextIndex]); // 下个组件
            temp2.id = this.generateRandom(); // 更新id，刷新组件数据

            this.value[this.currentIndex] = temp2;
            this.value[nextIndex] = temp;

            this.changeCurrentIndex(nextIndex, temp);

        },
        // 复制组件
        copyComponent() {
            if (this.currentIndex < 0) return; // 从0开始

            let component = cloneDeep(this.value[this.currentIndex]); // 当前选中组件
            component.id = this.generateRandom(); // 更新id，刷新组件数据

            if (!this.checkComponentIsAdd(component)) {
                ElMessage({
                    type: 'warning',
                    message: `${t('notCopy')}，${component.componentTitle}${t('componentCanOnlyAdd')}${component.uses}${t('piece')}`,
                });
                return;
            }

            var index = this.currentIndex + 1;
            this.value.splice(index, 0, component);

            this.changeCurrentIndex(index, component);

        },
        // 检测组件是否允许添加，true：允许 false：不允许
        checkComponentIsAdd(component: any) {

            //为0时不处理
            if (component.uses === 0) return true;

            var count = 0;

            //遍历已添加的自定义组件，检测是否超出数量
            for (var i in this.value) if (this.value[i].componentName === component.componentName) count++;

            if (count >= component.uses) return false;
            else return true;
        },
        // 重置当前组件数据
        resetComponent() {
            if (this.currentIndex < 0) return; // 从0开始

            ElMessageBox.confirm(
                t('resetComponentTips'),
                t('warning'),
                {
                    confirmButtonText: t('confirm'),
                    cancelButtonText: t('cancel'),
                    type: 'warning',
                    autofocus: false
                }
            ).then(() => {
                // 重置当前选中的组件数据
                for (let i = 0; i < this.components.length; i++) {
                    if (this.components[i].componentName == this.editComponent.componentName) {
                        Object.assign(this.editComponent, this.components[i]);
                        break;
                    }
                }

            }).catch(() => {
            })

        },
        // 组件验证
        verify() {
            if (this.global.title === "") {
                ElMessage({
                    message: t('pageNamePlaceholder'),
                    type: 'warning'
                })
                this.changeCurrentIndex(-99);
                return false;
            }

            for (var i = 0; i < this.value.length; i++) {
                try {
                    if (this.value[i].verify) {
                        var res = this.value[i].verify(i);
                        if (!res.code) {
                            this.changeCurrentIndex(i, this.value[i])
                            ElMessage({
                                message: res.message,
                                type: 'warning'
                            })
                            return false;
                        }
                    }
                } catch (e) {
                    console.log("verify Error:", e, i, this.value[i]);
                }
            }
            return true;
        }
    }
})

export default useDiyStore