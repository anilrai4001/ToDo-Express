const newtask = document.querySelector('#newtask');
const addtask = document.querySelector('#addtask');
const taskList = document.querySelector('#taskList');


function domManipulation(todos){
    taskList.innerText='';
    todos.forEach((task) => {
        let li = document.createElement('li');
        li.innerHTML = `
        <span>${task.name}</span>
        <button btnid="${task.id}" class="up">⬆️</button>
        <button btnid="${task.id}" class="down">⬇️</button>
        <button btnid="${task.id}" class="delete">🗑️</button>
        `;
        taskList.appendChild(li);
    });
}

axios.get('/gettodos')
    .then((res)=>{
        let todos = res.data;
        domManipulation(todos);
    })
    .catch((err)=>{
        console.log(err);
    })

addtask.addEventListener('click',(e)=>{
    e.preventDefault();
    // console.log('you tried to submit the form');
    axios.post('/addtodo',{
            name: newtask.value
        }).then((res)=>{
        let todos = res.data;
        domManipulation(todos);
        newtask.value='';
        // console.log(todos);
        }).catch((err)=>{
        console.log(err);
        })
})

taskList.addEventListener('click',(e)=>{
    // console.log(e);
    // console.log(e.target);
    let btnid = e.target.getAttribute('btnid');
    let btnclass = e.target.className;
    // console.log(btnid);
    // console.log(btnclass);
    if(btnclass=='delete'){
        axios.post('/deletetodo',{id:btnid})
            .then((res)=>{
                let todos = res.data;
                domManipulation(todos);
            })
            .catch((err)=>{
                console.log(err);
            })
    }
    else if(btnclass=='up'){
        axios.get(`/uptodo/?id=${btnid}`)
            .then((res)=>{
                let todos = res.data;
                domManipulation(todos);
            })
            .catch((err)=>{
                console.log(err);
            })
    }
    else if(btnclass=='down'){
        axios.get(`/downtodo/?id=${btnid}`)
            .then((res)=>{
                let todos = res.data;
                domManipulation(todos);
            })
            .catch((err)=>{
                console.log(err);
            })
    }
    
})