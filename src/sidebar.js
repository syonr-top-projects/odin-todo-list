import ProjectManager from "./projectManager";
import * as components from "./logicComponents";

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

    populateSideBar(projectManager, projectList);

    projectSection.appendChild(projectSectionTitle);
    projectSection.appendChild(projectList);


    sidebar.appendChild(projectSection);

    return sidebar;
}

export function populateSideBar(projectManager, pL) {

    projectManager.projectList.toArray().forEach(project => {
        const projectButton = document.createElement("button");
        projectButton.classList.add("projectButton");
        projectButton.textContent = project.name;

        pL.appendChild(projectButton);

    });

    // ADD THE BUTTON THAT LOADS MAIN

    

}
