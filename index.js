import fs from 'fs'
// const cheerio = require('cheerio');
import cheerio from "cheerio"

const bookmarksHtml = fs.readFileSync('bookmarks.html', 'utf8');
const $ = cheerio.load(bookmarksHtml);

let bookmarks = {
    "Uncategorized": {
        children: []
    },
}

function getFolderName($el, index, depth = 1) {
    let folderNames = []
    let currentNode = $el.parent().parent()

    for (let i = 0; i < depth; i++) {
        let currentText = $(currentNode.find('h3').get(0)).text()
        folderNames.unshift(currentText)
        currentNode = currentNode.parent().parent()
    }
    return folderNames
}


function parseFolder($el, depth, folderNames) {
    const $folderTitle = $el.find('h3').first()
    const $linkItem = $el.find('a')
    if ($folderTitle.length === 0) {
        setFullPath(bookmarks, folderNames, { name: $linkItem.text(), icon: $linkItem.attr("icon"), url: $linkItem.attr("href") })
    } else {
        // 如果是文件夹，文件夹内的数据可能是文件夹，也可能是单个网址
        // bookmarks[$folderTitle.text()] = { children: [] }
        const $folderContent = $folderTitle.next() // 下一个dl元素
        $folderContent.children('dt').each((index, element) => {
            let folderNames = getFolderName($(element), index, depth)
            parseFolder($(element), depth + 1, folderNames)
        })
    }
}

// 获取第一个 h3 元素的下一个元素 dl
const firstH3 = $('h3').first();
const nextElement = firstH3.next('dl');

// 获取 dl 中的所有 dt 元素，并遍历
nextElement.children('dt').each((index, element) => {
    parseFolder($(element), 1, [])
});
// 将书签数据转换为 JSON 格式，并保存到文件中
fs.writeFileSync('bookmarks.json', JSON.stringify(bookmarks, null, 2));

console.log('书签数据已保存到 bookmarks.json 文件中。');


function setFullPath(obj, folderNames, data) {
    if (folderNames.length === 0) {
        bookmarks["Uncategorized"].children.push(data)
        return
    }
    let temp = obj
    // bookmarks ['other', 'redis]
    for (let i = 0; i < folderNames.length; i++) {
        let prop = folderNames[i]
        if (!temp[prop]) {
            temp[prop] = { children: [] }
        }
        if (i === folderNames.length - 1) {
            temp[prop].children.push(data)
        }
        temp = temp[prop]
    }
}
