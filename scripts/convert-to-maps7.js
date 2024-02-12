import { exec } from 'child_process'
import fs from 'fs'

fs.readdirSync('maps').forEach(file => {
    if (! fs.existsSync(`maps7/${file}`)) {
        exec(`./scripts/map_convert_07 "maps/${file}" "maps7/${file}"`, (err, stdout, stderr) => {
            if (err) {
                console.error(`Error converting ${file} to maps7: ${err}`)
                return
            }

            console.log(`Converted ${file} to maps7!`)
        })
    }
})