import { ref, reactive, computed } from 'vue'
import configData from '@/data.json'
import { defineStore } from 'pinia'

export const useConfigDataStore = defineStore('configData', () => {
    const data = reactive(configData)
    const searchInput = ref('')
    const appTitle = ref(data.appTitle)
    const expandCollapseArr = reactive(configData.categories.map(( item, index ) => index))

    const searchData = computed(() => {
        let arr: any = []
        data.categories.forEach(( i: any ) => {
            let subArr = { categoryName: i.categoryName, links: [] as any[] }
            i.links.forEach(( si: any ) => {
                if ( si.name.toLowerCase().includes(searchInput.value.toLowerCase()) ) {
                    subArr.links.push(si)
                }
            })
            if ( subArr.links.length > 0 ) {
                arr.push(subArr)
            }
        })
        return arr
    })

    return { searchInput,appTitle, data, searchData, expandCollapseArr }
})
