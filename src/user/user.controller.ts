import { Controller,
          Get,
          Post,
          Body,
          Patch,
          Param,
          Delete ,
          Req ,
          UseGuards,
              } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id/:id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

    @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Req() req: any) {
    return req.user; // this comes from JwtStrategy.validate()
  }

}
