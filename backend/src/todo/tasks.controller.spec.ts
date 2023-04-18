import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';
import { TasksController } from './tasks.controller';

describe('TasksController', () => {
  let taskController: TasksController;

  const mockTaskService = {
    create: jest.fn((dto) => ({
      ...dto,
      id: '1',
      status: false,
      createdAt: '2022-08-25T12:00:00Z',
      updatedAt: '2022-08-25T12:00:00Z',
    })),
    findAll: jest.fn(() => [
      {
        id: '1',
        title: 'New Task',
        description: 'Description',
        dueDate: '2022-08-25T09:00',
        status: false,
        createdAt: '2022-08-22T03:25:40.740Z',
        updatedAt: '2022-08-22T03:25:40.740Z',
      },
    ]),
    findOne: jest.fn((id) => ({
      id,
      title: 'New Task',
      description: 'Description',
      dueDate: '2022-08-25T09:00',
      status: false,
      createdAt: '2022-08-22T03:25:40.740Z',
      updatedAt: '2022-08-22T03:25:40.740Z',
    })),
    update: jest.fn((id, dto) => ({
      ...dto,
      id,
      createdAt: '2022-08-22T03:25:40.740Z',
      updatedAt: '2022-08-22T03:25:40.740Z',
    })),
    remove: jest.fn((id) => {
      return id;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TaskService],
    })
      .overrideProvider(TaskService)
      .useValue(mockTaskService)
      .compile();

    taskController = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(taskController).toBeDefined();
  });

  it('should create task with success', () => {
    const data: CreateTaskDto = {
      title: 'New Task',
      description: 'Description',
      dueDate: '2022-08-25T09:00',
    };
    expect(taskController.create(data)).toEqual({
      ...data,
      id: expect.any(String),
      status: false,
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
    });
    expect(mockTaskService.create).toHaveBeenCalledWith(data);
  });

  it('should update task with success', () => {
    const data: UpdateTaskDto = {
      title: 'Updated Task',
      description: 'New Description',
      dueDate: '2022-08-25T09:00',
      status: true,
    };
    expect(taskController.update('1', data)).toEqual({
      ...data,
      id: '1',
      status: true,
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
    });
    expect(mockTaskService.update).toHaveBeenCalledWith('1', data);
  });

  it('should delete task with success', () => {
    taskController.remove('1');
    expect(mockTaskService.remove).toHaveBeenCalledWith('1');
  });

  it('should find one task with success', () => {
    expect(taskController.findOne('1')).toEqual({
      id: '1',
      title: 'New Task',
      description: 'Description',
      dueDate: '2022-08-25T09:00',
      status: false,
      createdAt: '2022-08-22T03:25:40.740Z',
      updatedAt: '2022-08-22T03:25:40.740Z',
    });

    expect(mockTaskService.findOne).toHaveBeenCalledWith('1');
  });

  it('should find all task with success', () => {
    expect(taskController.findAll()).toEqual([
      {
        id: '1',
        title: 'New Task',
        description: 'Description',
        dueDate: '2022-08-25T09:00',
        status: false,
        createdAt: '2022-08-22T03:25:40.740Z',
        updatedAt: '2022-08-22T03:25:40.740Z',
      },
    ]);

    expect(mockTaskService.findAll).toBeCalledTimes(1);
  });
});
