import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BlogsService } from './blogs.service';
import { BlogDto } from './dto/blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private blogService: BlogsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createBlog(@Body() dto: BlogDto, @Request() req: any) {
    return this.blogService.createBlog(dto, req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  updateBlog(
    @Param('id') id: string,
    @Body() dto: BlogDto,
    @Request() req: any,
  ) {
    return this.blogService.updateBlog(id, dto, req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  removeBlog(@Body() dto: BlogDto, @Param('id') id: string) {
    return this.blogService.removeBlog(dto, id);
  }

  @Get()
  getAllBlogs() {
    return this.blogService.getAllBlog();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my-blogs')
  getCurrentUserBlogs(@Request() req: any) {
    return this.blogService.getCurrentUserBlogs(req);
  }

  @Get(':id')
  getOneBlog(@Param('id') id: string) {
    return this.blogService.getOneBlog(id);
  }
}
