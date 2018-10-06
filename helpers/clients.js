let {io, connectedUsers} = require('../app');

// Функция возвращает массив socketId пользователелей, находящихся в канале
async function getClientsIdInChannel(channelId) {
    let clientsArr = [];
    await io.in(channelId).clients((err, clients) => {
        if (err) throw new Error(err.message);
        clientsArr = clients;
    });
    return clientsArr
}

// Функция возвращает промис, который при успехе вернет массив юзеров, находящихся в канале
module.exports.getClientsInChannel = async (channelId) => {
    const clientsIds = await getClientsIdInChannel(channelId);
    let clients = [];

    for (let i = 0; i < clientsIds.length; i++) {
        console.log(`connectedUsers[clientsIds[${i}]] `, connectedUsers[clientsIds[i]]);
        clients.push(connectedUsers[clientsIds[i]]);
    }
    return new Promise((resolve, reject) => {
        resolve(clients);
        reject(new Error('Время ожидания превышено!'));
    });
};

