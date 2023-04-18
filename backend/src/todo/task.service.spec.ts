import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './task.entity';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let taskService: TaskService;

  const mockTaskRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((data) =>
      Promise.resolve({
        ...data,
        id: '1',
        status: false,
        createdAt: '2022-08-25T12:00:00Z',
        updatedAt: '2022-08-25T12:00:00Z',
      }),
    ),
    find: jest.fn().mockImplementation(() =>
      Promise.resolve([
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
    ),
    findOne: jest.fn().mockImplementation(({ where: { id } }) =>
      Promise.resolve({
        id,
        title: 'New Task',
        description: 'Description',
        dueDate: '2022-08-25T09:00',
        status: true,
        createdAt: '2022-08-22T03:25:40.740Z',
        updatedAt: '2022-08-22T03:25:40.740Z',
      }),
    ),
    update: jest.fn().mockImplementation((id, data) =>
      Promise.resolve({
        ...data,
        id,
        createdAt: '2022-08-22T03:25:40.740Z',
        updatedAt: '2022-08-22T03:25:40.740Z',
      }),
    ),
    delete: jest.fn().mockImplementation((id) =>
      Promise.resolve({
        id,
        affected: true,
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(TaskEntity),
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(taskService).toBeDefined();
  });

  it('should create a task record and return that', async () => {
    const data: CreateTaskDto = {
      title: 'New Task',
      description: 'Description',
      dueDate: '2022-08-25T09:00',
    };
    expect(await taskService.create(data)).toEqual({
      ...data,
      id: expect.any(String),
      status: false,
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
    });
  });

  it('should update a task record and return that', async () => {
    const data: UpdateTaskDto = {
      title: 'New Task',
      description: 'Description',
      dueDate: '2022-08-25T09:00',
      status: true,
    };
    expect(await taskService.update('1', data)).toEqual({
      ...data,
      id: '1',
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
    });
  });

  it('should delete task with success', async () => {
    await taskService.remove('1');
    expect(await mockTaskRepository.delete).toBeCalledTimes(1);
  });

  it('should find one task with success', async () => {
    expect(await taskService.findOne('1')).toEqual({
      id: '1',
      title: 'New Task',
      description: 'Description',
      dueDate: '2022-08-25T09:00',
      status: true,
      createdAt: '2022-08-22T03:25:40.740Z',
      updatedAt: '2022-08-22T03:25:40.740Z',
    });

    expect(await mockTaskRepository.findOne).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });

  it('should find all task with success', async () => {
    expect(await taskService.findAll()).toEqual([
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

    expect(await mockTaskRepository.find).toBeCalledTimes(1);
  });
});
