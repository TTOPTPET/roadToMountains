import { TextField } from "@mui/material";
import React, { useEffect } from "react";
import { fromModelsToFieldsName } from "../../../../config/types";
import {
  CreatorType,
  ICreatorInfo,
  UserType,
} from "../../../../models/userModels/IUserInfo";
import { TIPFields, TOOOFields, TSELFFields } from "../models/fieldsTypes";

type fieldsCreatorProps = {
  creatorInfo: ICreatorInfo;
  setCreatorInfo: (field: string, value: any) => void;
};

function FieldsCreator({ creatorInfo, setCreatorInfo }: fieldsCreatorProps) {
  useEffect(() => {
    console.log("creatorInfo", creatorInfo);
  }, [creatorInfo]);

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
                onChange={(e) => setCreatorInfo(field, e.target.value)}
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
                onChange={(e) => setCreatorInfo(field, e.target.value)}
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
                onChange={(e) => setCreatorInfo(field, e.target.value)}
              />
            )
          );
        });
    }
  };
  return <>{generFields(creatorInfo)}</>;
}

export default FieldsCreator;
