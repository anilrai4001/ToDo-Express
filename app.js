const { json } = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');
const port = 4000;
const { v4: uuidv4 } = require('uuid');


app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());

let todos = [];

app.get('/gettodos',(req,res,next)=>{
    res.send(todos);
})

app.post('/addtodo',(req,res)=>{
    const {name} = req.body;
    // console.log(name);
    todos.push({
        id: uuidv4(),
        name
    });
    res.redirect('/gettodos');
})

app.post('/deletetodo',(req,res)=>{
    const {id} = req.body;
    todos = todos.filter((task)=>{
        if(task.id == id) return false;
        return true;
    })
    res.redirect('/gettodos');
})

app.get('/uptodo',(req,res)=>{
    const {id} = req.query;
    let index=0;
    todos.forEach((element,i) => {
        if(element.id == id)
            index =i;
    });
    const temp = todos[index];
    todos[index]=todos[index-1];
    todos[index-1]=temp;
    res.redirect('/gettodos');
})
app.get('/downtodo',(req,res)=>{
    const {id} = req.query;
    let index=0;
    todos.forEach((element,i) => {
        if(element.id == id)
            index =i;
    });
    const temp = todos[index];
    todos[index]=todos[index+1];
    todos[index+1]=temp;
    res.redirect('/gettodos');
})


app.listen(port,(err)=>{
    if(err) return console.log(err.message);
    console.log(`http://localhost:${port}`);
})