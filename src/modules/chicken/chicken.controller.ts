import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChickenService } from './chicken.service';
import { ChickenCreatePayloadDto } from './dtos/chicken-create-payload.dto';
import { AuthUser } from '@/common/decorators/auth-user.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { ChickenEntity } from './entities/chicken.entity';
import { ChickenUpdatePayloadDto } from './dtos/chicken-update-payload.dto';
import { GetChickenPaginationDto } from './dtos/chicken-get-query.dto';
import { Public } from '@/common/decorators/public-route.decorator';

@ApiTags('Chicken')
@Controller('chicken')
export class ChickenController {
  constructor(private readonly chickenService: ChickenService) {}

  @Post()
  @ApiOperation({
    summary: 'Add a chicken',
    description: 'Add a chicken',
  })
  @ApiOkResponse({
    type: ChickenEntity,
  })
  async create(
    @AuthUser() user: UserEntity,
    @Body() body: ChickenCreatePayloadDto,
  ) {
    return this.chickenService.create(body, user.id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a chicken',
    description: 'Update a chicken',
  })
  @ApiOkResponse()
  async update(
    @Param('id') id: number,
    @AuthUser() user: UserEntity,
    @Body() body: ChickenUpdatePayloadDto,
  ) {
    return this.chickenService.updateChicken(id, user.id, body);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a chicken',
    description: 'Delete a chicken',
  })
  @ApiOkResponse()
  async delete(@Param('id') id: number, @AuthUser() user: UserEntity) {
    return this.chickenService.deleteChicken(id, user.id);
  }

  @Get()
  @Public()
  @ApiOperation({
    summary: 'Get all chickens',
    description: 'Get all chickens',
  })
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query()
    queryDto: GetChickenPaginationDto,
  ) {
    return this.chickenService.findAll(queryDto);
  }

  @Get(':id')
  @Public()
  @ApiOperation({
    summary: 'Get a chicken',
    description: 'Get a chicken',
  })
  @HttpCode(HttpStatus.OK)
  async findAChicken(@Param('id') id: number) {
    return this.chickenService.findOneById(id);
  }
}
