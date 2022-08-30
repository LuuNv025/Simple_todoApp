export class todoList{
    constructor(){
        this.todoList = [];
    }
    addTodo(todo){
        this.todoList.push(todo);
    }
    removeTodo(index){
        this.todoList.splice(index, 1)
    }
    renderTodo(){
        let content = "";
        content = this.todoList.reduceRight((tdcontent,item,index)=>{
            // reduceRight duyệt mảng từ phải qua trái
            tdcontent += `
                <li>
                    <span>${item.textToDo}</span>
                    <div class="button">
                        <button class="remove" data-index = "${index}" data-status = "${item.status}" onclick="deleteTodo(event)">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button class="complete" data-index = "${index}" data-status = "${item.status}" onclick = "completeTodo(event)">
                            <i class="fa fa-check-circle"></i>
                        </button>
                    </div>
                </li>
            `;
            return tdcontent;
        },'');
        return content;
    }
    softTodo(isDes){
        this.todoList.sort((todo, nextTodo)=>{
            const textA = todo.textToDo.toLowerCase();
            const textB = nextTodo.textToDo.toLowerCase();
            //ASC
            return textB.localeCompare(textA);
        })
        if(isDes){
            this.todoList.reverse();
        }
    }
}