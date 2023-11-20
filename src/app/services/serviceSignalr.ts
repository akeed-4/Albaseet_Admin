// import { Injectable } from '@angular/core';
// import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

// @Injectable({
//   providedIn: 'root'
// })
// export class SignalRService {
//     private baseUrl = "http://localhost:5000";
//   public hubConnection: HubConnection;

//   constructor() {

//     this.hubConnection = new HubConnectionBuilder()
//     .withUrl(this.baseUrl+'/ProceduresHub')
//     .build();
//   }

//   public async startConnection(): Promise<void> {
//     await this.hubConnection.start();
//   }

//   public async stopConnection(): Promise<void> {
//     await this.hubConnection.stop();
//   }

//   public onReceiveInvoiceData(callback: (invoices: any) => void): void {
//     this.hubConnection.on('receiveinvoiceData', callback);
//   }

//   public async sendInvoiceData(invoices: any): Promise<void> {
//     await this.hubConnection.invoke('sendInvoiceData', invoices);
//   }
// }
import { Attribute, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as SignalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { data } from 'jquery';

@Injectable({
    providedIn: 'root',
})
export class SignalRService {
    private readonly hubURL = `${environment.Admin}`;
    private hubConnection!: SignalR.HubConnection;
    connectionState = new BehaviorSubject<string>(
        this.hubConnection ? this.hubConnection.state : 'Not connected'
    );
    signalRMessageData = new BehaviorSubject<any>(null);
    signalRMessageDataCaller = new BehaviorSubject<any>(null);
    signalRMessageDataContinuos = new BehaviorSubject<any>(null);

    /** For load balancer settings */
    private srHubOptions: SignalR.IHttpConnectionOptions = {
        skipNegotiation: true,
        transport: SignalR.HttpTransportType.WebSockets,

    };
    data: any;

    constructor(private http: HttpClient) { }

    startRoutedSignalRConnection = (route: string) => {
        this.hubConnection = new SignalR.HubConnectionBuilder()
            .withUrl(`${this.hubURL}/${route}`, this.srHubOptions)
            .withAutomaticReconnect({
                nextRetryDelayInMilliseconds: (retryContext) => {
                    return retryContext.previousRetryCount <= 10
                        ? Math.random() * 10000
                        : null;
                },
            })
            .build();

        this.hubConnection
            .start()
            .then(() => {
                
                console.log(`Connection Start - ${this.hubURL}`);
                this.connectionState.next(this.hubConnection.state);
              
            })
            .catch((err) => {
                console.log(`Error while starting connection - ${err.error}`);

            });

        this.hubConnection.onclose(() =>
            this.connectionState.next(this.hubConnection.state)
        );
        console.log(this.hubConnection.state);

        this.hubConnection.onreconnected(() =>
            this.connectionState.next(this.hubConnection.state)
        );
        this.hubConnection.on("receiveinvoiceData", (data) => {
            
            console.log(data);
        })
    };

    subscriptionOnMethod = (method: string) => {
        this.hubConnection.invoke(method).then((data) => {
            this.signalRMessageData.next(data);
        });
    };

    sendDataToServer = (method: string, args?: any) => {
        this.hubConnection.invoke(method, args).then((res) => {
            this.signalRMessageDataCaller.next({ ...res });
        });
    };
    continuos=(method: string)=>{
        this.hubConnection.on(method, (data) => {
            this.signalRMessageDataContinuos.next(data.data);
        });


    };
    public askdata(){
        this.hubConnection.invoke('SendInvoiceData','key').catch(err=>console.log(err))
    }
    public received(method: string):void {
        
        this.hubConnection?.on(method, (data: any) => {
          const methodNameData = data ? `${data}` : '';
        alert(methodNameData)
         return methodNameData;
        });
      }
      public addTransferChartDataListener = () => {
        this.hubConnection.on('receiveinvoiceData', (data) => {
           
          this.data = data;
          console.log(data);
        });
        this.hubConnection.on('transferchartSignoutdata', (data) => {
          console.log(data);
        });
      }
      askServer(method:string, produat:any) {
        this.hubConnection.invoke('SendProductData',produat).catch(err=>console.log(err))
    }
    askServerListener=(method:string) =>{
        this.hubConnection.on(method, (someText) => {
            this.signalRMessageDataContinuos=someText
        })
        
    }
   
}