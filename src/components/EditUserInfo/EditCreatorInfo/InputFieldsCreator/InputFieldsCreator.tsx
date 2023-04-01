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

type inputFieldsCreatorProps = {
  creatorInfo: ICreatorInfo;
  setCreatorInfo: (field: string, value: any, text: any) => void;
};

function InputFieldsCreator({
  creatorInfo,
  setCreatorInfo,
}: inputFieldsCreatorProps) {
  const generFields = (creatorInfo: ICreatorInfo) => {
    switch (creatorInfo.dataUser.creatorType) {
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
            creatorInfo?.dataUser?.creatorType === CreatorType.OOO && (
              <TextField
                key={i}
                placeholder={fromModelsToFieldsName.get(field)}
                color="primary"
                value={creatorInfo?.dataUser?.fieldsCreator?.[field]}
                onChange={(e) =>
                  setCreatorInfo(
                    field,
                    e.target.value,
                    creatorInfo?.dataUser?.fieldsCreator
                  )
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
        return fieldsIP.map((field, i) => {
          return (
            creatorInfo?.dataUser?.creatorType === CreatorType.IP && (
              <TextField
                key={i}
                placeholder={fromModelsToFieldsName.get(field)}
                color="primary"
                value={creatorInfo?.dataUser?.fieldsCreator?.[field] || ""}
                onChange={(e) => {
                  setCreatorInfo(
                    field,
                    e.target.value,
                    creatorInfo?.dataUser?.fieldsCreator
                  );
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
            creatorInfo?.dataUser?.creatorType === CreatorType.SELF && (
              <TextField
                key={i}
                placeholder={fromModelsToFieldsName.get(field)}
                color="primary"
                value={creatorInfo?.dataUser?.fieldsCreator?.[field] || ""}
                onChange={(e) =>
                  setCreatorInfo(
                    field,
                    e.target.value,
                    creatorInfo?.dataUser?.fieldsCreator
                  )
                }
              />
            )
          );
        });
    }
  };
  return <>{generFields(creatorInfo)}</>;
}

export default InputFieldsCreator;
