<template>
    <div class="my-8 w-1/2 mx-auto">
        <n-input round size="large" placeholder="搜索" v-model:value="searchText" @keyup.enter="handleSearch">
            <template #prefix>
                <n-icon :component="Search"/>
            </template>
        </n-input>
    </div>
    <n-collapse :default-expanded-names="expandCollapse">
        <n-collapse-item v-for="(category, index) in  data.categories" :key="index" :name=index>
            <template #header>
                <span class="select-none">
                    {{ category.categoryName }}
                </span>
            </template>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
                <a v-for="linkItem in category.links" class="w-full h-full bg-white rounded p-2 shadow flex items-center cursor-pointer select-none hover:shadow-lg" :href="linkItem.link" target="_self">
                    <n-icon v-if="linkItem.iconUrl" :component="linkItem.iconClass"/>
                    <n-icon :component="Search"/>
                    <img class="h-4 mr-2" :src="linkItem.iconUrl" alt="">
                    <div class="flex-1 font-light w-auto truncate">{{ linkItem.name }}</div>
                </a>
            </div>
        </n-collapse-item>
    </n-collapse>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue'
import { Search } from '@vicons/fa'
import configData from '@/config.json'

const expandCollapse = configData.categories.map(( item, index ) => index)

const searchText = ref('')
const data = ref([])
const handleSearch = () => {
    window.open("http://www.baidu.com.cn/s?wd=" + searchText.value)
}
onMounted(() => {
    data.value = configData
})

watch(searchText, ( n, o ) => {

    let arr = []
    configData.categories.forEach(i => {
        let subArr = { categoryName: i.categoryName, links: [] }
        i.links.forEach(si => {
            if (si.name.toLowerCase().includes(n.toLowerCase())) {
                subArr.links.push(si)
            }
        })
        if (subArr.links.length > 0) {
            arr.push(subArr)
        }
    })
    data.value = { categories: arr }

})
</script>
