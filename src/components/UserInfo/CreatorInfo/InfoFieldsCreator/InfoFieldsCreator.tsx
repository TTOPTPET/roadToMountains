import { TextField, Box, Typography } from "@mui/material";
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

type fieldsCreatorProps = {
  creatorInfo: ICreatorInfo;
};

function InfoFieldsCreator({ creatorInfo }: fieldsCreatorProps) {
  const generFields = (creatorInfo: ICreatorInfo) => {
    switch (creatorInfo.dataUser.creatorType) {
      case CreatorType.OOO:
        const fieldsOOO: TOOOFields[] = [
          "ogrnOOO",
          "innOOO",
          "kppOOO",
          "okatoOOO",
          "okvedOOO",
          "okpoOOO",
          "urAdress",
        ];
        return (
          <Box
            className="userInfo__data"
            sx={{ display: "flex", gap: "50px", mt: "21px" }}
          >
            <Box
              className="userInfo__data-titles"
              sx={{
                width: "280px",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              {fieldsOOO.map((field, i) => {
                return (
                  creatorInfo?.dataUser?.creatorType === CreatorType.OOO && (
                    <Typography variant="h6">
                      {fromModelsToFieldsName.get(field)}:
                    </Typography>
                  )
                );
              })}
            </Box>
            <Box
              className="userInfo__data-descr"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "3px",
              }}
            >
              {fieldsOOO.map((field, i) => {
                return (
                  creatorInfo?.dataUser?.creatorType === CreatorType.OOO && (
                    <Typography variant="caption">
                      {creatorInfo?.dataUser?.fieldsCreator?.[field]}
                    </Typography>
                  )
                );
              })}
            </Box>
          </Box>
        );
      case CreatorType.IP:
        const fieldsIP: TIPFields[] = [
          "ogrnipIP",
          "innIP",
          "egripIP",
          "adressIP",
        ];
        return (
          <Box sx={{ display: "flex", gap: "50px", mt: "21px" }}>
            <Box
              className="userInfo__data-titles"
              sx={{
                width: "280px",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              {fieldsIP.map((field, i) => {
                return (
                  creatorInfo?.dataUser?.creatorType === CreatorType.IP && (
                    <Typography variant="h6">
                      {fromModelsToFieldsName.get(field)}
                    </Typography>
                  )
                );
              })}
            </Box>
            <Box
              className="userInfo__data-descr"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "3px",
              }}
            >
              {fieldsIP.map((field, i) => {
                return (
                  creatorInfo?.dataUser?.creatorType === CreatorType.IP && (
                    <Typography variant="caption">
                      {creatorInfo?.dataUser?.fieldsCreator?.[field]}
                    </Typography>
                  )
                );
              })}
            </Box>
          </Box>
        );
      case CreatorType.SELF:
        const fieldsSELF: TSELFFields[] = [
          "pasportSELF",
          "innSELF",
          "adressSELF",
        ];
        return (
          <Box sx={{ display: "flex", gap: "50px", mt: "21px" }}>
            <Box
              className="userInfo__data-titles"
              sx={{
                width: "280px",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              {fieldsSELF.map((field, i) => {
                return (
                  creatorInfo?.dataUser?.creatorType === CreatorType.SELF && (
                    <Typography variant="h6">
                      {fromModelsToFieldsName.get(field)}
                    </Typography>
                  )
                );
              })}
            </Box>
            <Box
              className="userInfo__data-descr"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "3px",
              }}
            >
              {fieldsSELF.map((field, i) => {
                return (
                  creatorInfo?.dataUser?.creatorType === CreatorType.SELF && (
                    <Typography variant="caption">
                      {creatorInfo?.dataUser?.fieldsCreator?.[field]}
                    </Typography>
                  )
                );
              })}
            </Box>
          </Box>
        );
    }
  };
  return <>{generFields(creatorInfo)}</>;
}

export default InfoFieldsCreator;
