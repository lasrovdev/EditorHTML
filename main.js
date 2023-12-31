ace.require("ace/ext/language_tools");

const $ = e => document.querySelector(e)
const $$ = e => document.querySelectorAll(e)

const editor_div1 = $("#editor1")
const editor1 = ace.edit("editor1")

const buttons = $$("#buttons button")

const run = $("#run")
const iframe = $("iframe")

const barraY = $("#barra_y")

let auto_run;

buttons.colorBtn = btn => {
  for(a of buttons){
    a.style.borderBottom = null
  }
  btn.style.borderBottom = "2px solid purple"
}

buttons.colorBtn(buttons[0])

let html = localStorage.getItem("html_code") ?? (`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>My page Web</title>
  </head>
  <body align="center">
    <h1>Hello World</h1>
    <p>This is my first webpage!</p>
  </body>
</html>`)
let css = localStorage.getItem("css_code") ?? (`body{
  color: red;
  background: yellow
}`)
let js = localStorage.getItem("js_code") ?? `document.write("Hello World!")`

let type = "html"

editor1.setOptions({
  scrollPastEnd: true,
  dragEnabled: false,
  selectionStyle: "text",
  fontSize: "16px",
  printMargin: false,
  tabSize: 2,
  mode: "ace/mode/html",
  theme: "ace/theme/monokai",
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  wrap: true
})

editor1.on("change", function(){
  if(type === "html"){
      html = editor1.getValue()
      localStorage.setItem("html_code", html)
  } else if(type === "css"){
      css = editor1.getValue()
      localStorage.setItem("css_code", css)
  } else {
      js = editor1.getValue()
      localStorage.setItem("js_code", js)
  }
})
function setValue(v){
  editor1.setValue(v)
  editor1.clearSelection()
}
setValue(html)

buttons[0].ontouchstart = function(){
  editor_div1.parentNode.style.display = "block"
  run.style.display = "none"
  
  type = "html"
  
  setValue(html)
  editor1.setOptions({mode:'ace/mode/html'})
  
  buttons.colorBtn(this)
}
buttons[1].ontouchstart = function() {
  editor_div1.parentNode.style.display = "block"
  run.style.display = "none"
  
  type = "css"
  
  setValue(css)
  editor1.setOptions({mode:'ace/mode/css'})
  
  buttons.colorBtn(this)
}
buttons[2].ontouchstart = function() {
  editor_div1.parentNode.style.display = "block"
  run.style.display = "none"
  
  type = "js"
  
  setValue(js)
  editor1.setOptions({mode:'ace/mode/javascript'})
  
  type = "js"
  buttons.colorBtn(this)
}
buttons[3].ontouchstart = function(){
  run.style.display = "block"
  iframe.srcdoc = `
  ${html}
  <style>${css}</style>
  
  <script>
  window.onerror = function(message, url, line, col) {
    alert(message+"\\n"+url+", "+line+":"+col)
  }
  eval("${js}")
  </script>`
  
  editor_div1.parentNode.style.display = "none"
  
  type = null
  buttons.colorBtn(this)
}

if(auto_run){
  let event = new Event("click")
  buttons[3].dispatchEvent(event)
  
  buttons.colorBtn(buttons[3])
}