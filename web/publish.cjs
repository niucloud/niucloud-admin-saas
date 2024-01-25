const fs = require('fs')

const publish = () => {
    const src = './.output/public'
    const dest = '../niucloud/public/web'

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
    const fn = './.output/public/index.html'
    const fc = fs.readFileSync(fn, 'utf-8')
    let text = new String(fc)
    text = text.replace('<script>window.__NUXT__', '<script>const match = location.href.match(/\\/web\\/(\\d*)\\//);window.__NUXT__')
    text = text.replace('baseURL:"\\u002Fweb\\u002F"', 'baseURL: match ? `/web/${match[1]}/` : `/web/`')
    fs.writeFileSync(fn, text, 'utf8')
}

publish()
