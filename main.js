const fs = require('fs');
const readline = require('readline');
console.log("EZ Java v1 - Compiling")
async function ApplyChanges() {
  const fileStream = fs.createReadStream(process.argv.slice(2)[0]);
  
  var loggerq = fs.createWriteStream(process.argv.slice(2)[1])
  loggerq.write("")


  var logger = fs.createWriteStream(process.argv.slice(2)[1], {
    flags: 'a'
  })


  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  
  var lines = [];
  var plus = 0;
  for await (const line of rl) {
    lines.push({"line": line, "num": plus})
    var out = line.replace("pub", "public")
    out = out.replace("stat", "static")
    out = out.replace("nul", "void")
    out = out.replace("str", "String")
    out = out.replace("Sys.log", "System.out.println")
    out = out.replace("Sys.print", "System.out.print")
    out = out.replace("syscls", "class")
    out = out.replace("pkg", "package")
    out = out.replace("req", "import")
    logger.write("\n" + out)
    plus++
  }
  var line2 = 0;
  lines.forEach((value, index, array) => {
    if (line2 >= 10) {
      console.log(`${value.num}| ${value.line}`)
    } else {
      console.log(`${value.num} | ${value.line}`)
    }
    line2++;
  })
  
}

ApplyChanges()