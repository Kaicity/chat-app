import { doc, setDoc, getDocs, collection, addDoc } from "../firebase/config";
import { Timestamp } from "firebase/firestore";

export const addDocument = async (db, collection, data) => {
  try {
    const docRef = doc(db, collection, data.uid);

    //Set va gan thong tin vao firestore
    await setDoc(
      docRef,
      {
        data,
        createdAt: Timestamp.now(),
      },
      { merge: true } // su dung merge cho update khi document nay ton tai
    );
  } catch (error) {
    console.error("Error when saving with data", error);
  }
};

export const addDocumentGenerateAutoId = async (db, collectionName, data) => {
  try {
    // Use addDoc to add a new document with an auto-generated ID
    await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error when saving with data", error);
  }
};

export const getAllDocuments = async (db, collectionName) => {
  try {
    if (!collectionName) {
      throw new Error("Collection name is required");
    }

    const colRef = collection(db, collectionName);
    const colSnap = await getDocs(colRef);

    if (!colSnap.empty) {
      const documents = colSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return documents;
    }
  } catch (error) {
    console.error("Error when getting documents: ", error);
  }
};
