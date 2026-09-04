import { format } from "date-fns";

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

    renderSubTodos(todo, subTodoList);

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

export function renderSubTodos(todo, subTodoList) {

    subTodoList.replaceChildren();

    todo.list.forEach(subTodo => {
        const subTodoButton = document.createElement("button");
        subTodoButton.classList.add("subTodo");
        subTodoButton.textContent = subTodo.name;

        subTodoButton.addEventListener("click", console.log("subTodo opens"));

        subTodoList.appendChild(subTodoButton);
    });
}

function addSubTodoForm(projectManager, todo, subTodoList) {
    if (document.querySelector("#sub-todo-form")) return;

    const addSubTodoForm = document.createElement("form");
    addSubTodoForm.id = "sub-todo-form";

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

        const newSubTodo = new subTodo(todoName, todoDueDate, todoPriority, todoDescription);
        todo.add(newSubTodo);
        save(projectManager);

        renderSubTodos(todo, subTodoList);

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