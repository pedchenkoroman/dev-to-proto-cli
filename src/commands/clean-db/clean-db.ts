import { Command } from 'commander';
import { PromptRequiredArgumentsService } from './services/PromptRequiredArgumentsService.js';
import { DynamodbTableService } from './services/DynamodbTableService.js';
import { PromptTableSelectionService } from './services/PromptTableSelectionService.js';
import { PromptedArgument } from './types/PromptedArgument.js';
import { PromptConfirmationService } from './services/PromptConfirmationService.js';

export const cleanDb = new Command('clean-db');

type Options = Partial<
  Record<PromptedArgument.Region | PromptedArgument.Profile | PromptedArgument.Provider, string>
> &
  Partial<Record<PromptedArgument.Force, boolean>>;

cleanDb
  .description('Clean a DynamoDb table or all tables')
  .option('-p, --profile <profile>', 'Provide a profile name')
  .option('-pr, --provider <provider>', 'AWS credentials provider.')
  .option('-r, --region <region>', 'AWS region')
  .option('-y, --yes [yes]', 'Automatically answer "yes" to the prompt of clean tables.', false)
  .action(async (options: Options) => {
    const promptRequiredArgumentsService = new PromptRequiredArgumentsService(options);
    const credentials = await promptRequiredArgumentsService.run();
    const client = DynamodbTableService.getClient(credentials);
    const dynamoDbTableService = new DynamodbTableService(client);
    const { TableNames = [] } = await dynamoDbTableService.listTables();
    const promptTableSelectionService = new PromptTableSelectionService(TableNames);
    const tables = await promptTableSelectionService.run();
    const confirmationService = new PromptConfirmationService(options, tables);
    const isClean = await confirmationService.run();

    if (isClean) {
      for (const table of tables) {
        await dynamoDbTableService.clean(table);
      }
    }
  });
