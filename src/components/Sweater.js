import React, { useState } from "react";
import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref, getStorage } from "firebase/storage";

const Sweater = ({ sweaterObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newSweater, setNewSweater] = useState(sweaterObj.text);
  const storageService = getStorage();

  const SweaterTextRef = doc(dbService, "sweaters", `${sweaterObj.id}`);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this sweater?");
    console.log(ok);
    if (ok) {
      await deleteDoc(SweaterTextRef);
      await deleteObject(ref(storageService, sweaterObj.attachmentUrl));
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewSweater(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    await updateDoc(SweaterTextRef, {
      text: newSweater,
    });

    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your sweater!"
              value={newSweater}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Sweater" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{sweaterObj.text}</h4>
          {sweaterObj.attachmentUrl && (
            <img src={sweaterObj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Sweater</button>
              <button onClick={toggleEditing}>Edit Sweater</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Sweater;
