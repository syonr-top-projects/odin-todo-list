import { format, parse } from "date-fns";
import SubTodo from "../backend/subTodo";
import { save } from "../backend/localStorage";

export function renderTodo(projectManager, project, todo) {
    
    const todoPopUp = document.createElement("div");
    todoPopUp.id = "todo-pop-up";

    if (document.querySelector("#todo-pop-up")) return;

    // create main section
    const todoMainSection = document.createElement("div");
    todoMainSection.id = "todo-main-section";
    const todoTitle = document.createElement("div");
    todoTitle.textContent = todo.name;
    const todoDescription = document.createElement("div");
    todoDescription.textContent = todo.todoDescription;

    todoMainSection.appendChild(todoTitle);
    todoMainSection.appendChild(todoDescription);

    const subTodoList = document.createElement("div");
    subTodoList.id = "sub-todo-list";

    renderSubTodos(projectManager, todo, subTodoList);

    todoMainSection.appendChild(subTodoList);

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";

    cancelButton.addEventListener("click", (e) => {
        e.preventDefault();
        todoPopUp.remove();
    })

    const addSubTodobutton = document.createElement("button");
    addSubTodobutton.id = "add-project";
    addSubTodobutton.textContent = "Add Sub-Todo";
    addSubTodobutton.addEventListener("click", () => addSubTodoForm(projectManager, todo, subTodoList));
    
    todoMainSection.appendChild(addSubTodobutton);

    todoMainSection.appendChild(cancelButton);
    todoPopUp.appendChild(todoMainSection)

    // create side section

    const todoSidebar = document.createElement("div");
    todoSidebar.id = "todo-sidebar";

    const projectTitle = document.createElement("div"); 
    projectTitle.textContent = project.name;

    const todoDueDate = document.createElement("div");
    todoDueDate.textContent = format(todo.dueDate, "MM-dd-yyyy");

    const todoPriority = document.createElement("div");
    todoPriority.textContent = todo.priority;

    todoSidebar.appendChild(projectTitle);
    todoSidebar.appendChild(todoDueDate);
    todoSidebar.appendChild(todoPriority);
    todoPopUp.appendChild(todoSidebar);

    document.body.appendChild(todoPopUp);
    
}

export function renderSubTodos(projectManager, todo, subTodoList) {

    subTodoList.replaceChildren();

    todo.list.forEach(subTodo => {
        const subTodoBlock = document.createElement("div");
        subTodoBlock.id = "sub-todo-block";

        const subTodoName = document.createElement("div");
        subTodoName.textContent = subTodo.name;

        const subTodoDueDate = document.createElement("div");
        subTodoDueDate.textContent = format(subTodo.dueDate, "MM-dd-yyyy");

        const subTodoPriority = document.createElement("div");
        subTodoPriority.textContent = subTodo.priority;

        const subTodoDescription = document.createElement("div");
        subTodoDescription.textContent = subTodo.description;

        subTodoBlock.appendChild(subTodoName);
        subTodoBlock.appendChild(subTodoDueDate);
        subTodoBlock.appendChild(subTodoPriority);
        subTodoBlock.appendChild(subTodoDescription);

        const removeSubTodoButton = document.createElement("button"); 
        removeSubTodoButton.id = "remove-sub-todo";
        removeSubTodoButton.textContent = "O";
        removeSubTodoButton.addEventListener("click", () => removeSubTodo(projectManager, todo, subTodo, subTodoList));
        subTodoBlock.appendChild(removeSubTodoButton);
        
        subTodoList.appendChild(subTodoBlock)
    });
}


function addSubTodoForm(projectManager, todo, subTodoList) {
    if (document.querySelector("#sub-todo-form")) return;

    const addSubTodoForm = document.createElement("form");
    addSubTodoForm.classList.add("todo-form");

    const addNameLabel = document.createElement("label");
    addNameLabel.htmlFor = "name";
    addNameLabel.textContent = "Sub-Todo Name:";
    const addName = document.createElement("input");
    addName.type = "text";
    addName.required = true;
    addName.id = "name";

    const addDueDateLabel = document.createElement("label");
    addDueDateLabel.htmlFor = "date";
    addDueDateLabel.textContent = "Due Date:";
    const addDueDate = document.createElement("input");
    addDueDate.type = "date";
    addDueDate.required = true;
    addDueDate.id = "date";

    const fieldsetPriority = document.createElement("fieldset");
    const priorityLegend = document.createElement("legend");
    priorityLegend.textContent = "Priority:";
    fieldsetPriority.appendChild(priorityLegend);

    [1, 2, 3, 4].forEach(priority => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "priority";
        input.value = priority;
        input.required = true;

        label.appendChild(input);
        label.append(` ${priority}`);
        fieldsetPriority.appendChild(label);
        fieldsetPriority.appendChild(document.createElement("br"));
    });

    const addDescriptionLabel = document.createElement("label");
    addDescriptionLabel.htmlFor = "description";
    addDescriptionLabel.textContent = "Todo Description:";
    const addDescription = document.createElement("input");
    addDescription.type = "text";
    addDescription.required = true;
    addDescription.id = "description";

    const submitForm = document.createElement("button");
    submitForm.type = "submit";
    submitForm.textContent = "Submit";

    addSubTodoForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const todoName = addName.value;
        const todoDueDate = parse(addDueDate.value, "yyyy-MM-dd", new Date());
        const todoPriority = Number(
            fieldsetPriority.querySelector("input[name='priority']:checked").value
        );
        const todoDescription = addDescription.value;

        const newSubTodo = new SubTodo(todoName, todoDueDate, todoPriority, todoDescription);
        todo.add(newSubTodo);
        save(projectManager);

        renderSubTodos(projectManager, todo, subTodoList);

        addSubTodoForm.remove();
    })

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";

    cancelButton.addEventListener("click", (e) => {
        e.preventDefault();
        addSubTodoForm.remove();
    })
    
    addSubTodoForm.appendChild(addNameLabel);
    addSubTodoForm.appendChild(addName);
    addSubTodoForm.appendChild(addDueDateLabel);
    addSubTodoForm.appendChild(addDueDate);
    addSubTodoForm.appendChild(fieldsetPriority);
    addSubTodoForm.appendChild(addDescriptionLabel);
    addSubTodoForm.appendChild(addDescription);
    addSubTodoForm.appendChild(submitForm);
    addSubTodoForm.appendChild(cancelButton);
    document.body.appendChild(addSubTodoForm);

}

function removeSubTodo(projectManager, todo, subTodo, subTodoListNode) {
    todo.remove(subTodo.name);
    save(projectManager);
    renderSubTodos(projectManager, todo, subTodoListNode);
}
