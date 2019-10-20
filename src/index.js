'use strict';

/**
 * @fileOverview index.js
 *
 * @author
 * @author waricoma
 * @version 1.0.0
 */

require('dotenv').config();
const packageJson = require('../package.json');
const http = require('http');
const ArrayToGoogleSheets = require('array-to-google-sheets');
const socketIo = require('socket.io');
const validationsErr = require('../src/lib/validations-err');

const server = http.createServer((req, res) => {
  res.writeHead(
    200,
    {
      'Content-Type': 'text/html'
    }
  );
  res.write(packageJson.name);
  res.end();
}).listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server running at http://${process.env.HOST}:${process.env.PORT}`);
});

const io = socketIo(server);

let doingTask = false;

/**
 * google cred
 * @type {{client_email: string, private_key: string}}
 */
const CRED = {
  client_email: process.env.G_CLIENT_EMAIL,
  private_key: process.env.G_PRIVATE_KEY.replace(/\\n/g, '\n')
};

io.on('connection', (socket) => {
  io.to(socket.id).emit('executionPropriety', !doingTask);

  socket.on('task', (msg) => {
    const validationsErrResult = validationsErr(msg, process.env.TOKEN);

    if (validationsErrResult) {
      io.to(socket.id).emit('err', validationsErrResult);
      return;
    }

    (async () => {
      let arrToGSheets = new ArrayToGoogleSheets(msg.docKey, CRED);

      try {
        await arrToGSheets.updateGoogleSheets(msg.sheetName, msg.task, msg.option);
      } catch (err) {
        io.to(socket.id).emit('err', JSON.stringify(err));
      }

      // garbage collection
      msg = null;
      arrToGSheets = null;

      doingTask = false;

      // send finish notification and send task doing status to other client
      for (const clientId in io.sockets.connected) {
        if (socket.id === clientId) {
          io.to(socket.id).emit('finish');
          continue;
        }

        io.to(clientId).emit('executionPropriety', !doingTask);

        break;
      }
    })();
  });
});
