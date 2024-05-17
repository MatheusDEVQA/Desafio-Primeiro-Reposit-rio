const newman = require('newman')

let collectionFile

const context = process.argv[2]
const environment = process.argv[3]

try{
    collectionFile= require(`./context/${context}/${context}.postaman_collection.json`)

    console.log(`Running ${context} tests`)
    runTests(context, environment)
}catch (err) {
    console.error(`Error loading file to suite '${context}' and environment '${environment}: '${err.message}'`)
    process.exit(1)
}

function runTests(context, environment){
    newman.run({
        collection: collectionFile,
        reporters,
        insecure: true,
        iterationCount: 1        
    })
}