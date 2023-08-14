import { Injectable } from '@nestjs/common';
import { CreateDraftInput } from './dto/create-draft.input';
import { UpdateDraftInput } from './dto/update-draft.input';

@Injectable()
export class DraftService {
  create(createDraftInput: CreateDraftInput) {
    return 'This action adds a new draft';
  }

  findAll() {
    return `This action returns all draft`;
  }

  findOne(id: number) {
    return `This action returns a #${id} draft`;
  }

  update(id: number, updateDraftInput: UpdateDraftInput) {
    return `This action updates a #${id} draft`;
  }

  remove(id: number) {
    return `This action removes a #${id} draft`;
  }
}
