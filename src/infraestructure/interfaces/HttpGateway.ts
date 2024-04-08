import { QaasAPI } from "../http/qaas.service";

export interface HttpGateway {
  getQaasAPI(): QaasAPI;
}
