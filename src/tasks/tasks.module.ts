import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Tasks } from './tasks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks])],
  providers: [TasksRepository, TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
