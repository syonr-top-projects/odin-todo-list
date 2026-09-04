import { parse, format } from "date-fns";

export function add(obj) {
    this.list.push(obj);
} 

export function remove(objName) {
    this.list = this.list.filter( (obj) => obj.name !== objName );
}

export function editDueDate(dateStr) {
    this.dueDate = parse(dateStr, "PP", new Date());
}