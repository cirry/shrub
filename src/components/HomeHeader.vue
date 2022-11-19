<template>
    <div class="flex items-center justify-between">
        <span> {{ appTitle }}</span>
        <div class="py-8 w-1/2">
            <n-input size="large" class="rounded-l-full rounded-r-full" placeholder="搜索" v-model:value="searchInput" @keyup.enter="handleSearch">
                <template #prefix>
                    <n-popselect v-model:value="searchEnginesValue" :options="searchEngines" trigger="click">
                        <n-button circle secondary size="small" style="margin-left: -6px;">
                            <n-icon class="cursor-pointer text-xl" :component="searchEnginesValue"/>
                        </n-button>
                    </n-popselect>
                </template>
                <template #suffix>
                    <n-icon class="cursor-pointer" :component="Search"/>
                </template>
            </n-input>
        </div>
        <n-dropdown trigger="click" :options="options" class="float-right" @select="handleSelect">
            <n-icon class="text-xl cursor-pointer" :component="Cog"/>
        </n-dropdown>

        <n-modal v-model:show="showModal" preset="card" title="添加网址" class="sm:w-4/5 md:w-2/3 lg:w-2/3 xl:w-1/2" style="width: 50%;" :close-on-esc="true">
            <n-form ref="formRef" :model="formValue" label-placement="left" label-width="auto" size="small">
                <n-form-item label="分类名称：" path="categoryName" :rule="rules.categoryName">
                    <n-input v-model:value="formValue.categoryName" placeholder="请输入" clearable/>
                </n-form-item>
                <n-form-item label="网址名称：" path="name" :rule="rules.name">
                    <n-input v-model:value="formValue.name" placeholder="请输入" clearable/>
                </n-form-item>
                <n-form-item label="网站链接：" path="link" :rule="rules.link">
                    <n-input v-model:value="formValue.link" placeholder="请输入" clearable/>
                </n-form-item>
                <n-form-item label="图标样式：" path="iconClass">
                    <n-input v-model:value="formValue.iconClass" placeholder="请输入" clearable/>
                </n-form-item>
                <n-form-item label="图标地址：" path="iconUrl">
                    <n-input v-model:value="formValue.iconUrl" placeholder="请输入" clearable/>
                </n-form-item>
                <div class="flex justify-end">
                    <n-space>
                        <n-button attr-type="button" type="primary" @click="handleClose">
                            添加
                        </n-button>
                        <n-button attr-type="button" @click="handleValidateClick">
                            取消
                        </n-button>
                    </n-space>
                </div>
            </n-form>
        </n-modal>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Search, Cog, EditRegular } from '@vicons/fa'
import { NIcon } from 'naive-ui'
import { useConfigDataStore } from "@/stores/config-data";
import { storeToRefs } from "pinia";
import BaiduIcon from '../components/icons/BaiduIcon.vue'
import GoogleIcon from '../components/icons/GoogleIcon.vue'
import MicrosoftIcon from '../components/icons/MicrosoftIcon.vue'

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
const searchEngines = [
    {
        label: '百度一下',
        value: renderIcon(BaiduIcon),
        key: 'baidu'
    }, {
        label: '谷歌搜索',
        value: renderIcon(GoogleIcon),
        key: 'google'
    }, {
        label: '必应搜索',
        value: renderIcon(MicrosoftIcon),
        key: 'bingying'
    }
]

const formValue = ref({
    categoryName: '',
    name: '',
    link: '',
    iconUrl: '',
    iconClass: '',
})
const rules = {
    categoryName: { required: true, message: '请输入分类名称', trigger: ['input', 'blur'] },
    name: { required: true, message: '请输入网址名称', trigger: ['input', 'blur'] },
    link: { required: true, message: '请输入网站链接', trigger: ['input', 'blur'] },
}
const searchEnginesValue = ref(renderIcon(BaiduIcon))

const handleSearch = () => {
    window.open("http://www.baidu.com.cn/s?wd=" + searchText.value)
}

const handleSelect = ( key ) => {
    if (key === '1') {
        showModal.value = !showModal.value
    }
    console.log(key)
}
const handleClose = () => {
    console.log('close dialog')
    formRef.value?.validate(errors => {
        if (!errors) {
            console.log('valid')
            console.log(formValue.value)
        } else {
            console.log(errors)
            console.log('invalid')
        }
    })
    showModal.value = false
}

const formRef = ref(null)

const handleValidateClick = () => {
    formRef.value?.validate(( errors ) => {
        if (!errors) {
            console.log(formValue.value)
            console.log('验证通过')
        } else {
            console.log(errors)
        }
    })
}
</script>

<style scoped>

</style>
