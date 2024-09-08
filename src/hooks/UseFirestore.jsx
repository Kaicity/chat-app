import React, { useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  db
} from "../firebase/config";
import { useEffect } from "react";

function UseFirestore(collectionName, condition) {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    //Kiem tra collection name
    if (!collectionName) {
      console.error("Collection name cannot be empty.");
      return;
    }

    //Query theo createdAt
    let collectionRef = query(
      collection(db, collectionName),
      orderBy("createdAt")
    );

    //Check so sanh va su dung toon tu ==
    if (
      condition &&
      condition.fieldName &&
      condition.operator &&
      condition.compareValue
    ) {
      collectionRef = query(
        collectionRef,
        where(condition.fieldName, condition.operator, condition.compareValue)
      );
    }

    // Lay data tu query truoc do
    const unSubScribe = onSnapshot(collectionRef, (snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocuments(documents);
    });

    return () => unSubScribe();
  }, [collectionName, condition]);

  return documents;
}

export default UseFirestore;
