import { FieldValue, Timestamp, WhereFilterOp, addDoc, collection, getDocs, query, where, orderBy, serverTimestamp, updateDoc, doc, or } from 'firebase/firestore'
import database from './config'

export type Condition = {
    fieldName: string,
    operator: WhereFilterOp,
    value: string
}

export const addDocument = async (collectionName: string, data: any) => {
    return await addDoc(collection(database, collectionName), { ...data, createdAt: serverTimestamp() })

}

export const getDocument = async (collectionName: string, condition?: Condition) => {
    if (condition && condition.value) {
        return await getDocs(query(collection(database, collectionName), where(condition.fieldName, condition.operator, condition.value), orderBy('createdAt', 'desc')))
    }
    return await getDocs(query(collection(database, collectionName), orderBy('createdAt', 'desc')))
}

export const getDocumentMutipleCondition = async (collectionName: string, condition1: Condition, condition2: Condition) => {
    return await getDocs(query(collection(database, collectionName),
        or(where(condition1.fieldName, condition1.operator, condition1.value),
            where(condition2.fieldName, condition2.operator, condition2.value)),
        orderBy('createdAt', 'desc')))
}

export const updateDocument = async (collectionName: string, docId: string, data: any) => {
    return await updateDoc(doc(database, collectionName, docId), { ...data })

}
