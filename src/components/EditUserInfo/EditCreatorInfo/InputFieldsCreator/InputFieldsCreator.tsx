import { TextField } from "@mui/material";
import React, { useEffect, Dispatch, SetStateAction } from "react";
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
  setInnError: Dispatch<SetStateAction<boolean>>;
};

function InputFieldsCreator({
  creatorInfo,
  editedCreatorInfo,
  setEditedCreatorInfo,
  setInnError,
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
    const regexUR = /^[\d+]{10}$/;
    const regexSELF = /^[\d+]{12}$/;
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
        setInnError(
          !regexUR.test(editedCreatorInfo?.dataUser?.fieldsCreator?.innOOO)
        );
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
                inputProps={field === "innOOO" && { pattern: "^[d+]{10}$" }}
                error={
                  field === "innOOO" &&
                  editedCreatorInfo?.dataUser?.fieldsCreator?.innOOO &&
                  !regexUR.test(editedCreatorInfo.dataUser.fieldsCreator.innOOO)
                }
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
        setInnError(
          !regexUR.test(editedCreatorInfo?.dataUser?.fieldsCreator?.innIP)
        );
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
                inputProps={field === "innIP" && { pattern: "^[d+]{10}$" }}
                error={
                  field === "innIP" &&
                  editedCreatorInfo?.dataUser?.fieldsCreator?.innIP &&
                  !regexUR.test(editedCreatorInfo.dataUser.fieldsCreator.innIP)
                }
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
        setInnError(
          !regexSELF.test(editedCreatorInfo?.dataUser?.fieldsCreator?.innSELF)
        );
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
                inputProps={field === "innSELF" && { pattern: "^[d+]{12}$" }}
                error={
                  field === "innSELF" &&
                  editedCreatorInfo?.dataUser?.fieldsCreator?.innSELF &&
                  !regexSELF.test(
                    editedCreatorInfo.dataUser.fieldsCreator.innSELF
                  )
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
