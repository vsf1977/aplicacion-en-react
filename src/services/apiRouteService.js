import { Subject } from 'rxjs';
 
const subject = new Subject();
 
const apiRouteService = {
    sendRoute: route => subject.next(route),
    getRoute: () => subject.asObservable()
};

export default apiRouteService
 