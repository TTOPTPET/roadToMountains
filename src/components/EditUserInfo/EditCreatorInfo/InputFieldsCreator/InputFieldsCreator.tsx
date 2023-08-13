import { TextField } from "@mui/material";
import React, { useEffect } from "react";
import { fromModelsToFieldsName } from "../../../../config/types";
import {
  CreatorType,
  ICreatorInfo,
  UserType,
} from "../../../../models/userModels/IUserInfo";
import {
  TIPFields,
  TOOOFields,
  TSELFFields,
} from "../../../../models/creatorFieldsModels/ICreatorFields";
import { useDispatch } from "react-redux";
import { clearFieldsCreator } from "../../../../redux/UserInfo/UserInfoReducer";

type inputFieldsCreatorProps = {
  creatorInfo: ICreatorInfo;
  editedCreatorInfo: ICreatorInfo;
  setEditedCreatorInfo: (ICreatorInfo) => void;
};

function InputFieldsCreator({
  creatorInfo,
  editedCreatorInfo,
  setEditedCreatorInfo,
}: inputFieldsCreatorProps) {
  useEffect(() => {
    if (
      editedCreatorInfo.dataUser.creatorType !==
      creatorInfo.dataUser.creatorType
    ) {
      setEditedCreatorInfo({
        ...editedCreatorInfo,
        dataUser: { ...editedCreatorInfo.dataUser, fieldsCreator: {} },
      });
    } else {
      setEditedCreatorInfo({
        ...editedCreatorInfo,
        dataUser: {
          ...editedCreatorInfo.dataUser,
          fieldsCreator: editedCreatorInfo.dataUser.fieldsCreator,
        },
      });
    }
  }, [editedCreatorInfo.dataUser.creatorType]);

  const generFields = (editedCreatorInfo: ICreatorInfo) => {
    switch (editedCreatorInfo.dataUser.creatorType) {
      case CreatorType.OOO:
        const fieldsOOO: TOOOFields[] = [
          "innOOO",
          "kppOOO",
          "ogrnOOO",
          "okpoOOO",
          "okatoOOO",
          "okvedOOO",
          "urAdress",
        ];
        return fieldsOOO.map((field, i) => {
          return (
            editedCreatorInfo?.dataUser?.creatorType === CreatorType.OOO && (
              <TextField
                key={"OOO" + i}
                label={fromModelsToFieldsName.get(field)}
                color="primary"
                value={editedCreatorInfo?.dataUser?.fieldsCreator?.[field]}
                onChange={(e) => {
                  setEditedCreatorInfo({
                    ...editedCreatorInfo,
                    dataUser: {
                      ...editedCreatorInfo.dataUser,
                      fieldsCreator: {
                        ...editedCreatorInfo.dataUser.fieldsCreator,
                        [field]: e.target.value,
                      },
                    },
                  });
                }}
              />
            )
          );
        });
      case CreatorType.IP:
        const fieldsIP: TIPFields[] = [
          "innIP",
          "egripIP",
          "adressIP",
          "ogrnipIP",
        ];
        return fieldsIP.map((field, i) => {
          return (
            editedCreatorInfo?.dataUser?.creatorType === CreatorType.IP && (
              <TextField
                key={"IP" + i}
                label={fromModelsToFieldsName.get(field)}
                color="primary"
                value={
                  editedCreatorInfo?.dataUser?.fieldsCreator?.[field] || ""
                }
                onChange={(e) => {
                  setEditedCreatorInfo({
                    ...editedCreatorInfo,
                    dataUser: {
                      ...editedCreatorInfo.dataUser,
                      fieldsCreator: {
                        ...editedCreatorInfo.dataUser.fieldsCreator,
                        [field]: e.target.value,
                      },
                    },
                  });
                }}
              />
            )
          );
        });
      case CreatorType.SELF:
        const fieldsSELF: TSELFFields[] = [
          "innSELF",
          "adressSELF",
          "pasportSELF",
        ];
        return fieldsSELF.map((field, i) => {
          return (
            editedCreatorInfo?.dataUser?.creatorType === CreatorType.SELF && (
              <TextField
                key={"SELF" + i}
                label={fromModelsToFieldsName.get(field)}
                color="primary"
                value={
                  editedCreatorInfo?.dataUser?.fieldsCreator?.[field] || ""
                }
                onChange={(e) =>
                  setEditedCreatorInfo({
                    ...editedCreatorInfo,
                    dataUser: {
                      ...editedCreatorInfo.dataUser,
                      fieldsCreator: {
                        ...editedCreatorInfo.dataUser.fieldsCreator,
                        [field]: e.target.value,
                      },
                    },
                  })
                }
              />
            )
          );
        });
    }
  };
  return <>{generFields(editedCreatorInfo)}</>;
}

export default InputFieldsCreator;
