import path from 'path';
import { config as configDotenv } from 'dotenv';
import demander from '..';

configDotenv({
  path: path.resolve(__dirname, '../../.env.test'),
});

describe('testing DemanderClient', () => {
  const token = process.env.DEMANDER_TEST_TOKEN ?? '';

  it('testing method importacao', async () => {
    const client = new demander.Client();
    try {
      const result = await client.importacao({
        arquivo: path.join(__dirname, 'teste.txt'),
        token,
      });
      expect(result).not.toBeFalsy();
      console.dir(result);
    } catch (e) {
      console.error(e);
    }
  });

  it('testing method importacao force', async () => {
    const client = new demander.Client();
    try {
      const result = await client.importacao({
        arquivo: path.join(__dirname, 'teste.txt'),
        token,
        forcar_importacao: true,
        forcar_loaddata: true,
      });
      expect(result).not.toBeFalsy();
      console.dir(result);
    } catch (e) {
      console.error(e);
    }
  });

  it('testing method exportacao', async () => {
    const client = new demander.Client();
    try {
      const result = await client.exportacao({
        token,
        periodoInicial: '11/07/2020 00:00:00',
      });
      expect(result).not.toBeFalsy();
      console.dir(result);
    } catch (e) {
      console.error(e);
    }
  });
});
