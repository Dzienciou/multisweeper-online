import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from '../../services/socket.service';

@Component({
//   moduleId: module.id,
  selector: 'chat',
  templateUrl: 'components/chat/chat.component.html',
  styles : [`
    #messages { list-style-type: none; margin: 0; padding: 0; }
    #messages li { padding: 5px 10px; } 
    #messages li:nth-child(odd) { background: lightgray; }`]
})
export class ChatComponent implements OnInit { 
  messages = [{text: 'wiadomosc1'},{text: 'wiadomosc2'},{text: 'wiadomosc3'}];
  connection;
  message;


  constructor(private socketService : SocketService) { }

  ngOnInit(){
    this.getMessages();
  }
    getMessages(){
        this.socketService.getMessages().subscribe(message=>{
            this.messages.push(message);
        })
    }

    sendMessage(){
        this.socketService.sendMessage(this.message);
        this.message="";
    }
}
