import { FieldValue, Timestamp, WhereFilterOp, addDoc, collection,getDocs,query, where, orderBy } from 'firebase/firestore'
import database  from './config'

export type Condition = {
    fieldName:string,
    operator: WhereFilterOp,
    value: string
}

export const addDocument = async (collectionName: string, data: any) => {
    return await addDoc(collection(database, collectionName), {...data, createdAt: Timestamp.now()})

}

export const  getDocument = async (collectionName: string, condition?: Condition) =>{
    if(condition && condition.value) {
        return await getDocs(query(collection(database, collectionName),where(condition.fieldName, condition.operator,condition.value),orderBy('createdAt')))
    }
    return await getDocs(query(collection(database, collectionName),orderBy('createdAt')))
}
