import { fromSSO, fromIni } from '@aws-sdk/credential-providers';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export const getDynamodbClient = ({
  provider,
  profile,
  region,
}: {
  provider: 'sso' | 'ini';
  region: string;
  profile: string;
}) => {
  const providers = {
    sso: fromSSO,
    ini: fromIni,
  };

  return new DynamoDBClient({
    region,
    credentials: providers[provider]({ profile }),
  });
};
