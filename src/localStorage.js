const KEY = "projects";

export function load() {
    const projects = localStorage.getItem(KEY);
    return JSON.parse(projects);
}

export function save(projectManager) {
    localStorage.setItem(KEY, JSON.stringify(projectManager));
}


