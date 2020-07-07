import path from 'path';
import { config as configDotenv } from 'dotenv';
import DemanderClient from '../DemanderClient';

configDotenv({
  path: path.resolve(__dirname, '../../.env.test'),
});

describe('testing DemanderClient', () => {
  const token = process.env.DEMANDER_TEST_TOKEN ?? '';
  it('testing method importacao', async () => {
    const demander = new DemanderClient();
    try {
      const result = await demander.importacao({
        arquivo: path.join(__dirname, 'teste.txt'),
        token,
        forcar_importacao: true,
      });
      expect(result).not.toBeFalsy();
      console.dir(result);
    } catch (e) {
      console.error(e);
    }
  });

  it('testing method exportacao', async () => {
    const demander = new DemanderClient();
    try {
      const result = await demander.exportacao({
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
