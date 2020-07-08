"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const form_data_1 = __importDefault(require("form-data"));
class Client {
    constructor() {
        this.api = axios_1.default.create({
            baseURL: 'http://envio.erp.ws.demanderweb.com.br/demander/producao/webservice/integracao/retta',
        });
    }
    getApi() {
        return Client.INSTANCE.api;
    }
    importacao(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const arquivo = path_1.default.resolve(process.cwd(), args.arquivo);
            const formData = new form_data_1.default();
            formData.append('arquivo', fs_1.default.createReadStream(args.arquivo), { knownLength: fs_1.default.statSync(arquivo).size });
            formData.append('token', args.token);
            if (args.forcar_importacao)
                formData.append('forcar_importacao', 'on');
            if (args.forcar_loaddata)
                formData.append('forcar_loaddata', 'on');
            const headers = Object.assign(Object.assign({}, formData.getHeaders()), { 'Content-Length': formData.getLengthSync() });
            const result = yield this.getApi().post(Client.IMPORTADOR, formData, { headers });
            const { data, status, statusText } = result;
            const message = data.trim();
            return { message, status, statusText };
        });
    }
    exportacao(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const formData = new form_data_1.default();
            formData.append('token', args.token);
            formData.append('periodoInicial', args.periodoInicial);
            const headers = Object.assign(Object.assign({}, formData.getHeaders()), { 'Content-Length': formData.getLengthSync() });
            const result = yield this.getApi().post(Client.EXPORTACAO_DADOS, formData, { headers });
            const { data, status, statusText } = result;
            const message = yield this.loadFile(data.trim());
            return { message, status, statusText };
        });
    }
    loadFile(fileUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield axios_1.default.get(fileUrl);
            return result.data;
        });
    }
}
exports.Client = Client;
Client.IMPORTADOR = 'importador/importador.php';
Client.UPLOAD_FOTO_PRODUTO = 'upload_foto_produto.php';
Client.EXPORTACAO_DADOS = 'exportacao_dados.php';
Client.INSTANCE = new Client();
