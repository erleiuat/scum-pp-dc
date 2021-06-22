const GIFEncoder = require('gif-encoder-2')
const {
    createCanvas,
    Image
} = require('canvas')
const {
    createWriteStream,
    readdir
} = require('fs')
const {
    promisify
} = require('util')
const path = require('path')

const readdirAsync = promisify(readdir)

exports.createGif = async function createGif(name, inputDir, outputDir) {
    return new Promise(async resolve1 => {
        const files = await readdirAsync(inputDir)

        const [width, height] = await new Promise(resolve2 => {
            const image = new Image()
            image.onload = () => resolve2([image.width, image.height])
            image.src = path.join(inputDir, files[0])
        })

        const dstPath = path.join(outputDir, `${name}.gif`)

        const writeStream = createWriteStream(dstPath)

        writeStream.on('close', () => {
            resolve1()
        })

        const encoder = new GIFEncoder(width, height, 'neuquant')

        encoder.createReadStream().pipe(writeStream)
        encoder.start()
        encoder.setDelay(200)

        const canvas = createCanvas(width, height)
        const ctx = canvas.getContext('2d')

        for (const file of files) {
            await new Promise(resolve3 => {
                console.log('[GIFMAKER] -> Working...')
                const image = new Image()
                image.onload = () => {
                    ctx.drawImage(image, 0, 0)
                    encoder.addFrame(ctx)
                    resolve3()
                }
                image.src = path.join(inputDir, file)
            })
        }
    })
}