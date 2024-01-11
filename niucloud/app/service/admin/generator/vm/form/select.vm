<el-form-item :label="t('{LCASE_COLUMN_NAME}')" {PROP}>
    <el-select class="input-width"  v-model="formData.{COLUMN_NAME}" clearable :placeholder="t('{LCASE_COLUMN_NAME}Placeholder')">
    <el-option label="请选择" value=""></el-option>
        <el-option
            v-for="(item, index) in {DICT_TYPE}"
            :key="index"
            :label="item['{ITEM_LABEL}']"
            :value="item['{ITEM_VALUE}']"
        />
    </el-select>
</el-form-item>
