import { Module } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';
import { RepositoriesController } from './repositories.controller';
import { Octokit } from 'octokit';

@Module({
  controllers: [RepositoriesController],
  providers: [
    {
      provide: 'Octokit',
      useFactory: () =>
        new Octokit({
          auth: process.env.GITHUB_TOKEN,
        }),
    },
    {
      provide: 'RepositoriesName',
      useFactory: () => ({
        backend: process.env.BACKEND_REPO,
        frontend: process.env.FRONTEND_REPO,
      }),
    },
    RepositoriesService,
  ],
})
export class RepositoriesModule {}
