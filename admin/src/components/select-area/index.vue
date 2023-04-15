<template>
    <div class="area-component">
        <!-- 省 -->
        <el-select
            :placeholder="t('provincePlaceholder')"
            v-model="state.province"
            clearable
            @change="changeArea('province')"
        >
            <el-option
            v-for="item in state.provinceList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            />
        </el-select>
        <!-- 市 -->
        <el-select
            :placeholder="t('cityPlaceholder')"
            style="margin: 0 10px;"
            :disabled="!state.province"
            v-model="state.city"
            clearable
            @change="changeArea('city')"
        >
            <el-option
            v-for="item in state.citiesList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            />
        </el-select>
        <!-- 区 -->
        <el-select
            :placeholder="t('districtPlaceholder')"
            :disabled="!state.province || !state.city"
            v-model="state.area"
            clearable
            @change="changeArea('area')"
        >
            <el-option
            v-for="item in state.areasList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            />
        </el-select>
    </div>
</template>

<script lang="ts" setup>
import { reactive, onBeforeMount, computed, watch,ref, toRaw,onMounted } from 'vue'
import { getAreaListByPid } from '@/api/sys'
import { t } from '@/lang'
import { da } from 'element-plus/es/locale'

// 定义数据类型
export interface areaType {
  id: string
  name: string
  pid: number
  children?: areaType[]
}

const prop = defineProps({
    initData: {
        type: Object,
        default: {
            province : '',
            city : '',
            area : ''
        }
    }
})
 
const emits = defineEmits<{
  (e: 'areaChange', value: any):void
}>()
 
const state = reactive({
  // 用于展示的省市区数据
    provinceList: [] as areaType[],
    citiesList: [] as areaType[],
    areasList: [] as areaType[],
  // 最终选择的省市区
    province: "",
    city: "",
    area: ""
})


onBeforeMount(async ()=>{
  state.provinceList = (await getAreaListByPid(0)).data
})

watch( () => prop.initData.province, async (val) => {
    state['province'] = prop.initData['province']
    state['city'] = prop.initData['city']
    state['area'] = prop.initData['area']
    state.citiesList = (await getAreaListByPid(parseInt(state.province))).data
    state.areasList = (await getAreaListByPid(parseInt(state.city))).data
    emitsArea();
})

watch(()=>state.area, (val)=>{
  if(val){
    emitsArea();
  }
})

watch(()=>state.province, (val)=>{
  if(val){
    emitsArea();
  }
})

watch(()=>state.city, (val)=>{
  if(val){
    emitsArea();
  }
})


const emitsArea = () => {
    const paramsData = {
      province: {} as areaType,
      city: {} as areaType,
      area: {} as areaType
    }
    let tmp = state.provinceList.find((item) => item.id === state.province)
    paramsData.province.name = tmp? tmp.name : ""
    paramsData.province.id = tmp? tmp.id : ""
    tmp = state.citiesList.find((item) => item.id === state.city) as any
    paramsData.city.name = tmp? tmp.name : ""
    paramsData.city.id = tmp ?tmp.id : ""
    tmp = state.areasList.find((item) => item.id === state.area) as any
    paramsData.area.name = tmp ? tmp.name : ""
    paramsData.area.id = tmp ? tmp.id : ""

    emits('areaChange', paramsData)
}

const changeArea = async (data : any) => {
    
    if(data == 'province'){
        state.city = ""
        state.area = ""
        if(!state.province) {
            emitsArea();
            return false;
        }
        state.citiesList = (await getAreaListByPid(parseInt(state.province))).data
    }
    if(data == 'city'){
        state.area = ""
        if(!state.city) {
            emitsArea();
            return false;
        }
        state.areasList = (await getAreaListByPid(parseInt(state.city))).data
    }
    if(data == 'area'){
        if(!state.area) {
            emitsArea();
            return false;
        }
    }
}

</script>

<style lang="scss" scoped>
 
</style>