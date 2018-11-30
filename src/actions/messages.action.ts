import { AppSocketActionModel } from "../models/socketAction.model";

export class AppMessagesAction extends AppSocketActionModel {

  bootstrap() {
    this.socket.on('typing', ({user, channelId}) => {
      this.io.to(channelId).emit('typing', user);
    });

    this.socket.on('userMessage', messageData => {
      const {channel_id, text, from, user_id} = messageData;

      this.request.post({
        url: `${process.env.API_URL}/service/message`,
        headers: {
          'Service-Auth-Name': 'node',
          'Service-Auth-Access-Token': '$2y$10$2Y2ODrOm6qx.bdyVUU5WFO8h.jb3gktWVoWH8m1LUV8rc6tYoEm0i'
        },
        form: {channel_id, from, text, user_id}
      }, (err: any, res: any, body: any) => {
        // console.log('err', err)
        this.io.to(channel_id).emit('userMessage', JSON.parse(body).data);
      });
    });
  }

}