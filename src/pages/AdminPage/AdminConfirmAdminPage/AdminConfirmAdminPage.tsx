import { ChangeEvent, useEffect, useState } from "react";
import { IAdminList } from "../../../models/adminModels/IAdminList";
import { getAdminList, registerAdmin } from "../../../submitFunctions/adminAPI";
import { IRegister } from "../../../models/adminModels/IRegister";

const inputData: IRegister = {
  email: "",
  name: "",
  password: "",
  phone: "",
};

export const AdminConfirmAdminPage = () => {
  const [adminList, setAdminList] = useState<IAdminList[]>();
  const [regAdmin, setRegAdmin] = useState<IRegister>(inputData);

  useEffect(() => {
    getAdminList((value) => setAdminList(value), undefined, true);
    console.log(adminList);
  }, [adminList]);

  const hadnlerUpdateField = (
    key: keyof IRegister,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setRegAdmin({ ...regAdmin, [key]: e.target });
  };

  const handlerRegisterClick = () => {
    registerAdmin((value) => setRegAdmin(value), regAdmin, undefined, true);
  };

  return (
    <>
      <h1>Подтверждение регистрации администраторов</h1>
      <input
        type="text"
        value={regAdmin.email}
        onChange={(e) => hadnlerUpdateField("email", e)}
      ></input>
      <input
        type="text"
        value={regAdmin.name}
        onChange={(e) => hadnlerUpdateField("name", e)}
      ></input>
      <input
        type="text"
        value={regAdmin.password}
        onChange={(e) => hadnlerUpdateField("password", e)}
      ></input>
      <input
        type="text"
        value={regAdmin.phone}
        onChange={(e) => hadnlerUpdateField("phone", e)}
      ></input>
      <input type="button" value="Register" onClick={handlerRegisterClick} />
    </>
  );
};
