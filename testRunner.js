const newman = require('newman')

let collectionFile
let environmentFile

const context = process.argv[2]
const environment = process.argv[3]

try {
    collectionFile = require(`./context/${context}/${context}.postman_collection.json`)
    environmentFile = require(`./context/${context}/${environment}-${context}.postman_environment.json`)

    console.log(`Running ${context} tests`)
    runTests(context, environment)
} catch (err) {
    console.error(`Error loading file to suite '${context}' and environment '${environment}: '${err.message}'`)
    process.exit(1)
}

function runTests(context, environment) {
    let reporters = ['junit', 'cli', 'json'];
    newman.run({
        collection: collectionFile,
        environment: environmentFile,
        insecure: true,
        reporters,
        iterationCount: 1,
        reporter: {
            junit: {
                export: `newman/${context}.xml`
            },
            json: {
                export: `newman/${context}.json`
            }
        }
    })
}
