import { save, load } from "./localStorage";

export function createSidebar(projectManager) {
    const sidebar = document.createElement("div");
    sidebar.id = "sidebar";

    // renderTasksByTime Content

    const tasksSection = document.createElement("div");

    const todayButton = document.createElement("button");
    todayButton.textContent = "Today";

    todayButton.addEventListener("click", (e) => {
        console.log("Render main with today's tasks");
    })

    const weekButton = document.createElement("button");
    weekButton.textContent = "This Week";

    weekButton.addEventListener("click", (e) => {
        console.log("Render main with this weeks tasks");
    })

    tasksSection.appendChild(todayButton);
    tasksSection.appendChild(weekButton);
    
    sidebar.appendChild(tasksSection);

    // projectList content

    const projectSection = document.createElement("div");
    projectSection.id = "projectSection";

    const projectList = document.createElement("div");
    projectList.id = "sidebarProjectList";

    const projectSectionTitle = document.createElement("div");
    projectSectionTitle.id = "projectSectionTitle";
    projectSectionTitle.textContent = "My Projects";
    // populate Sidebar

    const addProjectbutton = document.createElement("button");
    addProjectbutton.id = "addProject";

    addProjectbutton.textContent = "Add Project";

    addProjectbutton.addEventListener("click", () => addProjectForm(projectManager, projectList));

    projectSection.appendChild(projectSectionTitle);
    projectSection.appendChild(projectList);
    projectSection.appendChild(addProjectbutton);


    sidebar.appendChild(projectSection);

    return sidebar;
}

export function populateSideBar(projectManager, pL) {

    console.log("populate sidebar");
}

function addProjectForm(projectManager, pL) {

    const addProjectForm = document.createElement("form");
    const addName = document.createElement("input");
    addName.type = "text";
    addName.required = true;
    addName.id = "name";
    const addNameLabel = document.createElement("label");
    addNameLabel.htmlFor = "name";
    addNameLabel.textContent = "Project Name:";
    const addDescription = document.createElement("input");
    addDescription.type = "text";
    addDescription.required = true;
    addDescription.id = "description";
    const addDescriptionLabel = document.createElement("label");
    addDescriptionLabel.htmlFor = "description";
    addDescriptionLabel.textContent = "Project Description:";    
    const submitForm = document.createElement("button");
    submitForm.type = "submit";
    submitForm.textContent = "Submit";

    addProjectForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const projectName = addName.value;
        const projectDescription = addDescription.value;

        const newProject = new Project(projectName, projectDescription);
        projectManager.addProject(newProject);
        save(projectManager);

        populateSideBar(projectManager, pL);

        addProjectForm.remove()
    })

    addProjectForm.appendChild(addNameLabel);
    addProjectForm.appendChild(addName);
    addProjectForm.appendChild(addDescriptionLabel);
    addProjectForm.appendChild(addDescription);
    addProjectForm.appendChild(submitForm);
    document.body.appendChild(addProjectForm);

}


