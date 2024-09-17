import { doc, setDoc, getDocs, collection, addDoc } from "../firebase/config";
import { Timestamp } from "firebase/firestore";

export const addDocument = async (db, collection, data) => {
  try {
    const docRef = doc(db, collection, data.uid);

    //Set va gan thong tin vao firestore
    await setDoc(
      docRef,
      {
        ...data,
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


// tao keywords cho displayName, su dung cho search
export const generateKeywords = (displayName) => {
  // liet ke tat cac hoan vi. vd: name = ["David", "Van", "Teo"]
  // => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
  const name = displayName.split(' ').filter((word) => word);

  const length = name.length;
  let flagArray = [];
  let result = [];
  let stringArray = [];

  /**
   * khoi tao mang flag false
   * dung de danh dau xem gia tri
   * tai vi tri nay da duoc su dung
   * hay chua
   **/
  for (let i = 0; i < length; i++) {
    flagArray[i] = false;
  }

  const createKeywords = (name) => {
    const arrName = [];
    let curName = '';
    name.split('').forEach((letter) => {
      curName += letter;
      arrName.push(curName);
    });
    return arrName;
  };

  function findPermutation(k) {
    for (let i = 0; i < length; i++) {
      if (!flagArray[i]) {
        flagArray[i] = true;
        result[k] = name[i];

        if (k === length - 1) {
          stringArray.push(result.join(' '));
        }

        findPermutation(k + 1);
        flagArray[i] = false;
      }
    }
  }

  findPermutation(0);

  const keywords = stringArray.reduce((acc, cur) => {
    const words = createKeywords(cur);
    return [...acc, ...words];
  }, []);

  return keywords;
};