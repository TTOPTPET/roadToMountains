import { TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fromModelsToFieldsName } from "../../../config/types";
import {
  IUserInfo,
  strongUserType,
} from "../../../models/userModels/IUserInfo";
import { RootState } from "../../../redux/store";
import { setUserInfo } from "../../../redux/UserInfo/UserInfoReducer";
import Avatar from "../../Avatar/Avatar";
import EditUserInfo from "../EditUserInfo";
import { TOOOFields } from "./models/fieldsTypes";

function EditCreatorInfo() {
  const creatorInfo = useSelector(
    (state: RootState) => state.userInfo.userInfo
  );
  let dispatch = useDispatch();

  return (
    <>
      <EditUserInfo
        fields={
          <>
            <TextField
              placeholder="Имя"
              color="primary"
              value={creatorInfo?.name}
              onChange={(e) => dispatch(setUserInfo({ name: e.target.value }))}
            />
            <TextField
              placeholder="Телефон"
              color="primary"
              value={creatorInfo?.phone}
              onChange={(e) => dispatch(setUserInfo({ phone: e.target.value }))}
            />
            <TextField
              placeholder="Электронная почта"
              color="primary"
              value={creatorInfo?.email}
              onChange={(e) => dispatch(setUserInfo({ email: e.target.value }))}
            />
            {/* TODO: Здесь RadioButtonsGroup по выбору типа организации */}
            {generateCreatorFields(creatorInfo, (field: string, value: any) =>
              dispatch(
                setUserInfo({ dataUser: { fieldsCreator: { [field]: value } } })
              )
            )}
            {/* TODO: А здесь вывод документов */}
          </>
        }
        submitFuntion={(creatorInfo) => {}}
        // TODO: SubmitFunc - функция, срабатывающаяя на кнопку сохранить
        header={"Личный кабинет"}
        linkTo={"/creatorLk"}
        avatarComponent={
          <Avatar
            photoUrl={creatorInfo.photo}
            setUserPhoto={(photoUrl) =>
              dispatch(setUserInfo({ photo: photoUrl }))
            }
          />
        }
      />
    </>
  );
}

export default EditCreatorInfo;

const generateCreatorFields = (
  creatorInfo: IUserInfo,
  setCreatorInfo: (field: string, value: any) => void
) => {
  switch (creatorInfo.type) {
    case strongUserType.CreatorOOO:
      const fieldsOOO: TOOOFields[] = [
        "innOOO",
        "kppOOO",
        "ogrnOOO",
        "okpoOOO",
        "okatoOOO",
        "okvedOOO",
        "urAdress",
        "registryId",
      ];
      fieldsOOO.map((field) => {
        return (
          <TextField
            placeholder={fromModelsToFieldsName.get(field)}
            color="primary"
            value={creatorInfo.dataUser.fieldsCreator[field]}
            onChange={(e) => setCreatorInfo(field, e.target.value)}
          />
        );
      });
  }
};
