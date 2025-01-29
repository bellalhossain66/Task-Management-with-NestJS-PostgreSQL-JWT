import {
 Controller,
 Post,
 Body,
 UseGuards,
 Req,
 Get,
 Param,
 Patch,
 Delete,
 HttpException,
 HttpStatus,
 Query
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt.guard';
import { TasksService } from '../services/task.service';
import { Task, TaskStatus } from '../../module/task.entity';
import { CreateTaskDto } from '../../module/task.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
 constructor(private readonly tasksService: TasksService) {}

 @Post()
 async createTask(@Body() createTaskDto: CreateTaskDto, @Req() req: any): Promise<Task> {
   try{
    const userId = req.user.id;
    return await this.tasksService.createTask(createTaskDto, userId);
   } catch (error) {
     throw new HttpException(
       { message: 'Task failed to create', error: error },
       HttpStatus.BAD_REQUEST
     )
   }
 }

 @Get()
 async getUserTasks(@Req() req: any): Promise<Task[]> {
   const userId = req.user.id;
   return await this.tasksService.getUserTasks(userId);
 }

 @Get(':id')
 async getTaskById(@Param('id') id: number, @Req() req: any): Promise<Task> {
   const userId = req.user.id;
   return await this.tasksService.getTaskById(id, userId);
 }

 @Patch(':id')
 async updateTask(
   @Param('id') id: number,
   @Body() updateData: Partial<Task>,
   @Req() req: any,
 ): Promise<Task> {
   const userId = req.user.id;
   return await this.tasksService.updateTask(id, userId, updateData);
 }

 @Delete(':id')
 async deleteTask(@Param('id') id: number, @Req() req: any): Promise<void> {
   const userId = req.user.id;
   return await this.tasksService.deleteTask(id, userId);
 }

 @Get('get-all-tasks')
 async getUserTasksByFilter(
    @Req() req: any,
    @Query('status') status?: TaskStatus,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const userId = req.user.id;
    return await this.tasksService.getUserTasksByFilter(userId, status, page, limit);
 }
}
