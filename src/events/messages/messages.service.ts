import { HttpService, Injectable } from '@nestjs/common';
import { UserMessageRequest } from './messages.interfaces';
import * as config from 'config';

@Injectable()
export class MessagesService {

    private apiConfig = config.get('api');

    constructor(private http: HttpService) {}

    saveMessageToDB(message: UserMessageRequest) {
        return this.http.post(`${this.apiConfig.url}/service/message`, message, {
            headers: {
                'Service-Auth-Name': 'node',
                'Service-Auth-Access-Token': '$2y$10$2Y2ODrOm6qx.bdyVUU5WFO8h.jb3gktWVoWH8m1LUV8rc6tYoEm0i',
            },
        });
    }

}
