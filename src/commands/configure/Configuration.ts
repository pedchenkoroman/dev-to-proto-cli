import { parse, stringify } from 'yaml';
import { writeFile } from 'node:fs/promises';

export class Configuration {
  private static sourceMap = new Map([
    [
      'bitbucket',
      'https://bitbucket.org/!api/2.0/snippets/p7o/g78KX8/658d081497d9770ca4d1586b304631d5722bbbff/files/configuration.yaml',
    ],
    [
      'github',
      'https://gist.githubusercontent.com/pedchenkoroman/70fcdb6d1383a840d6d5dfb123cf68da/raw/aae6d1e437a1b6c3a0a956ead632118de0a1d2b3/configuration.yaml',
    ],
  ]);

  private static converter = new Map<string, any>([
    ['yml', stringify],
    [
      'env',
      (obj: any) => {
        let envFile = '';
        for (const key of Object.keys(obj)) {
          envFile += `${key}=${obj[key]}\n`;
        }
        return envFile;
      },
    ],
  ]);

  static async createConfigurationFile({
    source,
    service,
    extension,
  }: {
    source: string;
    service: string;
    extension: string;
  }): Promise<void> {
    const file = await Configuration.getFile(source);
    const config = Configuration.flatConfig(file, service);
    return Configuration.createFile(config, extension);
  }

  private static getFile(source: string): Promise<Record<string, any>> {
    return fetch(String(Configuration.sourceMap.get(source)))
      .then((res) => res.text())
      .then(parse);
  }

  private static flatConfig(config: Record<string, any>, serviceName: string) {
    return Object.keys(config).reduce((acc: Record<string, any>, currentValue: string) => {
      if (currentValue === serviceName && typeof config[currentValue] === 'object') {
        return Object.keys(config[currentValue]).reduce((accumulator, key) => {
          accumulator[key] = config[currentValue][key];

          return accumulator;
        }, acc);
      }

      if (typeof config[currentValue] !== 'object') {
        acc[currentValue] = config[currentValue];
      }

      return acc;
    }, {});
  }

  private static createFile(configuration: Record<string, any>, extension: string) {
    const content = Configuration.converter.get(extension)(configuration);
    const fileName = extension === 'env' ? '.env' : 'config.yml';
    return writeFile(fileName, content);
  }
}
