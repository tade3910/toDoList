//List Object
class ToDo{
    constructor(){
        this.text = document.querySelector("#task");
        this.list = document.querySelector("ul");  
        this.taskNo = 1;
        this.taskId = "task"+this.taskNo;   
    }
    addTask(){
        this.searchForDelete();
        let text = this.text.value;
        if(text.length > 0){
            let task = document.createElement("li");
            let listText = document.createElement("sec");
            listText.textContent = text;
            
            task.appendChild(listText);
            let trash = document.createElement("button");
            trash.classList.add("trash");
            trash.addEventListener("click",this.deleter);
            let trashSymbol = document.createElement("i");
            trashSymbol.classList.add("gg-trash");
            trash.appendChild(trashSymbol);
            let upButton = document.createElement("button");
            upButton.classList.add("upArrow");
            upButton.addEventListener("click",this.moveUp);
            upButton.appendChild(document.createElement("span"));
            let downButton = document.createElement("button");
            downButton.classList.add("downArrow");
            downButton.addEventListener("click",this.moveDown)
            downButton.appendChild(document.createElement("span"));
            
            task.appendChild(upButton);
            task.appendChild(downButton);
            task.appendChild(trash);
            task.setAttribute("id",this.taskId);
            task.setAttribute("draggable", true);
            task.addEventListener("dragover", this.dragOver);
            task.addEventListener("dragleave", this.dragLeave);
            task.addEventListener("drop", this.dragDrop);
            task.addEventListener("dragend",this.dragEnd);
            task.addEventListener("dragstart", this.dragStart);

            this.taskNo++;
            this.taskId = "task"+this.taskNo;  
            this.list.appendChild(task);
            this.text.value = "";
            
        }
    }
    deleter(){
        let currentTask = this.parentNode;
        let currentTaskId = this.parentElement.getAttribute("id");
        let regex = /[^task]/g;
        let currentTaskNo = Number(currentTaskId.match(regex)[0]);
        let buttomTaskNo = currentTaskNo + 1;
        let buttomTaskId = "task" + buttomTaskNo;
        let buttomTask = document.getElementById(buttomTaskId);
        while(buttomTask != null ){
            buttomTask.after(currentTask);
            buttomTask.setAttribute("id", currentTaskId);
            currentTask.setAttribute("id", buttomTaskId);
            currentTaskId = buttomTaskId;
            buttomTaskNo++;
            buttomTaskId = "task" + buttomTaskNo;
            buttomTask = document.getElementById(buttomTaskId);
        }
        this.parentNode.remove();
    }
    
    moveUp(){
        let currentTask = this.parentNode;
        let currentTaskId = this.parentElement.getAttribute("id");
        let regex = /[^task]/g;
        let currentTaskNo = currentTaskId.match(regex)[0];
        currentTaskNo = Number(currentTaskNo);
        if(currentTaskNo > 1){
            let topTaskNo = currentTaskNo - 1;
            let topTaskId = "task" + topTaskNo
            let topTask = document.getElementById(topTaskId);
            let list = document.querySelector("ul");  
            list.insertBefore(currentTask,topTask);
            currentTask.setAttribute("id",topTaskId);
            topTask.setAttribute("id", currentTaskId);
        } 
        

    }
    moveDown(){
        let currentTask = this.parentNode;
        let currentTaskId = this.parentElement.getAttribute("id");
        let regex = /[^task]/g;
        let currentTaskNo = currentTaskId.match(regex)[0];
        currentTaskNo = Number(currentTaskNo);
        let buttomTaskNo = currentTaskNo + 1;
        let buttomTaskId = "task" + buttomTaskNo;
        let buttomTask = document.getElementById(buttomTaskId)
        if(buttomTask != null ){
            buttomTask.after(currentTask);
            buttomTask.setAttribute("id", currentTaskId);
            currentTask.setAttribute("id", buttomTaskId);
        }
    }
    
    searchForDelete(){
        let deleted = false;
        let taskNo = this.taskNo;
        taskNo--;
        let taskId = "task"+ taskNo;
        while(document.getElementById(taskId) == null && this.taskNo > 1){
            taskNo--;
            taskId = "task"+ taskNo;
            deleted = true;
            if(taskNo <= 0){
                break;
            }
        }
        if(deleted){
            taskNo++;
            this.taskNo = taskNo;
            this.taskId = "task"+ taskNo;     
        } 
    }

    dragOver(e){
        e.preventDefault();
        this.style.border = "1px solid blue";
    }
    dragLeave(){
        this.style.border = "1px solid black";
       
    }
    dragDrop(){
        let currentTask = document.querySelector(".dragging");
        let currentTasktext = currentTask.firstChild.textContent;
        let newPositiontext = this.firstChild.textContent;
        this.firstChild.textContent = currentTasktext;
        currentTask.firstChild.textContent = newPositiontext;
        this.style.border = "1px solid black";
    }
    dragEnd(){
        this.classList.remove("dragging");
        
    }
    dragStart(){
        this.classList.add("dragging");
    }
    
}

// Main script
let toDo = new ToDo();
const addButton = document.querySelector("#add");
addButton.addEventListener("click",()=> toDo.addTask());
addButton,addEventListener("keypress",(e)=> {
    if(e.key === "Enter"){
        toDo.addTask();
    }
})


