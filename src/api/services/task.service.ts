import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../module/task.entity';
import { CreateTaskDto } from '../../module/task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
    const task = this.taskRepository.create({ ...createTaskDto, user: { id: userId } });
    return await this.taskRepository.save(task);
  }

  async getUserTasks(userId: number): Promise<Task[]> {
    return await this.taskRepository.find({ where: { user: { id: userId } } });
  }

  async getTaskById(taskId: number, userId: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id: taskId, user: { id: userId } } });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async updateTask(taskId: number, userId: number, updateData: Partial<Task>): Promise<Task> {
    const task = await this.getTaskById(taskId, userId);
    Object.assign(task, updateData);
    return await this.taskRepository.save(task);
  }

  async deleteTask(taskId: number, userId: number): Promise<void> {
    const task = await this.getTaskById(taskId, userId);
    await this.taskRepository.remove(task);
  }
}
