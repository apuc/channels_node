import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { UserMessageRequest } from './messages.interfaces';

@Injectable()
export class MessagesService {

    private readonly url: string;

    constructor(private http: HttpService, private readonly config: ConfigService) {
        this.url = config.get('API_URL');
    }

    saveMessageToDB(message: UserMessageRequest) {
        return this.http.post(`${this.url}/service/message`, message, {
            headers: {
                'Service-Auth-Name': 'node',
                'Service-Auth-Access-Token': '$2y$10$2Y2ODrOm6qx.bdyVUU5WFO8h.jb3gktWVoWH8m1LUV8rc6tYoEm0i',
            },
        });
    }

}
