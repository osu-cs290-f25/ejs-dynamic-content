var fs = require("fs")
var path = require("path")
var ejs = require("ejs")

var templatePath = process.argv[2]
var outputPath = process.argv[3]

console.log("== templatePath:", templatePath)
console.log("== outputPath:", outputPath)

var template = fs.readFileSync(templatePath, "utf-8")
console.log("== template:", template)

var templateFn = ejs.compile(template, { client: true })
console.log("== templateFn:", templateFn.toString())

var templateExt = path.extname(templatePath)
var templateName = path.basename(templatePath, templateExt)
console.log("== templateName:", templateName)

var output = "window.templates = window.templates || {}\n"
output += "window.templates[\"" + templateName + "\"] = " + templateFn

fs.writeFileSync(outputPath, output)
