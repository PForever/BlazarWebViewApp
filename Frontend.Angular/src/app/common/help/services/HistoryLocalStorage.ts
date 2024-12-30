import { Injectable } from "@angular/core";
import { EventMessageQueue } from "./EventMassageQueue";

@Injectable({providedIn: 'root'})
export class HistoryLocalStorage{

    private readonly key = EventMessageQueue.name;
    public clear(): void {
        localStorage.removeItem(this.key);
    }
    public push(message: string){
        const value = localStorage.getItem(this.key);
        const history : HistoryMessage[] = value != null ? JSON.parse(value) as HistoryMessage[] : [];
        if(history == null) throw new Error(`With key "${this.key}" in local storage found unexpected structure`);
        history.push({value: message, date: new Date(Date.now())})
        localStorage.setItem(this.key, JSON.stringify(history));
    }
    public get(){
        const value = localStorage.getItem(this.key);
        const history : HistoryMessage[] = value != null ? JSON.parse(value) as HistoryMessage[] : [];
        if(history == null) throw new Error(`With key "${this.key}" in local storage found unexpected structure`);
        return history;
    }
}
@Injectable({providedIn: 'any'})
export class LocalStorage{
    public clear(key: string): void {
        localStorage.removeItem(key);
    }
    public pushArray<T>(key: string, value: T){
        const values: T[] = this.getArrayPrivate<T>(key);
        values.push(value);
        localStorage.setItem(key, JSON.stringify(values));
    }
    private getArrayPrivate<T>(key: string) {
        const item = localStorage.getItem(key);
        const values: T[] = item != null ? JSON.parse(item) as T[] : [];
        if(values == null) throw new Error(`With key "${key}" in local storage found unexpected structure`);
        return values;
    }

    public updateArray<T>(key: string, transform: (values: T[]) => void){
        const values: T[] = this.getArrayPrivate<T>(key);
        transform(values);
        localStorage.setItem(key, JSON.stringify(values));
    }
    public getArray<T>(key: string){
        const values: T[] = this.getArrayPrivate<T>(key);
        return values;
    }
    public update<T>(key: string, value: T){
        localStorage.removeItem(key);
        localStorage.setItem(key, JSON.stringify(value));
    }
    public get<T>(key: string): T | undefined{
        const json = localStorage.getItem(key);
        const item = json != null? JSON.parse(json) as T : undefined;
        return item;
    }
    public getLast<T>(key: string): T | undefined{
        const json = localStorage.getItem(key);
        const items = json != null? JSON.parse(json) as T[] : [];
        return items[items.length - 1];
    }
}

export interface HistoryMessage{
    value: string;
    date: Date;
}


// @Injectable({providedIn: 'any'})
// export class StorageClient{

//     constructor(private localStorage : LocalStorage, key: string){}

//     get<T>(path: string) : Observable<T>{
        
//     }
//     put<T>(path: string) : Observable<T>{}
//     post<T>(path: string) : Observable<T>{}
//     delete<T>(path: string) : Observable<T>{}
// }