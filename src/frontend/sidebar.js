import { save, load } from "../backend/localStorage";
import Project from "../backend/project";
import { renderProject } from "./main";

export function createSidebar(projectManager, mainContent) {
    const sidebar = document.createElement("div");
    sidebar.id = "sidebar";

    // projectList content

    const projectSection = document.createElement("div");
    projectSection.id = "project-section";

    const projectSectionTitle = document.createElement("div");
    projectSectionTitle.id = "project-section-title";
    projectSectionTitle.textContent = "My Projects";

    projectSection.appendChild(projectSectionTitle);

    const projectList = document.createElement("div");

    renderProjects(projectManager, projectList, mainContent);

    projectSection.appendChild(projectList);
    
    const addProjectbutton = document.createElement("button");
    addProjectbutton.id = "add-project";
    addProjectbutton.textContent = "Add Project";
    addProjectbutton.addEventListener("click", () => addProjectForm(projectManager, projectList, mainContent));
    
    projectSection.appendChild(addProjectbutton);
    
    sidebar.appendChild(projectSection);

    return sidebar;
}

export function renderProjects(projectManager, projectList, mainContent) {

    projectList.replaceChildren();
    mainContent.replaceChildren();

    projectManager.list.forEach(project => {
        const projectBlock = document.createElement("div");
        projectBlock.id = "project-block";

        const renderProjectButton = document.createElement("button");
        renderProjectButton.classList.add("project");
        renderProjectButton.textContent = project.name;
        renderProjectButton.addEventListener("click", () => {
            mainContent.replaceChildren(renderProject(projectManager, project));
        });
        projectBlock.appendChild(renderProjectButton);

        const removeProjectButton = document.createElement("button"); 
        removeProjectButton.id = "remove-project";
        removeProjectButton.textContent = "X";
        removeProjectButton.addEventListener("click", () => removeProject(projectManager, project, projectList, mainContent));
        projectBlock.appendChild(removeProjectButton);

        projectList.appendChild(projectBlock);
    });
}

function addProjectForm(projectManager, projectList, mainContent) {
    if (document.querySelector("#project-form")) return;
    const addProjectForm = document.createElement("form");
    addProjectForm.id = "project-form";
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
        projectManager.add(newProject);
        save(projectManager);

        renderProjects(projectManager, projectList, mainContent);

        addProjectForm.remove()
    })

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";

    cancelButton.addEventListener("click", (e) => {
        e.preventDefault();
        addProjectForm.remove();
    })

    addProjectForm.appendChild(addNameLabel);
    addProjectForm.appendChild(addName);
    addProjectForm.appendChild(addDescriptionLabel);
    addProjectForm.appendChild(addDescription);
    addProjectForm.appendChild(submitForm);
    addProjectForm.appendChild(cancelButton);    
    document.body.appendChild(addProjectForm);

}

function removeProject(projectManager, project, projectListNode, mainContent) {
    projectManager.remove(project.name);
    save(projectManager);

    // get top if not top just close all
    const projectList = projectManager.list;

    if (projectList.length !== 0) {
        mainContent.replaceChildren(
            renderProject(projectManager, projectList[0])
        );
    }

    renderProjects(projectManager, projectListNode, mainContent);
}

