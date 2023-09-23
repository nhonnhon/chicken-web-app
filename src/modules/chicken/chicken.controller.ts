import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChickenService } from './chicken.service';
import { ChickenCreatePayloadDto } from './dtos/chicken-create-payload.dto';
import { AuthUser } from '@/common/decorators/auth-user.decorator';
import { UserEntity } from '../user/entities/user.entity';

@ApiTags('Chicken')
@Controller('chicken')
export class ChickenController {
  constructor(private readonly chickenService: ChickenService) {}

  @Post()
  @ApiOperation({
    summary: 'Add a chicken',
    description: 'Add a chicken',
  })
  @ApiOkResponse()
  async create(
    @AuthUser() user: UserEntity,
    @Body() body: ChickenCreatePayloadDto,
  ) {
    return this.chickenService.create(body, user.id);
  }
}
