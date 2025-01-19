/*
    Modules
    One way to organize JS code
    Modules are built first using basic statements like "import" and "export"
*/

// As a to-do list, its content needs to stay the same even if user closes the browser
// use localStorage
const STORAGE_KEY = 'tasks_list'

// Arrow functions is an ES6+ syntax, it allows devs to write functions shorter
export const getTask = () => {
    const tasks_list = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return tasks_list ? tasks_list : [];    
    // if "tasks_list" exists, keep it as is, else create an empty list as "tasks_list"
}

export const saveTask = (task) => {
    const tasks_list = getTask();
    tasks_list.push(task)
    localStorage.setItem('STORAGE_KEY', JSON.stringify(tasks_list))
}
