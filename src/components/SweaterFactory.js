import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { v4 } from "uuid";
import {
  getStorage,
  uploadString,
  ref,
  getDownloadURL,
} from "firebase/storage";

const SweaterFactory = ({ userObj }) => {
  const [sweater, setSweater] = useState("");
  const [attachment, setAttachment] = useState("");

  const storageService = getStorage();
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment != "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${v4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      attachmentUrl = await getDownloadURL(response.ref);
    }
    await addDoc(collection(dbService, "sweaters"), {
      text: sweater,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    });
    setSweater("");
    setAttachment("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setSweater(value);
  };

  const onClearPhotoClick = () => setAttachment("");

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        onChange={onChange}
        placeholder="What's on your mind?"
        maxLength={120}
        value={sweater}
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" onChange={onChange} value="Sweater" />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" />
          <button onClick={onClearPhotoClick}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default SweaterFactory;
