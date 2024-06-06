const rl = require("readline");
const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceHtml = require("./modules/replacehtml");

/*
*************************
reading input and writing output from terminal
***********
const read=rl.createInterface({
    input:process.stdin,
    output:process.stdout
})
read.question("enter your name:",(name)=>{
    console.log("you entered "+name)
    read.close();
})
read.on('close',()=>{
    console.log("terminated")
})
*/
//*********************
// reading a file and writing a file.

// let inp=fs.readFileSync('./file/input.txt','utf-8')
// console.log(inp)
// let outp=`data from input: ${inp} \n Date:${new Date()}`
// fs.writeFileSync('./file/output.txt',outp)

// fs.readFile('./file/input.txt','utf-8',(err,data)=>{
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log("this is in async data reading :"+data)
//         fs.readFile(`./file/${data}.txt`,'utf-8',(err1,data1)=>{
//             if(err1){
//                 console.log(err1)
//             }
//             else{
//                 console.log(data1)
//             }

//             })
//     }

// })
// console.log("Reading file...")

// const ser=http.createServer((req,res)=>{
//     res.end()
//     console.log("a new request")

// })

// ser.listen(8000,'127.0.0.1',()=>{
//     console.log('server started...');
// })
let products = JSON.parse(fs.readFileSync("./file/products.json", "utf-8"));
let html = fs.readFileSync("./file/index.html", "utf-8");
let producthtml = fs.readFileSync("./file/productHtml.html", "utf-8");
let proddetail = fs.readFileSync("./file/product-details.html", "utf-8");

// let server = http.createServer((req, res) => {
//   let { query, pathname: path } = url.parse(req.url, true);

//   if (path === "/" || path.toLocaleLowerCase() === "/home") {
//     res.end(html.replace("{{%content}}", "Home"));
//   } else if (path.toLocaleLowerCase() === "/about") {
//     res.end(html.replace("{{%content}}", "About"));
//   } else if (path.toLocaleLowerCase() === "/products") {
//     if (!query.id) {
//       let productresponse = products.map((prod) => {
//         return replaceHtml(producthtml, prod);
//       });

//       let product = html.replace("{{%content}}", productresponse.join(""));
//       res.end(product);
//     } else {
//       let productId = products[query.id];
//       let productdet = replaceHtml(proddetail, productId);
//       res.end(html.replace("{{%content}}", productdet));
//     }
//   } else if (path.toLocaleLowerCase() === "/contact") {
//     res.end(html.replace("{{%content}}", "contact"));
//   } else {
//     res.end(html.replace("{{%content}}", "Home"));
//   }
// });

let server = http.createServer();
server.on('request', (req, res) => {
  let { query, pathname: path } = url.parse(req.url, true);

  if (path === "/" || path.toLocaleLowerCase() === "/home") {
    res.end(html.replace("{{%content}}", "Home"));
  } else if (path.toLocaleLowerCase() === "/about") {
    res.end(html.replace("{{%content}}", "About"));
  } else if (path.toLocaleLowerCase() === "/products") {
    if (!query.id) {
      let productresponse = products.map((prod) => {
        return replaceHtml(producthtml, prod);
      });

      let product = html.replace("{{%content}}", productresponse.join(""));
      res.end(product);
    } else {
      let productId = products[query.id];
      let productdet = replaceHtml(proddetail, productId);
      res.end(html.replace("{{%content}}", productdet));
    }
  } else if (path.toLocaleLowerCase() === "/contact") {
    res.end(html.replace("{{%content}}", "contact"));
  } else {
    res.end(html.replace("{{%content}}", "Home"));
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server started...");
});
