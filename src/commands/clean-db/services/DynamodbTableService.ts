import {
  BatchWriteItemCommand,
  DescribeTableCommand,
  DynamoDBClient,
  ListTablesCommand,
  ListTablesCommandOutput,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';
import { fromIni, fromSSO } from '@aws-sdk/credential-providers';
import type { RequiredOptions } from '../types/RequiredOptions';

export class DynamodbTableService {
  static getClient({ region, profile, provider }: RequiredOptions): DynamoDBClient {
    const providers: Record<string, any> = {
      sso: fromSSO,
      ini: fromIni,
    };

    return new DynamoDBClient({
      region,
      credentials: providers[provider]({ profile }),
    });
  }

  constructor(private client: DynamoDBClient) {}

  async listTables(): Promise<ListTablesCommandOutput> {
    return this.client.send(new ListTablesCommand());
  }
  async clean(table: string): Promise<void> {
    const keys = await this.getKeys(table);

    let records: Record<string, any>[];
    do {
      records = await this.getIds(table, keys);
      if (records.length > 0) {
        await this.delete(table, records);
        // eslint-disable-next-line no-console
        console.log(`Delete ${records.length} records in ${table} table`);
      }
    } while (records.length > 0);
  }

  private async getKeys(table: string): Promise<string[]> {
    const command = new DescribeTableCommand({
      TableName: table,
    });
    const { Table } = await this.client.send(command);

    return Table?.KeySchema?.map((key) => String(key.AttributeName)) || [];
  }

  private async getIds(table: string, keys: string[]): Promise<Record<string, any>[]> {
    const command = new ScanCommand({
      TableName: table,
      AttributesToGet: keys,
      Limit: 25,
    });

    const { Items = [] } = await this.client.send(command);
    return Items;
  }

  private async delete(table: string, records: Record<string, any>[]) {
    const request = {
      RequestItems: {
        [table]: records.map((item) => {
          return {
            DeleteRequest: { Key: item },
          };
        }),
      },
    };
    await this.client.send(new BatchWriteItemCommand(request));
  }
}
