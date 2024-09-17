const taskInput=document.querySelector("#add-todo")
const dateInput=document.querySelector("#add-date")
const addBtn=document.querySelector("#add-btn")
const message=document.querySelector(".message")
const table=document.querySelector("table")
const outertable=document.querySelector(".table")
const deleteAllBtn=document.querySelector("#delete-all")
const pendingFilter=document.querySelector("#filter-pending")
const compeleteFilter=document.querySelector("#filter-complete")
const allFilter=document.querySelector("#filter-all")



let todos=[]
let newTodo=[]

for(i=0;i<localStorage.length;i++){
     newTodo.push(JSON.parse( localStorage.getItem(localStorage.key(i))))
}

const generateId=()=>{
   return Math.round(Math.random()*Math.random()* Math.pow(10,15)).toString()
}


const add=()=>{
    
    const todo={
        task:taskInput.value,
        date:dateInput.value,
        isCopmleted:false,
        id:generateId()
    }
   

    const {task,date,id}=todo

    if(!task){
        showMessage("white")
        setTimeout(clearMessage,3000)
        return
        
    }else if(task && !date){
        showMessage("add")
        setTimeout(clearMessage,3000)
        todos.push(todo)
        saveLocalStorage(id,todo)
        newRow()
    }
    else if(task && date){
        showMessage("add")
        setTimeout(clearMessage,3000)
        todos.push(todo)
        saveLocalStorage(id,todo)
        newRow()
}

taskInput.value=" "
dateInput.value=" "

}


const saveLocalStorage=(id,todo)=>{
    localStorage.setItem(id,JSON.stringify(todo))
}


const createNewRow=()=>{

    const newRow=document.createElement("tr")   //create new row
    const newTodo=table.appendChild(newRow)     //add new row to todo table
    const todoTask=document.createElement("td") //create new column
    const todoDate=document.createElement("td")
    const todoStatus=document.createElement("td")
    const todoAction=document.createElement("td")
    const editAction=document.createElement("button") //create buttons
    const doAction=document.createElement("button")
    const deleteAction=document.createElement("button") 
    deleteAction.classList="red-btn"
    deleteAction.onclick=deleteTodo
    deleteAction.innerText="Delete"
    doAction.classList="green-btn"
    doAction.innerText="Do"
    doAction.onclick=doHandeler
    doAction.classList.add("do-btn")
    editAction.classList="yellow-btn"
    editAction.classList.add("edit-btn")
    editAction.innerText="Edit"
    editAction.onclick=editHandeler
    doAction.style.width="58px"
    editAction.style.width="58px"
    deleteAction.style.width="58px"


    todoAction.append(editAction)       //add buttons to action columns
    todoAction.append(doAction)
    todoAction.append(deleteAction)

    newTodo.appendChild(todoTask)       //add columns to todo table
    newTodo.appendChild(todoDate)
    newTodo.appendChild(todoStatus)
    newTodo.appendChild(todoAction)

    
   
}

const newRow=()=>{

    createNewRow()

    const todoTask=table.lastElementChild.children[0]
    const todoDate=table.lastElementChild.children[1]
    const todoStatus=table.lastElementChild.children[2]
    
    todos.map(item=>{


    const {task,date,isCopmleted,id}=item

    if(task){

        todoTask.innerText=task
    }
    if(!date){
        todoDate.innerText="No date"
    }else{
        todoDate.innerText=date
    }
    if(!isCopmleted){
        todoStatus.innerText="Pending"
    }else{
        todoStatus.innerText="Done"
    }
    
    })
    
}

const showMessage=(status)=>{
    
    message.style.animation="message-animation 0.6s 1"
    
    switch (status) {
        
        case "add":
            message.style.visibility="visible"
            message.innerText="Todo added successfully"
            message.style.backgroundColor="rgb(91, 214, 91)"
            // message.style.animation="message-animation .6s 1"
            break;

        case "edit":
            message.style.visibility="visible"
            message.innerText="Todo edited successfully"
            message.style.backgroundColor="rgb(91, 214, 91)"
            // message.style.animation="message-animation .6s 1"
            break;    

        case "delete":
            message.style.visibility="visible"
            message.innerText="Todo deleted successfully"
            message.style.backgroundColor="red"
            // message.style.animation="message-animation .6s 1"
            break; 

        case "white":
            message.style.visibility="visible"
            message.innerText="Please enter a todo!"
            message.style.backgroundColor="red"
            // message.style.animation="message-animation .6s 1"
            break;
           
        default:
            break;
    }
}


const clearMessage=()=>{
    message.style.visibility="hidden"
}


const show=()=>{

        for(i=0;i<localStorage.length;i++){
           
        createNewRow()
        let todoTask=table.lastElementChild.children[0]
        let todoDate=table.lastElementChild.children[1]
        let todoStatus=table.lastElementChild.children[2]
        

            const todoStoroge=localStorage.getItem(localStorage.key(i))
            const todo=JSON.parse (todoStoroge)
            
            if(todo.task){

                todoTask.innerText=todo.task
            }
            if(!todo.date){
                todoDate.innerText="No date"
            }else{
                todoDate.innerText=todo.date
            }
            if(!todo.isCopmleted){
                todoStatus.innerText="Pending"
            }else if(todo.isCopmleted){
                todoStatus.innerText="Done"
                todoStatus.parentElement.children[3].children[1].innerText="Undo"
            } 
        }
    }


const deleteAll=()=>{
    todos=[]
    localStorage.clear()
    // show()
    window.location.reload()
}



const deleteTodo=(e)=>{

    const taskName=e.target.parentElement.parentElement.children[0].textContent
    const taskDate=e.target.parentElement.parentElement.children[1].textContent
    const taskId= newTodo.map(item=>{
        if(taskName==item.task ){
            if(taskDate==item.date || taskDate=="No date"){

                console.log(item.id);
                localStorage.removeItem(item.id)
                showMessage("delete") 
            }
        }
       
    })
}


const doHandeler=(e)=>{
    
    const taskName=e.target.parentElement.parentElement.children[0].textContent
    const taskDate=e.target.parentElement.parentElement.children[1].textContent
    const doAction=e.target.parentElement.parentElement.children[2];

    newTodo.map(item=>{
        
        if(taskName==item.task && taskDate==item.date || taskDate=="No date"){
            if(!item.isCopmleted){

                item.isCopmleted=true
                localStorage.setItem(item.id,JSON.stringify(item))
                doAction.innerText="Done";
                e.target.innerText="Undo"
                showMessage("edit")
                setTimeout(clearMessage,3000)
    
            }else if(item.isCopmleted){
                item.isCopmleted=false
                localStorage.setItem(item.id,JSON.stringify(item))
                doAction.innerText="Pending";
                e.target.innerText="Do"
                showMessage("edit")
                setTimeout(clearMessage,3000)
            }
            } 
    })
    
}



const editHandeler=(e)=>{

    const taskName=e.target.parentElement.parentElement.children[0].textContent
    const taskDate=e.target.parentElement.parentElement.children[1].textContent
    const taskDateRow=e.target.parentElement.parentElement.children[1]
    const taskNameRow=e.target.parentElement.parentElement.children[0]


    newTodo.map(item=>{
        
        if(taskName==item.task){
            if(taskDate==item.date || taskDate=="No date"){
                taskInput.value=item.task
                dateInput.value=item.date
                addBtn.innerText="Edit"
                addBtn.removeEventListener("click",add)
                addBtn.addEventListener("click",function edit() {
                    taskDateRow.innerText=dateInput.value
                    taskNameRow.innerText=taskInput.value
                    item.date=dateInput.value
                    item.task=taskInput.value
                    localStorage.setItem(item.id,JSON.stringify(item))
                    location.reload()
                })
            } 
        }
    })
}


const pendingHadeler=()=>{

    for(let i=1;i<=newTodo.length;i++){
        table.children[i].style.display="none"
        
    }
    newTodo.map(item=>{
        if(!item.isCopmleted){
            createNewRow()
            let todoTask=table.lastElementChild.children[0]
            let todoDate=table.lastElementChild.children[1]
            let todoStatus=table.lastElementChild.children[2]

            todoTask.innerText=item.task
            todoDate.innerText=item.date
            todoStatus.innerText="Pending"

        }
    })
   

    // const rows= table.children.length

    // for(let i=1;i<localStorage.length;i++){
    //     const status= table.children[i].children[2].innerText;
    //     if(status!=="Pending"){
    //         table.children[i].style.display="none"
    //     }
    // }


    // for(let i=0;i<newTodo.length;i++){
    //     if(newTodo[i].isCopmleted==="Pending"){
    //         show()
    //     }
    // }


    //  for(i=0;i<localStorage.length;i++){
           
    //     createNewRow()
    //     // let todoTask=table.lastElementChild.children[0]
    //     // let todoDate=table.lastElementChild.children[1]
    //     // let todoStatus=table.lastElementChild.children[2]
    //     // const status= table.children[i].children[2].innerText


    //         const todoStoroge=localStorage.getItem(localStorage.key(i))
    //         const todo=JSON.parse (todoStoroge)
            
    //         if(todo.task){

    //             todoTask.innerText=todo.task
    //         }
            
}

const compeleteHadeler=()=>{
    // const rows= table.children.length

    // for(let i=1;i<rows;i++){
    //     const status= table.children[i].children[2].innerText;
    //     if(status=="Pending"){
    //         table.children[i].style.display="none"
    //     }
    // }
    
    for(let i=1;i<=newTodo.length;i++){
        
        table.children[i].style.display="none"
        
    }
    
    newTodo.map(item=>{
        if(item.isCopmleted===true){
            createNewRow()
            let todoTask=table.lastElementChild.children[0]
            let todoDate=table.lastElementChild.children[1]
            let todoStatus=table.lastElementChild.children[2]

            todoTask.innerText=item.task
            todoDate.innerText=item.date
            todoStatus.innerText="Done"
            todoStatus.parentElement.children[3].children[1].innerText="Undo"
            

        }
    })
 

}

const allHandeler=()=>{
    // const rows= table.children.length
    // console.dir(table);
    // for(let i=1;i<rows;i++){
        
    //     console.log(table.children[i]);
    //         // table.children[i].style.display="block"
    //         // table.style.display="inline-block"
    //         // table.style.width="100%"
    //         // outertable.style.display="block"
    //         // outertable.classList="table"
    //         // table.children[i].children[i].style.padding="12px"
            
    // }
    for(let i=1;i<=newTodo.length;i++){
        table.children[i].style.display="none"
    }
    newTodo.map(item=>{
        
            createNewRow()
            let todoTask=table.lastElementChild.children[0]
            let todoDate=table.lastElementChild.children[1]
            let todoStatus=table.lastElementChild.children[2]

            todoTask.innerText=item.task
            todoDate.innerText=item.date
            if(item.isCopmleted){
                todoStatus.innerText="Done"
                todoStatus.parentElement.children[3].children[1].innerText="Undo"

            }else{
                todoStatus.innerText="Pending"

            }

        
    })
    location.reload()
}

addBtn.addEventListener("click",add)
deleteAllBtn.addEventListener("click",deleteAll)
// document.addEventListener("DOMContentLoaded", show);
window.addEventListener("load",show)
pendingFilter.addEventListener("click",pendingHadeler)
compeleteFilter.addEventListener("click",compeleteHadeler)
allFilter.addEventListener("click",allHandeler)



