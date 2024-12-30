import { Injectable, Provider, inject } from "@angular/core";
import { SubscriptionManager } from "./SubscriptionManager";
import { Observable } from "rxjs";
import { EventMessageQueue } from "./EventMassageQueue";



@Injectable()
export class SubscriptionHandler {
    public constructor(
        private readonly subscriptionManager: SubscriptionManager,
    ){}
    private readonly eventMessageQueue = inject(EventMessageQueue);
    public subscribe<T>(observable: Observable<T>, handler?: ((value: T) => void) | undefined, onFinal?: (() => void) | undefined, retries = 3) {
        this.subscriptionManager.createSubscription(observable, handler, (e) => this.alertError(e), onFinal, retries);
    }

    private alertError(error: string | Error) {
        this.eventMessageQueue.pushError(error);
    }
    public destroy(): void {
        this.subscriptionManager.clearSubscriptions();
    }
}

export const SubscriptionHandlerProvider: Provider = {
    provide: SubscriptionHandler,
    useFactory: () => new SubscriptionHandler(new SubscriptionManager()),
    deps: [EventMessageQueue]
}
