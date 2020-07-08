import { AxiosInstance } from 'axios';
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
export declare class Client {
    static readonly IMPORTADOR = "importador/importador.php";
    static readonly UPLOAD_FOTO_PRODUTO = "upload_foto_produto.php";
    static readonly EXPORTACAO_DADOS = "exportacao_dados.php";
    private static INSTANCE;
    api: AxiosInstance;
    getApi(): AxiosInstance;
    importacao(args: ImportacaoRequest): Promise<ImportacaoResponse>;
    exportacao(args: ExportacaoRequest): Promise<ExportacaoResponse>;
    loadFile(fileUrl: string): Promise<string>;
}
export {};
//# sourceMappingURL=Client.d.ts.map