import { Logger, Module } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';
import { RepositoriesController } from './repositories.controller';
import { Octokit } from 'octokit';
import { retry } from 'rxjs';

@Module({
  controllers: [RepositoriesController],
  providers: [
    {
      provide: 'Octokit',
      useFactory: () => {
        if (!process.env.GITHUB_TOKEN) {
          Logger.log('No token found, using unauthenticated requests');
          return new Octokit();
        }
        return new Octokit({
          auth: process.env.GITHUB_TOKEN,
        });
      },
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
