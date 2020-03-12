import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ResponseMessage } from '../model/response-message';
import { Group } from '../model/group';
import { ManageRole } from '../model/manage-roles';
import { ResourceGroup } from '../model/resource-group';
import { Resource } from '../model/resource';
import { Role } from '../model/role';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AppMasterService {

baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
/**
 *
 * @param group
 */
addGroup(group): Observable<ResponseMessage> {
  return this.http.post<ResponseMessage>(this.baseUrl + '/group/add', JSON.stringify(group), this.httpOptions)
  .pipe(retry(1), catchError(this.errorHandl));
}
 // GET By ID
 GetGroup(id): Observable<Group> {
  return this.http.get<Group>(this.baseUrl + '/group/' + id)
    .pipe(retry(1), catchError(this.errorHandl));
}
// GET
GetAllGroup(): Observable<Group> {
  return this.http.get<Group>(this.baseUrl + '/group/list')
    .pipe(retry(1), catchError(this.errorHandl));
}
// PUT
UpdateGroup(id, data): Observable<ResponseMessage> {
  return this.http.put<ResponseMessage>(this.baseUrl + '/group/' + id + '/update', JSON.stringify(data), this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandl));
}
// DELETE
DeleteGroup(id) {
  return this.http.delete<ResponseMessage>(this.baseUrl + '/group/' + id + '/delete', this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandl));
}//group end


// POST
addManageRole(data): Observable<ResponseMessage> {
  return this.http.post<ResponseMessage>(this.baseUrl + '/restriction/add', JSON.stringify(data), this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandl));
}
// POST
addListManageRole(data): Observable<ResponseMessage> {
  return this.http.post<ResponseMessage>(this.baseUrl + '/restriction/add-all', JSON.stringify(data), this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandl));
}

// GET By ID
GetManageRole(id): Observable<ManageRole> {
  return this.http.get<ManageRole>(this.baseUrl + '/restriction/' + id)
    .pipe(retry(1), catchError(this.errorHandl));
}
// GET
GetAllManageRole(): Observable<ManageRole> {
  return this.http.get<ManageRole>(this.baseUrl + '/restriction/list')
    .pipe(retry(1), catchError(this.errorHandl));
}

// GET
GetAllManageRoleByRoleId(id): Observable<ManageRole> {
  return this.http.get<ManageRole>(this.baseUrl + '/restriction/' + id + '/role')
    .pipe(retry(1), catchError(this.errorHandl));
}

// PUT
UpdateManageRole(id, data): Observable<ResponseMessage> {
  return this.http.put<ResponseMessage>(this.baseUrl + '/restriction/' + id + '/update', JSON.stringify(data), this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandl));
}
// DELETE
DeleteManageRole(id) {
  return this.http.delete<ResponseMessage>(this.baseUrl + '/restriction/' + id + '/delete', this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandl));
}


// POST
addResourceGroup(data): Observable<ResponseMessage> {
  return this.http.post<ResponseMessage>(this.baseUrl + '/resource-group/add', JSON.stringify(data), this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandl));
}

// GET By ID
GetResourceGroup(id): Observable<ResourceGroup> {
  return this.http.get<ResourceGroup>(this.baseUrl + '/resource-group/' + id)
    .pipe(retry(1), catchError(this.errorHandl));
}
// GET
GetAllResourceGroup(): Observable<ResourceGroup> {
  return this.http.get<ResourceGroup>(this.baseUrl + '/resource-group/list')
    .pipe(retry(1), catchError(this.errorHandl));
}

// GET
GetParentsResourceGroup(): Observable<ResourceGroup> {
  return this.http.get<ResourceGroup>(this.baseUrl + '/resource-group/parents')
    .pipe(retry(1), catchError(this.errorHandl));
}

// GET
GetAllSubResourceGroupById(id): Observable<ResourceGroup> {
  return this.http.get<ResourceGroup>(this.baseUrl + '/resource-group/parents/' + id)
    .pipe(retry(1), catchError(this.errorHandl));
}

// PUT
UpdateResourceGroup(id, data): Observable<ResponseMessage> {
  return this.http.put<ResponseMessage>(this.baseUrl + '/resource-group/' + id + '/update', JSON.stringify(data), this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandl));
}
// DELETE
DeleteResourceGroup(id) {
  return this.http.delete<ResponseMessage>(this.baseUrl + '/resource-group/' + id + '/delete', this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandl));
}

// POST
addResource(data): Observable<ResponseMessage> {
  return this.http.post<ResponseMessage>(this.baseUrl + '/resource/add', JSON.stringify(data), this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandl));
}

// GET By ID
GetResource(id): Observable<Resource> {
  return this.http.get<Resource>(this.baseUrl + '/resource/' + id)
    .pipe(retry(1), catchError(this.errorHandl));
}
// GET
GetAllResource(): Observable<Resource> {
  return this.http.get<Resource>(this.baseUrl + '/resource/list')
    .pipe(retry(1), catchError(this.errorHandl));
}

// GET
GetParentsResource(): Observable<Resource> {
  return this.http.get<Resource>(this.baseUrl + '/resource/parents')
    .pipe(retry(1), catchError(this.errorHandl));
}

// GET
GetAllSubResourceById(id): Observable<Resource> {
  return this.http.get<Resource>(this.baseUrl + '/resource/parents/' + id)
    .pipe(retry(1), catchError(this.errorHandl));
}

// PUT
UpdateResource(id, data): Observable<ResponseMessage> {
  return this.http.put<ResponseMessage>(this.baseUrl + '/resource/' + id + '/update', JSON.stringify(data), this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandl));
}
// DELETE
DeleteResource(id) {
  return this.http.delete<ResponseMessage>(this.baseUrl + '/resource/' + id + '/delete', this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandl));
}

// POST
addRole(data): Observable<ResponseMessage> {
  return this.http.post<ResponseMessage>(this.baseUrl + '/role/add', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
}

addRole111(data): Observable<any> {
  return this.http.post<any>(this.baseUrl + '/role/add', JSON.stringify(data), this.httpOptions);
}


// GET By ID
GetRole(id): Observable<Role> {
  return this.http.get<Role>(this.baseUrl + '/role/' + id)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
}

// GET
GetAllRole(): Observable<Role> {
  return this.http.get<Role>(this.baseUrl + '/role/list')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
}

// PUT
UpdateRole(id, data): Observable<ResponseMessage> {
  return this.http.put<ResponseMessage>(this.baseUrl + '/role/' + id + '/update', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
}



// DELETE
DeleteRole(id) {
  return this.http.delete<ResponseMessage>(this.baseUrl + '/role/' + id + '/delete', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
}

// POST
CreateUser(data): Observable<ResponseMessage> {
  return this.http.post<ResponseMessage>(this.baseUrl + '/user/add', JSON.stringify(data), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  )
}

// GET By ID
GetUser(id): Observable<User> {
  return this.http.get<User>(this.baseUrl + '/user/' + id)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  )
}

// GET
GetAllUser(): Observable<User> {
  return this.http.get<User>(this.baseUrl + '/user/list')
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  )
}

// PUT
UpdateUser(id, data): Observable<ResponseMessage> {
  return this.http.put<ResponseMessage>(this.baseUrl +  '/user/' + id + '/update', JSON.stringify(data), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  )
}

// PUT
UpdateUserName(id: number, name: string) {
  return this.http.put<ResponseMessage>(this.baseUrl +  '/user/' + id + '/update', {'name' : name}, this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  )
}

// DELETE
DeleteUser(id){
  return this.http.delete<ResponseMessage>(this.baseUrl + '/user/' + id +  '/delete', this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  )
}


//
// Error handling
errorHandl(error) {
  console.log(error);
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}
}
