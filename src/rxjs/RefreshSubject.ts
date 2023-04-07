import {BaseSubject} from "@/rxjs/BaseSubject";

class RefreshSubject extends BaseSubject<boolean> {
    next() {
        super.next(true);
    }

}

export const refreshSubInstance = new RefreshSubject()