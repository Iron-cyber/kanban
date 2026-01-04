let tasksData={};

const todo = document.querySelector("#todo");
const progress=document.querySelector("#progress");
const done=document.querySelector("#done");
dragElement= null;

const tasks= document.querySelectorAll(".task");//selecting task class
const  columns=[todo,progress,done];
function addTask(column, title, desc){
    const div=document.createElement("div");
    div.classList.add("task");
    div.setAttribute("draggable","true");
    div.innerHTML= `<h3>${title}</h3><p>${desc}</p> <button>Delete</button>`;
    column.appendChild(div);

    div.addEventListener("drag",(e)=>{
        dragElement= div;
    });
    const deleteButton=div.querySelector("button");
    deleteButton.addEventListener("click",()=>{
        div.remove();
        updateTaskCount();
    });
    return div;
}
function updateTaskCount(){
     columns.forEach(col=>{
            const tasks=col.querySelectorAll(".task");
            const count=col.querySelector(".right");

             tasksData[col.id]=Array.from(tasks).map(t=>{
             return{
                title: t.querySelector("h3").innerText,
                desc: t.querySelector("p").innerText
             }
            })
           localStorage.setItem("tasks",JSON.stringify(tasksData));
            count.innerText=tasks.length;
        })
}


if(localStorage.getItem("tasks")){
    const data =JSON.parse( localStorage.getItem("tasks"));

    for(const col in data){
      //const column=document.querySelector(`#${col}`);
        
        const column = document.getElementById(col);
        if (!column) continue;
        data[col].forEach(task=>{
        addTask(column,task.title,task.desc);
      })
      updateTaskCount();
      
    }
}

tasks.forEach(task=>{
    task.addEventListener("drag", (e)=>{
        //console.log("dragging",e);
        dragElement= task;
    });
})
function addDragEventsOnColumn(column){
    column.addEventListener("dragenter",(e)=>{
        e.preventDefault();
        column.classList.add("hover-over");
    })
    column.addEventListener("dragleave",(e)=>{
        e.preventDefault();
        column.classList.remove("hover-over");
    })
    column.addEventListener("dragover",(e)=>{
        e.preventDefault();
    })
    column.addEventListener("drop",(e)=>{
        e.preventDefault();

        console.log("dropped",dragElement,column);
        column.appendChild(dragElement);
        column.classList.remove("hover-over");
        updateTaskCount();

        /**columns.forEach(col=>{
            const tasks=col.querySelectorAll(".task");
            const count=col.querySelector(".right");

            count.innerText=tasks.length;
        })
        columns.forEach(col=>{
            const tasks=col.querySelectorAll(".task");
            const count=col.querySelector(".right");

             tasksData[col.id]=Array.from(tasks).map(t=>{
             return{
                title: t.querySelector("h3").innerText,
                desc: t.querySelector("p").innerText
             }
            })
           localStorage.setItem("tasks",JSON.stringify(tasksData));
            count.innerText=tasks.length;
        })**/
    })
}
addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);
/*modal logic*/
const toggleModalButton=document.querySelector("#toggle-modal");
const modal=document.querySelector(".modal");
const bg=document.querySelector(".modal .bg");
const addNewTaskButton=document.querySelector("#add-new-task");
const taskTitleInput=document.querySelector("#task-title-input");
const taskDescInput=document.querySelector("#task-desc-input");


toggleModalButton.addEventListener("click",()=>{
    modal.classList.toggle("active");
})
bg.addEventListener("click",()=>{ //clicking on bg will close the modal
    modal.classList.remove("active");
})
addNewTaskButton.addEventListener("click",()=>{
    const title=taskTitleInput.value;
    const desc=taskDescInput.value;
    addTask(todo,title,desc);
    updateTaskCount();
     
    taskTitleInput.value="";
    taskDescInput.value="";
    modal.classList.remove("active");
})
    /**const div=document.createElement("div");

    div.classList.add("task");
    div.setAttribute("draggable","true");
    div.innerHTML= `<h3>${title}</h3><p>${desc}</p> <button>Delete</button>`;
    todo.appendChild(div);
    addTask(todo,title,desc);
    columns.forEach(col=>{
            const tasks=col.querySelectorAll(".task");
            const count=col.querySelector(".right");

             tasksData[col.id]=Array.from(tasks).map(t=>{
             return{
                title: t.querySelector("h3").innerText,
                desc: t.querySelector("p").innerText
             }
            })
           localStorage.setItem("tasks",JSON.stringify(tasksData));
            count.innerText=tasks.length;
        })**/
 

