import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import Sweater from "components/Sweater";
import SweaterFactory from "components/SweaterFactory";

const Home = ({ userObj }) => {
  const [sweaters, setSweaters] = useState([]);

  useEffect(() => {
    const q = query(
      collection(dbService, "sweaters"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const sweaterArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSweaters(sweaterArr);
    });
  }, []);

  return (
    <div>
      <SweaterFactory userObj={userObj} />
      <div>
        {sweaters.map((sweater) => (
          <Sweater
            key={sweater.id}
            sweaterObj={sweater}
            isOwner={sweater.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
