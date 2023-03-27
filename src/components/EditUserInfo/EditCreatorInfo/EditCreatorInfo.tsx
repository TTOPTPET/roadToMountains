import { TextField } from "@mui/material";
import { useState } from "react";
import { fromModelsToFieldsName } from "../../../config/types";
import { IUserInfo, userTypes } from "../../../models/userModels/IUserInfo";
import Avatar from "../../Avatar/Avatar";
import EditUserInfo from "../EditUserInfo";
import { TOOOFields } from "./models/fieldsTypes";

function EditCreatorInfo(props: IUserInfo) {
  const { type, name, phone, email, dataUser } = props;

  const [creatorInfo, setCreatorInfo] = useState<IUserInfo>(props);

  return (
    <>
      <EditUserInfo
        fields={
          <>
            <TextField
              placeholder="Имя"
              color="primary"
              value={creatorInfo?.name}
              onChange={(e) =>
                setCreatorInfo((info) => ({ ...info, name: e.target.value }))
              }
            />
            <TextField
              placeholder="Телефон"
              color="primary"
              value={creatorInfo?.name}
              onChange={(e) =>
                setCreatorInfo((info) => ({ ...info, name: e.target.value }))
              }
            />
            <TextField
              placeholder="Электронная почта"
              color="primary"
              value={creatorInfo?.name}
              onChange={(e) =>
                setCreatorInfo((info) => ({ ...info, name: e.target.value }))
              }
            />
            {/* TODO: Здесь RadioButtonsGroup по выбору типа организации */}
            {generateCreatorFields(props, setCreatorInfo)}
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
              setCreatorInfo((info) => ({ ...info, photoUrl }))
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
  setCreatorInfo: (propFunc: (prop: IUserInfo) => IUserInfo) => void
): any => {
  switch (creatorInfo.type) {
    case userTypes.CreatorOOO:
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
            onChange={(e) =>
              setCreatorInfo((info) => ({ ...info, field: e.target.value }))
            }
          />
        );
      });
  }
};
