import {defineStore} from 'pinia'
import {t} from '@/lang'
import {toRaw, watch} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import {cloneDeep, range, isEmpty} from 'lodash-es'

interface Diy {
    // 全局属性
    id: number
    load: boolean,
    currentIndex: number,
    currentComponent: string, // 当前正在编辑的组件
    name: string, // 页面标识
    type: string, // 页面类型
    typeName: string,  // 页面类型名称
    components: any[], // 组件集合
    global: {
        title: string,
        pageBgColor: string, // 页面背景颜色
        tabbarSwitch: boolean, // 底部导航开关
    },
    // 组件集合
    value: any[]
}

const useDiyStore = defineStore('diy', {
    state: (): Diy => {
        return {
            id: 0,
            load: false, // 加载状态
            currentIndex: -99,
            currentComponent: 'edit-page',
            name: '',
            type: '',
            typeName: '',
            components: [],
            global: {
                title: "页面",
                pageBgColor: "", // 页面背景颜色
                tabbarSwitch: true
            },
            // 组件集合
            value: []
        }
    },
    getters: {
        editComponent: (state) => {
            return state.value[state.currentIndex];
        },
    },
    actions: {
        // 添加组件
        addComponent(data: any) {
            // 加载完才能添加组件
            if(!this.load) return;

            // 删除不用的字段
            let component = cloneDeep(data);

            component.id = this.generateRandom();
            component.componentName = component.name;
            component.componentTitle = component.title;
            component.maxCount = component.max_count;

            Object.assign(component, component.value);
            delete component.name;
            delete component.title;
            delete component.value;
            delete component.type;
            delete component.icon;
            delete component.max_count;

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
                    message: `${t('notCopy')}，${component.componentTitle}${t('componentCanOnlyAdd')}${component.maxCount}${t('piece')}`,
                });
                return;
            }

            var index = this.currentIndex + 1;
            this.value.splice(index, 0, component);

            this.changeCurrentIndex(index, component);

        },
        // 检测组件是否允许添加，true：允许 false：不允许
        checkComponentIsAdd(component: any) {

            //maxCount为0时不处理
            if (component.maxCount === 0) return true;

            var count = 0;

            //遍历已添加的自定义组件，检测是否超出数量
            for (var i in this.value) if (this.value[i].componentName === component.componentName) count++;

            if (count >= component.maxCount) return false;
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