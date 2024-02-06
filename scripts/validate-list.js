import puppeteer from 'puppeteer'
import fs from 'fs'

const browser = await puppeteer.launch()
const page    = await browser.newPage()

await page.goto("https://kog.tw/get.php?p=maps&p=maps")

const updatedList = await page.evaluate(() => {
    const list = []

    document.querySelectorAll('.card-deck .card').forEach(cardEl => {
        const name = cardEl.querySelector('.card-header h4').innerText
        const type = cardEl.querySelector('.card-body li:nth-child(2)').innerText

        list.push({ name, type })
    })

    return list
})

for (const { name, type } of updatedList) {
    if (! fs.existsSync(`maps/${name}.map`)) {
        console.warn(`Map ${name} - ${type} is missing!`)
    }
}

await browser.close()

console.log('Validation completed!')