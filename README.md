## TO DEPLOY TO NETLIFY 

1. install netlify cli and run netlify login
`npm install netlify-cli -g`

2. install netlify cli, serverless http and netlify lambda
run `npm install netlify-cli serverless-http netlify-lambda`

3. create a netlify.toml
populate it with
[build]
    functions = "functions"

4. create a dist and functions folder

5. inside the dist folder create an empty index.html file 

6. inside the functions folder create a api.js file and have the following code with your server
start of the file 
`const serverlessHttp = require("serverless-http");`
`...`
`...`
`...`
`const handler = serverlessHttp(app);`
`module.exports.handler = async (event, context) => {`
`    const result = await handler(event, context);`
`    return result`
`}`
