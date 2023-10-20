import { ChickenUpdatePayloadDto } from '../dtos/chicken-update-payload.dto';
import { ChickenEntity } from '../entities/chicken.entity';

export const auditLogConvert = (
  originData: ChickenEntity,
  dataUpdate: ChickenUpdatePayloadDto,
) => {
  const oldObject: Record<string, unknown> = {};
  const newObject: Record<string, unknown> = {};

  if (dataUpdate.name && originData.name !== dataUpdate.name) {
    oldObject.name = originData.name;
    newObject.name = dataUpdate.name;
  }

  if (
    dataUpdate.description &&
    originData.description !== dataUpdate.description
  ) {
    oldObject.description = originData.description;
    newObject.description = dataUpdate.description;
  }

  if (dataUpdate.price && originData.price !== dataUpdate.price) {
    oldObject.price = originData.price;
    newObject.price = dataUpdate.price;
  }

  if (dataUpdate.ytb_link && originData.ytb_link !== dataUpdate.ytb_link) {
    oldObject.ytb_link = originData.ytb_link;
    newObject.ytb_link = dataUpdate.ytb_link;
  }

  if (
    dataUpdate.tiktok_link &&
    originData.tiktok_link !== dataUpdate.tiktok_link
  ) {
    oldObject.tiktok_link = originData.tiktok_link;
    newObject.tiktok_link = dataUpdate.tiktok_link;
  }

  if (dataUpdate.status && originData.status !== dataUpdate.status) {
    oldObject.status = originData.status;
    newObject.status = dataUpdate.status;
  }

  return {
    oldObject,
    newObject,
  };
};
