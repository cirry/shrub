<template>
    <div class="flex items-center justify-between">
        <span> {{ appTitle }}</span>
        <div class="py-8 w-1/2">
            <n-input round size="large" placeholder="搜索" v-model:value="searchInput" @keyup.enter="handleSearch">
                <template #prefix>
                    <n-icon :component="Search"/>
                </template>
            </n-input>
        </div>
        <n-dropdown trigger="click" :options="options" class="float-right" @select="handleSelect">
            <n-icon class="text-xl cursor-pointer" :component="Cog"/>
        </n-dropdown>

        <n-modal v-model:show="showModal">
            <n-card class="sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3" title="模态框" :bordered="false" size="huge" role="dialog" aria-modal="true">
                <n-form ref="formRef" :model="dynamicForm" label-placement="left" size="small" :style="{ maxWidth: '640px' }">
                    <n-form-item
                        label="姓名"
                        path="name"
                        :rule="{
        required: true,
        message: '请输入姓名',
        trigger: ['input', 'blur']
      }"
                    >
                        <n-input v-model:value="dynamicForm.name" clearable />
                    </n-form-item>

                    <n-form-item
                        v-for="(item, index) in dynamicForm.hobbies"
                        :key="index"
                        :label="`爱好${index + 1}`"
                        :path="`hobbies[${index}].hobby`"
                        :rule="{
        required: true,
        message: `请输入爱好${index + 1}`,
        trigger: ['input', 'blur']
      }"
                    >
                        <n-input v-model:value="item.hobby" clearable />
                        <n-button style="margin-left: 12px" @click="removeItem(index)">
                            删除
                        </n-button>
                    </n-form-item>

                    <n-form-item>
                        <n-space>
                            <n-button attr-type="button" @click="handleValidateClick">
                                验证
                            </n-button>
                            <n-button attr-type="button" @click="addItem">
                                增加
                            </n-button>
                        </n-space>
                    </n-form-item>
                </n-form>
            </n-card>
        </n-modal>
    </div>
</template>

<script setup>
import { ref, watch,  reactive } from 'vue'
import { Search, Cog, EditRegular } from '@vicons/fa'
import { NIcon } from 'naive-ui'
import { useConfigDataStore } from "@/stores/config-data";
import { storeToRefs } from "pinia";

const renderIcon = ( icon ) => {
    return () => {
        return h(NIcon, null, {
            default: () => h(icon)
        })
    }
}

const configDataStore = useConfigDataStore()
const { appTitle, searchInput } = storeToRefs(configDataStore)
const showModal = ref(false)
const options = [
    {
        label: '编辑配置',
        icon: renderIcon(EditRegular),
        key: '1'
    },
    {
        label: '重启应用',
        key: "2"
    },
]

const handleSearch = () => {
    window.open("http://www.baidu.com.cn/s?wd=" + searchText.value)
}

const handleSelect = ( key ) => {
    if (key === '1') {
        showModal.value = !showModal.value
    }
    console.log(key)
}

const formRef = ref(null)

const dynamicForm = reactive({
    name: '',
    hobbies: [{ hobby: '' }]
})

const removeItem = (index) => {
    dynamicForm.hobbies.splice(index, 1)
}

const addItem = () => {
    dynamicForm.hobbies.push({ hobby: '' })
}

const handleValidateClick = () => {
    formRef.value?.validate((errors) => {
        if (!errors) {
            console.log('验证通过')
        } else {
            console.log(errors)
        }
    })
}
</script>

<style scoped>

</style>
