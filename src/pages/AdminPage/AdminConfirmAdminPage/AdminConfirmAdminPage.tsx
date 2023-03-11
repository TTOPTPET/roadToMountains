import { ChangeEvent, useEffect, useState } from "react";
import { IAdminList } from "../../../models/adminModels/IAdminList";
import { getAdminList, registerAdmin } from "../../../submitFunctions/adminAPI";
import { IRegister } from "../../../models/adminModels/IRegister";

export const AdminConfirmAdminPage = () => {
  const [AdminList, SetAdminList] = useState<IAdminList[]>();
  useEffect(() => {
    getAdminList((value) => SetAdminList(value), undefined, true);
  });

  const inputData: IRegister = {
    email: "",
    name: "",
    password: "",
    phone: "",
  };
  const [RegAdmin, SetRegAdmin] = useState<IRegister>(inputData);

  const updateField = (
    key: keyof IRegister,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    SetRegAdmin({ ...RegAdmin, [key]: value });
  };

  const registerClick = () => {
    registerAdmin((value) => SetRegAdmin(value), RegAdmin, undefined, true);
  };

  console.log(AdminList);
  return (
    <>
      <h1>Подтверждение регистрации администраторов</h1>
      <input
        type="text"
        value={RegAdmin.email}
        onChange={(e) => updateField("email", e)}
      ></input>
      <input
        type="text"
        value={RegAdmin.name}
        onChange={(e) => updateField("name", e)}
      ></input>
      <input
        type="text"
        value={RegAdmin.password}
        onChange={(e) => updateField("password", e)}
      ></input>
      <input
        type="text"
        value={RegAdmin.phone}
        onChange={(e) => updateField("phone", e)}
      ></input>
      <input type="button" value="Register" onClick={registerClick} />
    </>
  );
};
