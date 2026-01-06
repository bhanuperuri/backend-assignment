import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // CREATE USER
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // GET ALL USERS
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // GET USER BY ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // UPDATE USER (PATCH)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: any,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  // DELETE USER
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  // GET LOGGED-IN USER (JWT)
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Req() req: any) {
    return req.user;
  }
}
