import {
  FieldValue,
  Timestamp,
  WhereFilterOp,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  updateDoc,
  doc,
  or,
  and,
  setDoc,
} from 'firebase/firestore';
import database from './config';
import { User } from '../models';

export type Condition = {
  fieldName: string;
  operator: WhereFilterOp;
  value: string;
};

export const addDocument = async (collectionName: string, data: any) => {
  return await addDoc(collection(database, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
  });
};

export const addNewDoc = async (
  collectionName: string,
  documentId: string,
  data: any
) => {
  await setDoc(doc(database, collectionName, documentId), {
    ...data,
    createdAt: serverTimestamp(),
  });
};

export const getDocument = async (
  collectionName: string,
  condition?: Condition
) => {
  if (condition && condition.value) {
    return await getDocs(
      query(
        collection(database, collectionName),
        where(condition.fieldName, condition.operator, condition.value),
        orderBy('createdAt', 'desc')
      )
    );
  }
  return await getDocs(
    query(collection(database, collectionName), orderBy('createdAt', 'desc'))
  );
};

export const getDocumentMutipleCondition = async (
  collectionName: string,
  condition1: Condition,
  condition2: Condition
) => {
  return await getDocs(
    query(
      collection(database, collectionName),
      or(
        where(condition1.fieldName, condition1.operator, condition1.value),
        where(condition2.fieldName, condition2.operator, condition2.value)
      ),
      orderBy('createdAt', 'desc')
    )
  );
};

export const updateDocument = async (
  collectionName: string,
  docId: string,
  data: any
) => {
  return await updateDoc(doc(database, collectionName, docId), { ...data });
};

export const getDocumentWithFloatChat = async (
  collectionName: string,
  userId: string
) => {
  if (!userId) return;
  const conditionUser1 = and(
    where('userOne', '==', userId),
    where('userOneSeen', '==', false)
  );
  const conditionUser2 = and(
    where('userTwo', '==', userId),
    where('userTwoSeen', '==', false)
  );

  return await getDocs(
    query(
      collection(database, collectionName),
      or(conditionUser1, conditionUser2)
    )
  );
};

export const getDocumentWithRoomsIsExist = async (
  profile: User,
  author: User,
) => {
    return await getDocs(
      query(
        collection(database, "rooms"),
        or(
          and(where('id', '==', profile.id),where('keyUserId', '==', author.id)),
          and(where('id', '==', author.id),where('keyUserId', '==', profile.id))
        )
      )
    );
  }
