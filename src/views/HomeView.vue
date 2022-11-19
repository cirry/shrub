<template>
    <HomeHeader></HomeHeader>

    <n-collapse :default-expanded-names="expandCollapseArr">
        <n-collapse-item v-for="(category, index) in  searchData" :key="index" :name=index>
            <template #header>
                <span class="select-none">
                    {{ category.categoryName }}
                </span>
            </template>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
                <a v-for="linkItem in category.links" class="w-full h-full bg-white rounded p-2 shadow flex items-center cursor-pointer select-none hover:shadow-lg" :href="linkItem.link" target="_self">
                    <!-- <n-icon v-if="linkItem.iconClass" :component="linkItem.iconClass"/> -->
                    <i v-if="linkItem.iconClass" :class="linkItem.iconClass " class="h-4 mr-2"></i>
                    <!-- <n-icon :component="Search"/> -->
                    <img v-else class="h-4 mr-2" :src="linkItem.iconUrl" alt="">
                    <div class="flex-1 font-light w-auto truncate">{{ linkItem.name }}</div>
                </a>
            </div>
        </n-collapse-item>
    </n-collapse>
</template>
<script setup>
import HomeHeader from '@/components/HomeHeader.vue'
import { useConfigDataStore } from "@/stores/config-data";
import { storeToRefs } from "pinia";

const ConfigDataStore = useConfigDataStore()
const { searchData, expandCollapseArr } = storeToRefs(ConfigDataStore)



</script>
