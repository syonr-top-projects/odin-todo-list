import { parse } from "date-fns";
import { save } from "./localStorage";
import Todo from "./todo";

export function renderProject(projectManager, project) {
    const todoSection = document.createElement("div");
    todoSection.id = "todoSection";

    const projectTitle = document.createElement("div");
    projectTitle.id = "projectTitle";
    projectTitle.textContent = project.name;

    const projectDescription = document.createElement("div");
    projectDescription.id = "projectDescription";
    projectDescription.textContent = project.description;

    todoSection.appendChild(projectTitle);
    todoSection.appendChild(projectDescription);

    const todoList = document.createElement("div");

    renderTodos(project, todoList);

    todoSection.appendChild(todoList);

    const addTodoButton = document.createElement("button");
    addTodoButton.id = "addTodo";
    addTodoButton.textContent = "Add Todo";
    addTodoButton.addEventListener("click", () => addTodoForm(projectManager, project, todoList));

    todoSection.appendChild(addTodoButton);

    return todoSection;
}

export function renderTodos(project, todoList) {

    todoList.replaceChildren();

    project.list.forEach(todo => {
        const todoButton = document.createElement("button");
        todoButton.classList.add("todo");
        todoButton.textContent = todo.name;

        todoList.appendChild(todoButton);
    });
}

function addTodoForm(projectManager, project, todoList) {
    const addTodoForm = document.createElement("form");

    const addNameLabel = document.createElement("label");
    addNameLabel.htmlFor = "name";
    addNameLabel.textContent = "Todo Name:";
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

        renderTodos(project, todoList);

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
    document.body.appendChild(addTodoForm);

}
