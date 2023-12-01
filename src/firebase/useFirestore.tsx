import React from 'react'
import { Condition, updateDocument } from './service'
import { collection, onSnapshot, or, orderBy, query, where } from 'firebase/firestore'
import database from './config'

const useFirestore = (collectionName: string, condition1: Condition,condition2: Condition,fieldId='id',roomId:string, userId?:string) => {
	const [documents, setDocuments] = React.useState<any[]>([])

  React.useEffect(()=>{
		let collectionRef = collection(database, collectionName)
		console.log(11,condition1,condition2)
		let queryRef = query(collectionRef,
			or(where(condition1.fieldName, condition1.operator, condition1.value),
				where(condition2.fieldName, condition2.operator, condition2.value)),
				orderBy('createdAt', 'desc'))
		const unsubscribe = onSnapshot(queryRef,async (snapshot)=>{
			const documents = snapshot.docs.map(doc => ({...doc.data(),[fieldId]: doc.id}))
			let keyUserSeen = ""
			console.log(18,snapshot)
			setDocuments(documents)
			if(documents.length> 0){
				const document = documents.find(doc => doc[fieldId] === roomId)
				if(document){
					if(document.keyUserId === userId){
						keyUserSeen = "userOneSeen"
					}else {
						keyUserSeen = "userTwoSeen"
					}
				}
			}
			if(roomId && keyUserSeen){
				try{
					await updateDocument("room_operations",roomId, {
						[keyUserSeen]: true
					})
				}catch(err){
					console.log(err)
				}
				
			}
		},(err)=> console.log('FireBase err', err))
		console.log(19,unsubscribe)

		return unsubscribe;
	},[collectionName, condition1,condition2])

  return documents
}

export default useFirestore