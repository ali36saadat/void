import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from './tasks-status.enum';
import { TasksService } from './tasks.service';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { Tasks } from './tasks.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @ApiQuery({
    name: 'status',
    enum: TaskStatus,
    required: false,
  })
  @ApiQuery({
    name: 'search',
    type: String,
    required: false,
  })
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Tasks[]> {
    return this.tasksService.getTasks(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Tasks> {
    return this.tasksService.getTaskById(id);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'title' },
        description: { type: 'string', example: 'it is description' },
        status: {
          type: 'string',
          enum: Object.values(TaskStatus),
          example: TaskStatus.OPEN,
        },
      },
    },
  })
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Tasks> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: Object.values(TaskStatus),
          example: TaskStatus.OPEN,
        },
      },
    },
  })
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Tasks> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }
}
