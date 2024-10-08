import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { AuthJwtGuard } from '../auth/auth-jwt.guard'
import { Permissions } from '../auth/permission-guard/permissions.decorator'
import { PermissionsGuard } from '../auth/permission-guard/permissions.guard'
import { Permission } from 'src/common/enums/permissions.enum'
const { USER_CREATE, USER_VIEW, USER_UPDATE, USER_DELETE } = Permission

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	@UseGuards(AuthJwtGuard, PermissionsGuard)
	@Permissions(USER_CREATE)
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto)
	}

	@Get()
	@UseGuards(AuthJwtGuard, PermissionsGuard)
	@Permissions(USER_VIEW)
	findAll() {
		return this.userService.findAll()
	}

	@Get(':id')
	@UseGuards(AuthJwtGuard, PermissionsGuard)
	@Permissions(USER_VIEW)
	findOne(@Param('id') id: string) {
		return this.userService.findOne(id)
	}

	@Patch(':id')
	@UseGuards(AuthJwtGuard, PermissionsGuard)
	@Permissions(USER_UPDATE)
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(id, updateUserDto)
	}

	@Delete(':id')
	@UseGuards(AuthJwtGuard, PermissionsGuard)
	@Permissions(USER_DELETE)
	async remove(@Param('id') id: string) {
		const user = await this.userService.findOne(id)
		return this.userService.remove(id, user.authId)
	}
}
