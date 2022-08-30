// import loớp đối tượng
import { ToDo } from "./todo.js";
import { todoList } from "./todoList.js"; 

let tdList = new todoList();
let completeList = new todoList();
// ham rut gon cu phap fetelementbyid
const getEle = id =>{
    return document.getElementById(id);
}
// hàm thêm todo 
const addTodo = ()=>{
    let txtToDo = getEle('newTask').value;
    let ulToDo = getEle('todo');
    if(txtToDo != ""){
        let td = new ToDo(txtToDo,"todo");
        tdList.addTodo(td);
        showTodoList(ulToDo);
    }
    getEle('newTask').value ='';
}

getEle('addItem').addEventListener("click",()=>{
    addTodo();
})
// Hàm hiển thị todo
const showTodoList =(ulToDo)=>{
    ulToDo.innerHTML =tdList.renderTodo();
}
const showCompleteList =(ulComplete)=>{
    ulComplete.innerHTML =completeList.renderTodo();
}
// hàm xoa 1 todo
const deleteTodo = (e)=>{
    let tdIndex = e.target.getAttribute("data-index");
    let status = e.currentTarget.getAttribute("data-status");
    let ulToDo = getEle("todo");
    let ulComplete = getEle("completed");
    if(status == "todo"){
        tdList.removeTodo(tdIndex);
        showTodoList(ulToDo);
    }else if(status == "complete"){
        completeList.removeTodo(tdIndex);
        showCompleteList(ulComplete);
    }
    
}
window.deleteTodo = deleteTodo;

// ham đổi trạng thái todo
const completeTodo = (e)=>{
    let tdIndex = e.currentTarget.getAttribute("data-index");
    let status = e.currentTarget.getAttribute("data-status");
    if(status == "todo"){
        // trả vê mảng các đối tượng có status là todo
        let completeItem = tdList.todoList.slice(tdIndex, tdIndex+1);
        // Tạo dối tượng mới với status là complete]
        let newObj = new ToDo(completeItem[0].textToDo,"complete");
        let ulToDo = getEle("todo");
        let ulComplete = getEle("completed");
        moveTodo(tdList,completeList,newObj,tdIndex);
        showTodoList(ulToDo);
        showCompleteList(ulComplete);
    }else if(status == "complete"){
        let undoItem = completeList.todoList.slice(tdIndex, tdIndex+1);
        let newObj = new ToDo(undoItem[0].textToDo,"todo");
        let ulToDo = getEle("todo");
        let ulComplete = getEle("completed");
        moveTodo(completeList,tdList,newObj,tdIndex);
        showTodoList(ulToDo);
        showCompleteList(ulComplete);
    }else{
        alert("Khong the di chuyen todo")
    }
}
window.completeTodo = completeTodo;

// hàm di chuyển todo

const moveTodo = (first,after,obj,index)=>{
    // remove todo from first
    first.removeTodo(index);
    // add todo to after
    after.addTodo(obj);
}

const softASC = ()=>{
    let ulToDo = getEle("todo");
    tdList.softTodo(false);
    showTodoList(ulToDo)
}
window.softASC = softASC;

const softDES = ()=>{
    let ulToDo = getEle("todo");
    tdList.softTodo(true);
    showTodoList(ulToDo)
}
window.softDES = softDES;