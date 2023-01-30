import { Subject } from 'rxjs';
 
const subject = new Subject();
 
const messageService = {
    sendMessage: message => subject.next(message),
    clearMessages: () => subject.next(),
    getMessage: () => subject.asObservable()
};

export default messageService
 