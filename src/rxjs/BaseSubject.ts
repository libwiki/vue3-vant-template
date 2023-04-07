import {Subject, Subscription} from "rxjs";

export type SubscribeObserverFunc<T = any> = (value: T) => void

export class BaseSubject<T = any> {
    protected _subject: Subject<T> = new Subject<T>();

    get subject() {
        return this._subject;
    }

    next(val: T) {
        this._subject.next(val)
    }

    subscribe(observerFunc: SubscribeObserverFunc<T>): Subscription {
        return this._subject.subscribe(observerFunc)
    }

}

