import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Defining Inline instead of Models import because ng will not bend to my will
export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const STORAGE_KEY = 'tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);

  tasks$ = this.tasksSubject.asObservable();

  get remainingCount(): number {
    return this.tasks.filter(task => !task.completed).length;
  }

  constructor() {
    this.loadFromStorage();
  }

  private saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
  }

  private loadFromStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      this.tasks = JSON.parse(data);
      this.tasksSubject.next([...this.tasks]);
    }
  }

  addTask(title: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false
    };
    this.tasks.push(newTask);
    this.update();
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.update();
  }

  toggleAll() {
    const allCompleted = this.tasks.every(task => task.completed);
    this.tasks = this.tasks.map(task => ({ ...task, completed: !allCompleted }));
    this.update();
  }

  toggleTask(id: number) {
    this.tasks = this.tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.update();
  }

  deleteCompleted() {
    this.tasks = this.tasks.filter(task => !task.completed);
    this.update();
  }

  clearAll() {
    this.tasks = [];
    this.update();
  }

  private update() {
    this.saveToStorage();
    this.tasksSubject.next([...this.tasks]);
  }
}
