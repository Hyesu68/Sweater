import React, { useEffect, useState } from "react";
import { authService } from "fbase";
import { updateProfile } from "firebase/auth";
import AppRouter from "components/Router";

function App() {
  const [init, setInit] = useState(false);
  const [userObject, setUserObject] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObject({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) =>
            updateProfile(user, {
              displayName: user.displayName,
            }),
        });
      } else {
        setUserObject(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObject({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) =>
        updateProfile(user, {
          displayName: user.displayName,
        }),
    });
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObject)}
          userObj={userObject}
        />
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
