import * as store from './store.js';

const socket =io('/');

socket.on('connect', ()=>{
    console.log('successfully connected to socket.io server');
    store.setSocketId(socket.id);
});