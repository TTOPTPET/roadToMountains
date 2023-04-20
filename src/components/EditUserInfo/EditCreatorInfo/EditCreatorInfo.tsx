import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  ICreatorInfo,
  CreatorType,
} from "../../../models/userModels/IUserInfo";
import { RootState } from "../../../redux/store";
import { setUserInfo } from "../../../redux/UserInfo/UserInfoReducer";
import Avatar from "../../Avatar/Avatar";
import attachment from "../../../media/attachment.svg";
import EditUserInfo from "../EditUserInfo";
import CreatorDocumentsList from "../../CreatorDocumentsList/CreatorDocumentsList";
import { setCreatorInfo } from "../../../submitFunctions/creatorAPI/setCreatorInfo";
import InputFieldsCreator from "./InputFieldsCreator/InputFieldsCreator";
import {
  CreatorDocuments,
  StatusVerify,
} from "../../../models/userModels/IUserInfo";

function EditCreatorInfo() {
  const creatorInfo = useSelector(
    (state: RootState) => state.userInfo.userInfo as ICreatorInfo
  );
  let dispatch = useDispatch();

  const setFiles = (files: CreatorDocuments[]) => {
    dispatch(
      setUserInfo({
        ...creatorInfo,
        dataUser: {
          ...creatorInfo?.dataUser,
          documents: files,
        },
      })
    );
  };

  const setInfoStatus = (statusVerify: StatusVerify, timeToSend: string) => {
    dispatch(
      setUserInfo({
        ...creatorInfo,
        dataUser: {
          ...creatorInfo?.dataUser,
          statusVerify,
          timeToSend,
        },
      })
    );
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      let files = Array.from(event.target.files).map((file) => {
        const { name, lastModified, size } = file;
        // TODO: проверить размер файла
        return { name, lastModified };
      });
      setFiles(files);
      event.target.value = null;
    }
  };

  return (
    <>
      {JSON.stringify(creatorInfo)}
      <EditUserInfo
        fields={
          <>
            <TextField
              placeholder="Имя"
              color="primary"
              value={creatorInfo?.name}
              onChange={(e) =>
                dispatch(setUserInfo({ ...creatorInfo, name: e.target.value }))
              }
            />
            <TextField
              placeholder="Телефон"
              color="primary"
              value={creatorInfo?.phone}
              onChange={(e) =>
                dispatch(setUserInfo({ ...creatorInfo, phone: e.target.value }))
              }
            />
            <TextField
              placeholder="Электронная почта"
              color="primary"
              value={creatorInfo?.email}
              onChange={(e) =>
                dispatch(setUserInfo({ ...creatorInfo, email: e.target.value }))
              }
            />
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Тип организации
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={
                  creatorInfo?.dataUser?.creatorType
                    ? creatorInfo?.dataUser?.creatorType
                    : ""
                }
                name="radio-buttons-group"
                onChange={(e) => {
                  dispatch(
                    setUserInfo({
                      ...creatorInfo,
                      dataUser: {
                        ...creatorInfo?.dataUser,
                        creatorType: e.target.value as any,
                      },
                    })
                  );
                }}
              >
                <FormControlLabel
                  value={CreatorType.OOO}
                  control={<Radio />}
                  label="ООО"
                />
                <FormControlLabel
                  value={CreatorType.IP}
                  control={<Radio />}
                  label="ИП"
                />
                <FormControlLabel
                  value={CreatorType.SELF}
                  control={<Radio />}
                  label="Физическое лицо (самозанятый)"
                />
              </RadioGroup>
            </FormControl>
            <InputFieldsCreator
              creatorInfo={creatorInfo}
              setCreatorInfo={(
                field: string,
                value: any,
                fieldsPrototipe: any
              ) =>
                dispatch(
                  setUserInfo({
                    ...creatorInfo,
                    dataUser: {
                      ...creatorInfo?.dataUser,
                      fieldsCreator: {
                        ...fieldsPrototipe,
                        [field]: value,
                      },
                    },
                  })
                )
              }
            />
            <Button variant="fileInput" component="label">
              <Typography variant="caption">
                Загрузить файлы размером до 2 Мб
              </Typography>
              <img src={attachment} alt="attachment" />
              <input
                id="fileItem"
                type="file"
                hidden
                multiple
                onChange={handleFileInputChange}
              />
            </Button>
            <CreatorDocumentsList
              setFiles={setFiles}
              files={creatorInfo?.dataUser?.documents}
              variant={"editInfo"}
            />
          </>
        }
        submitFuntion={() =>
          setCreatorInfo({ ...creatorInfo, ...creatorInfo.dataUser }, (resp) =>
            setInfoStatus(resp?.data?.statusVerify, resp?.data?.timeToSend)
          )
        }
        header={"Личный кабинет"}
        linkTo={"/creator/lk"}
        avatarComponent={
          <Avatar
            photoUrl={creatorInfo.photo}
            setUserPhoto={(photoUrl: string) =>
              dispatch(setUserInfo({ ...creatorInfo, photo: photoUrl }))
            }
          />
        }
      />
    </>
  );
}

export default EditCreatorInfo;
