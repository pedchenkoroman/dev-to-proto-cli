import { Command } from 'commander';
import { PromptRequiredArgumentsService } from './services/PromptRequiredArgumentsService';
import { DynamodbTableService } from './services/DynamodbTableService';
import { PromptTableSelectionService } from './services/PromptTableSelectionService';

export const cleanDb = new Command('clean-db');

cleanDb
  .description('Clean a DynamoDb table or all tables')
  .option('-p, --profile <profile>', 'Provide a profile name')
  .option('-pr, --provider <provider>', 'AWS credentials provider.')
  .option('-r, --region <region>', 'AWS region')
  .action(async (options) => {
    const promptRequiredArgumentsService = new PromptRequiredArgumentsService(options);
    const credentials = await promptRequiredArgumentsService.run();
    const client = DynamodbTableService.getClient(credentials);
    const dynamoDbTableService = new DynamodbTableService(client);
    const { TableNames = [] } = await dynamoDbTableService.listTables();
    const promptTableSelectionService = new PromptTableSelectionService(TableNames);
    const tables = await promptTableSelectionService.run();

    for (const table of tables) {
      await dynamoDbTableService.clean(table);
    }
  });
