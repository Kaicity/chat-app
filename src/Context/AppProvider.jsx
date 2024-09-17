import React, { createContext, useMemo, useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import UseFirestore from "../hooks/UseFirestore";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const user = useContext(AuthContext);
  const { uid } = user;

  //using modal every component can using everywhere
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState("");

  const roomsCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);

  const rooms = UseFirestore("rooms", roomsCondition);

  return (
    <AppContext.Provider
      value={{
        rooms,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
