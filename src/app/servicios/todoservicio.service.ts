import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { environment } from 'src/environments/environment';
import { Observable, Subscription } from 'rxjs';
import { note } from '../modelo/note';

@Injectable({
  providedIn: 'root'
})
export class TodoservicioService {

  myCollection: AngularFirestoreCollection;
  constructor(private fireStore: AngularFirestore) {
    this.myCollection = fireStore.collection<any>(environment.collection);
  }
  readTODO(): Observable<firebase.firestore.QuerySnapshot> {
    return this.myCollection.get();
  }

  readTODO2(timer: number = 10000): Observable<note[]> {
    return new Observable((observer) => {
      let subscripcion: Subscription;
      let tempo = setTimeout(() => {
        subscripcion.unsubscribe();
        observer.error("Timeout");
      }, timer);
      subscripcion = this.readTODO().subscribe((lista) => {
        clearTimeout(tempo);
        let listado=[];
        lista.docs.forEach((nota)=>{
          listado.push({id:nota.id, ...nota.data()});
        });
        observer.next(listado);
        observer.complete();
      })
    });
  }

  readTODOById(id: string) {
    return this.myCollection.doc(id).get();
  }
  addTODO(mynote: note): Promise<firebase.firestore.DocumentReference> {
    return this.myCollection.add(mynote);
  }
  updateTodo(id: string, data: note): Promise<void> {
    return this.myCollection.doc(id).set(data);
  }
  remoteTODO(id: string): Promise<void> {
    return this.myCollection.doc(id).delete();
  }
  readTODOByCriteria() { }
}
