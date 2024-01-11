const fs = require('fs')

const publish = () => {
    const src = './dist/build/h5'
    const dest = '../niucloud/public/wap'

    solve()

    // 目标目录不存在停止复制
    try {
        const dir = fs.readdirSync(dest)
    } catch (e) {
        return
    }

    // 删除目标目录下文件
    fs.rm(dest, { recursive: true }, err => {
        if(err) {
            console.log(err)
            return
        }

        fs.cp(src, dest, { recursive: true }, (err) => {
            if (err) {
                console.error(err)
            }
        })
    })
}

const solve = () => {
    const src = './dist/build/h5/assets'
    const filemaps = fs.readdirSync(src)

    filemaps.forEach(file => {
        if (/^(index-)(\w{8})(.js)$/.test(file)) {
            const path = `${src}/${file}`
            let content = fs.readFileSync(path, 'utf-8')
            const first = 'const match = location.href.match(/\\/wap\\/(\\d*)\\//);'

            if (content.indexOf(first) == -1) {
                content = first + content
                const replace = 'router:{mode:"history",base: match ? `/wap/${match[1]}/` : "/wap/",assets:"assets",routerBase: match ? `/wap/${match[1]}/` : "/wap/"},darkmode'
                content = content.replace(/router:{(.*?)},darkmode/s, replace)
                fs.writeFileSync(path, content, 'utf8')
            }
        }
    })
}

publish()
