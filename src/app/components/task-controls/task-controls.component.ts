import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-controls',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './task-controls.component.html',
  styleUrl: './task-controls.component.css'
})
export class TaskControlsComponent {
  readonly taskService = inject(TaskService);
}