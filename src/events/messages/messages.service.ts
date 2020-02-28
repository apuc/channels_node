import { HttpService, Injectable } from '@nestjs/common';
import {UserMessageRequest, UserMessageResponse} from './messages.interfaces';
import * as config from 'config';
import {map} from "rxjs/operators";
import {UserPush} from "../users/users.interfaces";
const webpush = require('web-push');

@Injectable()
export class MessagesService {

    private apiConfig = config.get('api');

    private pushConfig = config.get('push');

    constructor(private http: HttpService) {}

    saveMessageToDB(message: UserMessageRequest) {
        return this.http.post(`${this.apiConfig.url}/service/message`, message, {
            headers: {
                'Service-Auth-Name': 'node',
                'Service-Auth-Access-Token': '$2y$10$2Y2ODrOm6qx.bdyVUU5WFO8h.jb3gktWVoWH8m1LUV8rc6tYoEm0i',
            },
        });
    }

    sendPushNotifications(channel:Number,from:Number){
        this.http.post(`${this.apiConfig.url}/service/channel/${channel}/users-push`, {user_id:from}, {
            headers: {
                'Service-Auth-Name': 'node',
                'Service-Auth-Access-Token': '$2y$10$2Y2ODrOm6qx.bdyVUU5WFO8h.jb3gktWVoWH8m1LUV8rc6tYoEm0i',
            },
        }).pipe(map((res) => res.data.data))
          .subscribe((res:UserPush[]) => {
              if(res.length < 1) return

              webpush.setVapidDetails(
                  'mailto:example@yourdomain.org',
                   this.pushConfig.public_key,
                   this.pushConfig.private_key
              );

               for(let user of res){

                   if(user.id == from) continue

                   for(let endpoint of user.endpoints){
                       webpush.sendNotification(
                           endpoint,
                           JSON.stringify({text:'Новое сообщение!'})
                       ).then(res=>{
                           console.log('send norm')
                       }).catch(err=>{
                           console.log("Error",err)
                       })
                   }
               }

           },(err)=>{
              console.log(err)
          });
    }

}
