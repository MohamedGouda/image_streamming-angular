import { Component } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'image-streaming';

  baseURL:string= 'http://localhost:8090/images/'
  currentPhoto: string =""

  constructor(private socket: Socket) {
    this.connectToSocketAndChange()
    this.currentPhoto = "8.png"
  }


  changePhoto(data:string){
    this.currentPhoto = data
  }

  connectToSocketAndChange = () => {
    this.socket.on("file_changed", (data:any) => {
      this.changePhoto(data);
    });


    this.socket.emit("currentFile", (cb:any) => {
      this.changePhoto(cb);
    });
   
  }

}
