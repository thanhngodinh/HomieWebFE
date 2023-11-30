import React from 'react'
import { Condition } from './service'
import { collection, onSnapshot, or, orderBy, query, where } from 'firebase/firestore'
import database from './config'

const useFirestore = (collectionName: string, condition1: Condition,condition2: Condition,fieldId='id') => {
	const [documents, setDocuments] = React.useState<any[]>([])

  React.useEffect(()=>{
		let collectionRef = collection(database, collectionName)
		console.log(11,condition1,condition2)
		let queryRef = query(collectionRef,
			or(where(condition1.fieldName, condition1.operator, condition1.value),
				where(condition2.fieldName, condition2.operator, condition2.value)),
				orderBy('createdAt', 'desc'))
		const unsubscribe = onSnapshot(queryRef,(snapshot)=>{
			const documents = snapshot.docs.map(doc => ({...doc.data(),[fieldId]: doc.id}))
			console.log(18,snapshot)
			setDocuments(documents)
		},(err)=> console.log('FireBase err', err))
		console.log(19,unsubscribe)

		return unsubscribe;
	},[collectionName, condition1,condition2])

  return documents
}

export default useFirestore