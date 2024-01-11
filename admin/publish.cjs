const fs = require('fs')

const publish = () => {
    const src = './dist'
    const dest = '../niucloud/public/admin'

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
    const fn = './dist/index.html'
    const fc = fs.readFileSync(fn, 'utf-8')
    let text = new String(fc)
    text = text.replaceAll('./assets/', '/admin/assets/')
    fs.writeFileSync(fn, text, 'utf8')
}

publish()
