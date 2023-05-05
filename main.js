import './style/normalize.css'
import './style/index.css'
import bookmarkDataBak from './bookmarks.json'

let bookmarkData = JSON.parse(JSON.stringify(bookmarkDataBak))

let str = ''
function initHtml() {
  str = ''
}

function generateLink(data) {
  let str = ''
  Object.keys(data).forEach(key => {
    if (key === 'children') { // 单个书签
      data[key].forEach(linkData => {
        str += `<a href="${linkData.url}" class="w-full h-full bg-white rounded p-1 shadow flex items-center cursor-pointer select-none hover:shadow-lg" target="_blank">
<img src="${linkData.icon}" class="w-4 h-4 mx-2" alt="">
<div class="flex-1 font-light w-auto truncate">${linkData.name}</div>
</a>`
      })
    } else { // 文件夹
      str += `<div class="dropdown w-full h-full bg-white rounded shadow  cursor-pointer select-none hover:shadow-lg flex items-center">
      <img src="/files.png" class="w-4 h-4 mx-2" alt="">
		  <div class="flex-1  font-light w-auto truncate" style="line-height:32px;">${key}</div>
		<div class="dropdown-content bg-gray-200 rounded w-full">`
      data[key].children.forEach(linkData => {
        str += `<a href="${linkData.url}" class="w-full h-full bg-white rounded p-1 shadow flex items-center cursor-pointer select-none hover:bg-gray-600 hover:text-white" target="_blank">
<img src="${linkData.icon}" class="w-4 h-4 mx-2" alt="">
<div class="flex-1 font-light w-auto truncate">${linkData.name}</div>
</a>`
      })
      str += `</div></div>`
    }
  })
  return str
}
function generateHtml(bookmarkData) {
  initHtml()
  Object.keys(bookmarkData).forEach(key => {
    str += `
  <div class="p-2">
    <details open>
    <summary class="cursor-pointer">
    ${key}
    </summary>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 mt-2">
`
    str += generateLink(bookmarkData[key], str)
    str += `</div></details>
</div>`
  })
  document.querySelector('#app').innerHTML = `${str}`
  setDropdownStyle()

  return str
}
let strBak = generateHtml(bookmarkDataBak)

function setDropdownStyle() {

  // 获取下拉菜单容器和下拉菜单内容元素
  const dropdowns = document.querySelectorAll('.dropdown');

  // 添加事件监听器，当选择项改变时执行函数
  dropdowns.forEach((dropdown) => {
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    dropdown.addEventListener('mouseover', function () {
      // 获取当前视窗高度和下拉菜单内容高度
      const windowHeight = window.innerHeight;
      const dropdownHeight = dropdownContent.offsetHeight;

      // 判断下拉菜单内容是否超出视窗底部
      if (dropdown.getBoundingClientRect().bottom + dropdownHeight > windowHeight) {
        dropdownContent.classList.add('bottom-up');
        dropdownContent.classList.remove('bottom');

      } else {
        dropdownContent.classList.add('bottom');
        dropdownContent.classList.remove('bottom-up');
      }
    })
  })

}


const input = document.querySelector('input[type="text"]');
input.addEventListener('input', (event) => {
  const value = event.target.value; // 获取输入框中的数据
  if (value) {
    let searchObj = {}
    Object.keys(bookmarkDataBak).forEach(key => {
      if (key.toLowerCase().includes(value.toLowerCase())) {
        searchObj[key] = bookmarkDataBak[key]
      } else {

        let temp = bookmarkDataBak[key].children.find(item => item.name.toLowerCase().includes(value.toLowerCase()))
        if (temp) {
          if (searchObj[key]) {
            searchObj[key].children.push(temp)
          } else {
            searchObj[key] = { children: [temp] }
          }
        }
        Object.keys(bookmarkDataBak[key]).forEach(subKey => {
          if (subKey !== 'children') {
            if (subKey.toLowerCase().includes(value.toLowerCase())) {
              searchObj[key] = {}
              searchObj[key][subKey] = bookmarkData[key][subKey]
            } else {
              let subFolderTemp = bookmarkData[key][subKey].children.find(subItem => subItem.name.toLowerCase().includes(value.toLowerCase()))
              if (!subFolderTemp) return
              if (searchObj[key] && searchObj[key][subKey]) {
                searchObj[key][subKey].children.push(subFolderTemp)
              } else {
                searchObj[key] = {}
                searchObj[key][subKey] = { children: [subFolderTemp] }
              }
            }
          }
        })
      }
    })
    generateHtml(searchObj)
  } else {
    document.querySelector('#app').innerHTML = `${strBak}`
    setDropdownStyle()
  }
});
