import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly todoRepository: Repository<TaskEntity>,
  ) {}

  async create(data: CreateTaskDto): Promise<TaskEntity> {
    return this.todoRepository.save(this.todoRepository.create(data));
  }

  findAll(): Promise<TaskEntity[]> {
    return this.todoRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<TaskEntity> {
    const task = await this.todoRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Cannot find any task with id: ${id}`);
    }

    return task;
  }

  async update(id: string, data: UpdateTaskDto): Promise<TaskEntity> {
    await this.todoRepository.update(id, data);

    const updatedTodo = await this.todoRepository.findOne({ where: { id } });

    if (!updatedTodo) {
      throw new NotFoundException(`Cannot update task with id: ${id}`);
    }

    return updatedTodo;
  }

  async remove(id: string): Promise<void> {
    const deletedTodo = await this.todoRepository.delete(id);

    if (!deletedTodo.affected) {
      throw new NotFoundException(`Cannot delete task with id: ${id}`);
    }
  }
}
