import { format, parse } from "date-fns";
import { save } from "../backend/localStorage";
import Todo from "../backend/todo";
import { renderTodo } from "./todoPopup";

export function renderProject(projectManager, project, todoSection) {
    const projectTitle = document.createElement("div");
    projectTitle.id = "project-title";
    projectTitle.textContent = project.name;

    const projectDescription = document.createElement("div");
    projectDescription.id = "project-description";
    projectDescription.textContent = project.description;

    const todoList = document.createElement("div");
    todoList.id = "todo-list";

    renderTodos(projectManager, project, todoList);

    const addTodoButton = document.createElement("button");
    addTodoButton.id = "add-todo";
    addTodoButton.textContent = "Add Todo";
    addTodoButton.addEventListener("click", () => addTodoForm(projectManager, project, todoList));

    todoSection.replaceChildren(projectTitle, projectDescription, todoList, addTodoButton);
}

export function renderTodos(projectManager, project, todoList) {

    todoList.replaceChildren();

    project.list.forEach(todo => {
        const todoBlock = document.createElement("div");
        todoBlock.classList.add("todo-block");
        todoBlock.addEventListener("click", () => renderTodo(projectManager, project, todo));

        const todoInfo = document.createElement("div");
        todoInfo.classList.add("todo-info");

        const removeTodoButton = document.createElement("button"); 
        removeTodoButton.classList.add("remove-todo");
        removeTodoButton.textContent = "O";
        removeTodoButton.style.color = priorityColor(todo.priority);
        removeTodoButton.addEventListener("click", (e) => {
            e.stopPropagation();
            removeTodo(projectManager, project, todo, todoList);
        });
        todoInfo.appendChild(removeTodoButton);

        const todoName = document.createElement("div");
        todoName.classList.add("todo-name");
        todoName.textContent = todo.name;
        todoInfo.appendChild(todoName);

        todoBlock.appendChild(todoInfo);

        const todoDueDate = document.createElement("div");
        todoDueDate.classList.add("todo-due-date");
        todoDueDate.textContent = format(todo.dueDate, "MM-dd-yyyy");
        todoBlock.appendChild(todoDueDate);

        todoList.appendChild(todoBlock);
    });
}

export function priorityColor(priority) {
    switch (Number(priority)) {
        case 1: return "#ff0000"; 
        case 2: return "#e8da3e"; 
        case 3: return "blue"; 
        case 4: return "gray"; 
        default: return "#676663";
    }
}

export function addTodoForm(projectManager, project, todoList) {
    if (document.querySelector(".todo-form")) return;

    const addTodoForm = document.createElement("form");
    addTodoForm.classList.add("todo-form");

    const addNameLabel = document.createElement("label");
    addNameLabel.htmlFor = "name";
    addNameLabel.textContent = "Name ";
    const addName = document.createElement("input");
    addName.type = "text";
    addName.required = true;
    addName.id = "name";

    const addDueDateLabel = document.createElement("label");
    addDueDateLabel.htmlFor = "date";
    addDueDateLabel.textContent = "Due Date ";
    const addDueDate = document.createElement("input");
    addDueDate.type = "date";
    addDueDate.required = true;
    addDueDate.id = "date";

    const fieldsetPriority = document.createElement("fieldset");
    const priorityLegend = document.createElement("legend");
    priorityLegend.textContent = "Priority ";
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
    addDescriptionLabel.textContent = "Description ";
    const addDescription = document.createElement("input");
    addDescription.type = "text";
    addDescription.required = true;
    addDescription.id = "description";

    const submitForm = document.createElement("button");
    submitForm.type = "submit";
    submitForm.textContent = "Submit";

    addTodoForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const todoName = addName.value;
        const todoDueDate = parse(addDueDate.value, "yyyy-MM-dd", new Date());
        const todoPriority = Number(
            fieldsetPriority.querySelector("input[name='priority']:checked").value
        );
        const todoDescription = addDescription.value;

        const newTodo = new Todo(todoName, todoDueDate, todoPriority, todoDescription);
        project.add(newTodo);
        save(projectManager);

        renderTodos(projectManager, project, todoList);

        addTodoForm.remove();
    })

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";

    cancelButton.addEventListener("click", (e) => {
        e.preventDefault();
        addTodoForm.remove();
    })
    
    addTodoForm.appendChild(addNameLabel);
    addTodoForm.appendChild(addName);
    addTodoForm.appendChild(addDueDateLabel);
    addTodoForm.appendChild(addDueDate);
    addTodoForm.appendChild(fieldsetPriority);
    addTodoForm.appendChild(addDescriptionLabel);
    addTodoForm.appendChild(addDescription);
    addTodoForm.appendChild(submitForm);
    addTodoForm.appendChild(cancelButton);
    document.body.appendChild(addTodoForm);

}

function removeTodo(projectManager, project, todo, todoListNode) {
    project.remove(todo.name);
    save(projectManager);

    renderTodos(projectManager, project, todoListNode);
}
