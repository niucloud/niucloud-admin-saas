
<el-form-item :label="t('{LCASE_COLUMN_NAME}')" prop="{COLUMN_NAME}">
    <el-select class="w-[280px]" v-model="{LCASE_CLASS_NAME}Table.searchParam.{COLUMN_NAME}" clearable :placeholder="t('{LCASE_COLUMN_NAME}Placeholder')">
        <el-option label="全部" value=""></el-option>
        <el-option
            v-for="(item, index) in {DICT_TYPE}"
            :key="index"
            :label="item.name"
            :value="item.value"
        />
    </el-select>
</el-form-item>
