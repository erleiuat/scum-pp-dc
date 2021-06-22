const execFile = require('child_process').execFile
const fs = require('fs')
const path = require('path')
const promisify = require('util').promisify

const writeFile = promisify(fs.writeFile)

exports.createGif = async function createGif(name, inputDir, dstPath, cwd = 'C:/Users/Elia/Documents/Code/scum-pp-dc') {
    return new Promise(resolve => {
        let str = ''
        let images = fs.readdirSync(inputDir)
        images.forEach((image, i) => {
            str += `file ${path.basename(image.path)}\n`
            str += `duration ${image.duration}\n`
        })
        str += `file ${path.basename(images[images.length - 1].path)}`
        const txtPath = path.join(cwd, 'template.txt')
        writeFile(txtPath, str).then(() => {
            execFile(
                './app/plugins/ffmpeg/ffmpeg.exe',
                [
                    '-f',
                    'concat',
                    '-i',
                    'template.txt',
                    '-lavfi',
                    'palettegen=stats_mode=diff[pal],[0:v][pal]paletteuse=new=1:diff_mode=rectangle',
                    dstPath
                ], {
                    cwd
                },
                (error, stdout, stderr) => {
                    if (error) {
                        throw error
                    } else {
                        resolve()
                    }
                }
            )
        })
    })
}