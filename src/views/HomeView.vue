<template>
    <div class="my-8 w-1/2 mx-auto">
        <SearchInput></SearchInput>
    </div>
    <n-collapse :default-expanded-names="expandCollapse">
        <n-collapse-item v-for="(category, index) in  data.categories" :key="index" :title="category.categoryName" :name=index>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
                <a v-for="linkItem in category.links" class="w-full h-full bg-white rounded p-2 shadow flex items-center cursor-pointer select-none hover:shadow-lg" :href="linkItem.link" target="_self">
                    <img class="mr-2" :src="linkItem.base64" alt="">
                    <div class="flex-1 font-light w-auto truncate">{{ linkItem.name }}</div>
                </a>
            </div>
        </n-collapse-item>
    </n-collapse>
</template>
<script setup>
import SearchInput from '@/components/SearchInput.vue'
import data from '@/data.json'

console.log(data.categories)
const expandCollapse = data.categories.map((item,index) => index)
console.log(expandCollapse)
console.log(data)
</script>
