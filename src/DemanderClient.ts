import axios, { AxiosInstance } from 'axios';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';

interface ImportacaoRequest {
  arquivo: string;
  token: string;
  forcar_importacao?: boolean;
  forcar_loaddata?: boolean;
}

interface ImportacaoResponse {
  message: string;
  status: number;
  statusText: string;
}

interface ExportacaoRequest {
  token: string;
  periodoInicial?: string;
}

interface ExportacaoResponse {
  message: string;
  status: number;
  statusText: string;
}

export default class DemanderClient {
  public static readonly IMPORTADOR = 'importador/importador.php';

  public static readonly UPLOAD_FOTO_PRODUTO = 'upload_foto_produto.php';

  public static readonly EXPORTACAO_DADOS = 'exportacao_dados.php';

  private static INSTANCE = new DemanderClient();

  public api = axios.create({
    baseURL: 'http://envio.erp.ws.demanderweb.com.br/demander/producao/webservice/integracao/retta',
  });

  public getApi(): AxiosInstance {
    return DemanderClient.INSTANCE.api;
  }

  public async importacao(args: ImportacaoRequest): Promise<ImportacaoResponse> {
    const arquivo = path.resolve(process.cwd(), args.arquivo);

    const formData = new FormData();

    formData.append('arquivo', fs.createReadStream(args.arquivo), { knownLength: fs.statSync(arquivo).size });
    formData.append('token', args.token);

    if (args.forcar_importacao) formData.append('forcar_importacao', 'on');
    if (args.forcar_loaddata) formData.append('forcar_loaddata', 'on');

    const headers = {
      ...formData.getHeaders(),
      'Content-Length': formData.getLengthSync(),
    };

    const result = await this.getApi().post<string>(DemanderClient.IMPORTADOR, formData, { headers });
    const { data, status, statusText } = result;
    const message = data.trim();

    return { message, status, statusText };
  }

  public async exportacao(args: ExportacaoRequest): Promise<ExportacaoResponse> {
    const formData = new FormData();

    formData.append('token', args.token);
    formData.append('periodoInicial', args.periodoInicial);

    const headers = {
      ...formData.getHeaders(),
      'Content-Length': formData.getLengthSync(),
    };

    const result = await this.getApi().post<string>(DemanderClient.EXPORTACAO_DADOS, formData, { headers });
    const { data, status, statusText } = result;

    const message = await this.loadFile(data.trim());

    return { message, status, statusText };
  }

  public async loadFile(fileUrl: string): Promise<string> {
    const result = await axios.get<string>(fileUrl);
    return result.data;
  }
}
