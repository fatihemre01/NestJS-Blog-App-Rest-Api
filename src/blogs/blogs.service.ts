import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/auth/schemas/user.schema';
import { BlogDto } from './dto/blog.dto';
import { Blog, BlogDocument } from './schemas/blog.schema';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
  ) {}

  async createBlog(dto: BlogDto, req: any) {
    const currentUser = await this.userModel.findOne({ email: req.user.email });
    const newBlog = new this.blogModel({
      title: dto.title,
      content: dto.content,
      sharedBy: currentUser.email,
      userId: currentUser._id,
    });
    return await newBlog.save();
  }

  async updateBlog(id: string, dto: BlogDto, req: any) {
    return await this.blogModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async removeBlog(id: string, req: any) {
    return await this.blogModel.findByIdAndRemove(id);
  }

  async getAllBlog() {
    return await this.blogModel.find();
  }

  async getCurrentUserBlogs(req: any) {
    const currentUser = await this.userModel.findOne({ email: req.user.email });
    return await this.blogModel.find({ userId: currentUser._id });
  }

  async getOneBlog(id: string) {
    return await this.blogModel.findById(id);
  }
}
