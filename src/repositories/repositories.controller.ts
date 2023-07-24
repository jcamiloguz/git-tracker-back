import { Controller, Get, Param } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';

@Controller('repositories')
export class RepositoriesController {
  constructor(private readonly repositoriesService: RepositoriesService) {}

  @Get()
  findAll() {
    return this.repositoriesService.findAll();
  }

  @Get(':repositoryType')
  findOne(@Param('repositoryType') repositoryType: string) {
    return this.repositoriesService.findOne(repositoryType);
  }
  @Get(':repositoryType/commits')
  findCommits(@Param('repositoryType') repositoryType: string) {
    return this.repositoriesService.findCommits(repositoryType);
  }
}
