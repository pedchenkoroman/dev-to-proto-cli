import { Command } from 'commander';

import { ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { getDynamodbClient } from './get-dynamodb-client';

export const cleanDb = new Command('clean-db');

cleanDb
  .description('Clean a DynamoDb table or all tables')
  .option('-p, --profile <profile>', 'Provide a profile name')
  .option('-pr, --provider <provider>', 'AWS credentials provider.')
  .option('-r, --region <region>', 'AWS region')
  .option('-t, --tables <table>', 'The table name or all tables')
  .action(async (options) => {
    const client = getDynamodbClient(options);
    const result = await client.send(new ListTablesCommand());

    console.log(result);
  });
