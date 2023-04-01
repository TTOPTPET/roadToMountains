import { Typography, Box } from "@mui/material";
import {
  CreatorType,
  ICreatorInfo,
  ITouristInfo,
  UserType,
} from "../../../models/userModels/IUserInfo";

function UserInfoData(props: ICreatorInfo | ITouristInfo) {
  const { typeUser, name, phone, email, dataUser } = props;

  return (
    <Box sx={{ ml: "30px" }}>
      <Box className="userInfo_title">
        <Typography variant="h5">
          {typeUser === UserType.tourist
            ? name
            : typeUser === UserType.creator &&
              dataUser.creatorType === CreatorType.IP
            ? `ИП ${name}`
            : typeUser === UserType.creator &&
              dataUser.creatorType === CreatorType.OOO
            ? `ООО ${name}`
            : `${name}`}
        </Typography>
      </Box>
      <Box>
        <Box
          className="userInfo__commonData"
          sx={{
            display: "flex",
            gap: typeUser === UserType.tourist ? "10px" : "35px",
            mt: "10px",
          }}
        >
          <Box
            className="userInfo__commonData-titles"
            sx={{
              display: "flex",
              flexDirection: "column",
              width: typeUser === UserType.tourist ? "190px" : "280px",
              gap: "5px",
            }}
          >
            <Typography variant="h6">Номер телефона:</Typography>
            <Typography variant="h6">Электронная почта:</Typography>
          </Box>
          <Box
            className="userInfo__commonData-descr"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "3px",
            }}
          >
            <Typography variant="caption">{phone}</Typography>
            <Typography variant="caption">{email}</Typography>
          </Box>
        </Box>
        {(() => {
          switch (typeUser) {
            case UserType.tourist:
              const { sex, region } = dataUser;
              return (
                <Box
                  className="userInfo__commonData"
                  sx={{
                    display: "flex",
                    gap: "10px",
                    mt: "5px",
                  }}
                >
                  <Box
                    className="userInfo__commonData-titles"
                    sx={{
                      width: "190px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <Typography variant="h6">Пол:</Typography>
                    <Typography variant="h6">Регион проживания:</Typography>
                  </Box>
                  <Box
                    className="userInfo__commonData-descr"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "3px",
                    }}
                  >
                    <Typography variant="caption">{sex}</Typography>
                    <Typography variant="caption">{region}</Typography>
                  </Box>
                </Box>
              );
            case UserType.creator:
              switch (dataUser.creatorType) {
                case CreatorType.SELF:
                  const { adressSELF, innSELF, pasportSELF } =
                    dataUser.fieldsCreator;
                  return (
                    <Box
                      className="userInfo__data"
                      sx={{
                        display: "flex",
                        gap: "35px",
                        mt: "20px",
                      }}
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
                        <Typography variant="h6">
                          Серия и номер паспорта РФ:
                        </Typography>
                        <Typography variant="h6">ИНН:</Typography>
                        <Typography variant="h6">Адрес регистрации:</Typography>
                        <Typography variant="h6">
                          Налоговый счёт самозанятого:
                        </Typography>
                      </Box>
                      <Box
                        className="userInfo__data-descr"
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "3px",
                        }}
                      >
                        <Typography variant="caption">{pasportSELF}</Typography>
                        <Typography variant="caption">{innSELF}</Typography>
                        <Typography variant="caption">{adressSELF}</Typography>
                      </Box>
                    </Box>
                  );
                case CreatorType.IP:
                  const { adressIP, egripIP, innIP, ogrnipIP } =
                    dataUser.fieldsCreator;
                  return (
                    <Box
                      className="userInfo__data"
                      sx={{
                        display: "flex",
                        gap: "35px",
                        mt: "20px",
                      }}
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
                        <Typography variant="h6">ОГРНИП:</Typography>
                        <Typography variant="h6">ИНН:</Typography>
                        <Typography variant="h6">Выписка из ЕГРИП:</Typography>
                        <Typography variant="h6">Адрес регистрации:</Typography>
                      </Box>
                      <Box
                        className="userInfo__data-descr"
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "3px",
                        }}
                      >
                        <Typography variant="caption">{ogrnipIP}</Typography>
                        <Typography variant="caption">{innIP}</Typography>
                        <Typography variant="caption">{egripIP}</Typography>
                        <Typography variant="caption">{adressIP}</Typography>
                      </Box>
                    </Box>
                  );
                case CreatorType.OOO:
                  const {
                    innOOO,
                    kppOOO,
                    ogrnOOO,
                    okatoOOO,
                    okpoOOO,
                    okvedOOO,
                    urAdress,
                  } = dataUser.fieldsCreator;
                  return (
                    <Box
                      className="userInfo__data"
                      sx={{
                        display: "flex",
                        gap: "35px",
                        mt: "20px",
                      }}
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
                        <Typography variant="h6">ОГРН:</Typography>
                        <Typography variant="h6">ИНН:</Typography>
                        <Typography variant="h6">КПП:</Typography>
                        <Typography variant="h6">Код ОКАТО:</Typography>
                        <Typography variant="h6">ОКВЭД:</Typography>
                        <Typography variant="h6">ОКПО:</Typography>
                        <Typography variant="h6">Юридический адрес:</Typography>
                      </Box>
                      <Box
                        className="userInfo__data-descr"
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "3px",
                        }}
                      >
                        <Typography variant="caption">{ogrnOOO}</Typography>
                        <Typography variant="caption">{innOOO}</Typography>
                        <Typography variant="caption">{kppOOO}</Typography>
                        <Typography variant="caption">{okatoOOO}</Typography>
                        <Typography variant="caption">{okvedOOO}</Typography>
                        <Typography variant="caption">{okpoOOO}</Typography>
                        <Typography variant="caption">{urAdress}</Typography>
                      </Box>
                    </Box>
                  );
              }

            default:
              return null;
          }
        })()}
      </Box>
    </Box>
  );
}

export default UserInfoData;
