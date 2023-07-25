import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Octokit, RequestError } from 'octokit';

@Injectable()
export class RepositoriesService {
  constructor(
    @Inject('Octokit') private readonly octokit: Octokit,
    @Inject('RepositoriesName')
    private readonly repositoriesName: {
      [key: string]: string;
    },
  ) {}

  async findAll() {
    try {
      const limit = await this.octokit.rest.rateLimit.get();
      if (limit.data.resources.core.remaining === 0)
        throw new HttpException('Github API: Rate limit exceeded', 429);

      const repos = await Promise.all(
        Object.values(this.repositoriesName).map(async (repoName) => {
          const { data } = await this.octokit.rest.repos.get({
            owner: process.env.GITHUB_USERNAME,
            repo: repoName,
          });
          return {
            ...data,
            type: Object.keys(this.repositoriesName).find(
              (key) => this.repositoriesName[key] === repoName,
            ),
          };
        }),
      );

      return {
        data: repos,
        status: 200,
        message: 'Repositories fetched successfully',
      };
    } catch (error: unknown) {
      if (
        error instanceof NotFoundException ||
        (error instanceof HttpException && error.getStatus() === 429)
      ) {
        throw error;
      }

      if (error instanceof RequestError) {
        if (error.status === 404) {
          throw new NotFoundException('Repository not found');
        }
        if (error.status === 401) {
          throw new UnauthorizedException();
        }
      }
      Logger.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findOne(repositoryType: string) {
    try {
      if (!Object.keys(this.repositoriesName).includes(repositoryType))
        throw new NotFoundException('Repository not found');

      const limit = await this.octokit.rest.rateLimit.get();
      if (limit.data.resources.core.remaining === 0)
        throw new HttpException('Github API: Rate limit exceeded', 429);

      const response = await this.octokit.rest.repos.get({
        owner: process.env.GITHUB_USERNAME,
        repo: this.repositoriesName[repositoryType],
      });
      return {
        data: response.data,
        status: 200,
        message: 'Repository found',
      };
    } catch (error: unknown) {
      if (
        error instanceof NotFoundException ||
        (error instanceof HttpException && error.getStatus() === 429)
      ) {
        throw error;
      }

      if (error instanceof RequestError) {
        if (error.status === 404) {
          throw new NotFoundException('Repository not found');
        }
        if (error.status === 401) {
          throw new UnauthorizedException();
        }
      }
      Logger.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findCommits(repositoryType: string) {
    try {
      if (!Object.keys(this.repositoriesName).includes(repositoryType))
        throw new NotFoundException('Repository not found');

      const limit = await this.octokit.rest.rateLimit.get();
      if (limit.data.resources.core.remaining === 0)
        throw new HttpException('Github API: Rate limit exceeded', 429);

      const response = await this.octokit.rest.repos.listCommits({
        owner: process.env.GITHUB_USERNAME,
        repo: this.repositoriesName[repositoryType],
      });

      const commitsSorted = response.data.sort((a, b) => {
        return (
          new Date(a.commit.author.date).getTime() -
          new Date(b.commit.author.date).getTime()
        );
      });

      return {
        data: commitsSorted,
        status: 200,
        message: 'Commits fetched successfully',
      };
    } catch (error: unknown) {
      if (
        error instanceof NotFoundException ||
        (error instanceof HttpException && error.getStatus() === 429)
      ) {
        throw error;
      }

      if (error instanceof RequestError) {
        if (error.status === 404) {
          throw new NotFoundException('Repository not found');
        }
        if (error.status === 401) {
          throw new UnauthorizedException();
        }
      }
      Logger.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
