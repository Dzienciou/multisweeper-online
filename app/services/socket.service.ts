import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import {CanActivate} from '@angular/router/index';

import { Router } from '@angular/router';

@Injectable()
export class SocketService implements CanActivate {
    
    constructor(private router:Router){}
    private url = 'http://localhost:3000';
    // private url = 'https://multisweeper-online.herokuapp.com';
    private socket : any;
    private userName: string;

    canActivate(route ,state){
        if(state.url !== '/login' && !this.userName ){
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }

    connect(){
        if(!this.socket){
            this.socket = io(this.url);
            console.log('connected to WS | '+ this.url);
        }
    }

    login(username: string){
        if(!this.userName){
            this.socket.emit('login',username);
            this.userName = username;
            // console.log(`logged with username ${this.userName}`);
        }  
    }

    getLoginResponse() {
        let observable = new Observable(observer => {
            this.socket.on('login-response', (data) => {
                observer.next(data);
                console.log('getLoginResponse:');
                console.log(data);
                console.log("-----"); 
            });
        })     
        return observable;
    }

    getRoomUsersUpdated(){
       let observable = new Observable(observer => {
            this.socket.on('room-users-updated', data => {
                observer.next(data);
                console.log('getRoomUsersUpdated:');
                console.log(data);
                console.log("-----");
            });
        })
        return observable; 
    }

    createRoom(settings){
        console.log('joining created room');
        this.socket.emit('create',settings);
    }

    getRoomsUpdated(){
        let observable = new Observable(observer => {
            this.socket.on('rooms-updated', data => {
                observer.next(data);
                console.log('getRoomsUpdated:');
                console.log(data);
                console.log("-----");
            });
        })
        return observable; 
    }

    getCreateResponse(){
        let observable = new Observable(observer => {
            this.socket.on('create-response', data => {
                observer.next(data);
                console.log('getCreateResponse:');
                console.log(data);
                console.log("-----");
            });
        })
        return observable;
    }


    listRooms(){
        this.socket.emit('list-rooms');
    }

    getListRooms(){
       let observable = new Observable(observer => {
            this.socket.on('list-rooms-response', data => {
                observer.next(data);
                console.log('getListRooms:');
                console.log(data);
                console.log("-----");
            });
        })
        return observable; 
    }

    joinRoom(name:string){
        console.log('joining room');
        this.socket.emit('join',name);
    }

    getJoinResponse(){
        let observable = new Observable(observer => {
            this.socket.on('join-response', data => {
                observer.next(data);
                console.log('getJoinResponse:');
                console.log(data);
                console.log("-----");
            });
        })
        return observable;
    }

    leaveRoom(){
        console.log('leaving room');
        this.socket.emit('leave');
    }



}