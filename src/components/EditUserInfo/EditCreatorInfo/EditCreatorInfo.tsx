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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreatorType,
  ICreatorInfo,
} from "../../../models/userModels/IUserInfo";
import { RootState } from "../../../redux/store";
import { setUserInfo } from "../../../redux/UserInfo/UserInfoReducer";
import Avatar from "../../Avatar/Avatar";
import attachment from "../../../media/attachment.svg";
import EditUserInfo from "../EditUserInfo";
import CreatorDocumentsList from "../../CreatorDocumentsList/CreatorDocumentsList";
import { setCreatorInfo } from "../../../submitFunctions/creatorAPI/setCreatorInfo";
import FieldsCreator from "./FieldsCreator/FieldsCreator";

import { CreatorDocuments } from "../../../models/userModels/IUserInfo";

function EditCreatorInfo() {
  const creatorInfo = useSelector(
    (state: RootState) => state.userInfo.userInfo as ICreatorInfo
  );
  let dispatch = useDispatch();

  const [files, setFiles] = useState<CreatorDocuments[]>();

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      let files = Array.from(event.target.files).map((file) => {
        const { name, lastModified } = file;
        return { name, lastModified };
      });
      setFiles(files);
    }
  };

  return (
    <>
      <EditUserInfo
        fields={
          <>
            <TextField
              placeholder="Имя"
              color="primary"
              value={creatorInfo?.name}
              onChange={(e) => {
                dispatch(setUserInfo({ ...creatorInfo, name: e.target.value }));
                console.log(e.target.value, creatorInfo?.name);
              }}
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
                  console.log(e.target.value);
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
            <FieldsCreator
              creatorInfo={creatorInfo}
              setCreatorInfo={(field: string, value: any, text: any) =>
                dispatch(
                  setUserInfo({
                    ...creatorInfo,
                    dataUser: {
                      ...creatorInfo?.dataUser,
                      fieldsCreator: {
                        ...text,
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
              files={files}
              variant={"editInfo"}
            />
          </>
        }
        submitFuntion={
          setCreatorInfo(creatorInfo, () => {}) //TODO: Обработать ответ
        }
        // TODO: SubmitFunc - функция, срабатывающаяя на кнопку сохранить
        header={"Личный кабинет"}
        linkTo={"/creatorLk"}
        avatarComponent={
          <Avatar
            photoUrl={creatorInfo.photo}
            setUserPhoto={(photoUrl) =>
              dispatch(setUserInfo({ ...creatorInfo, photo: photoUrl }))
            }
          />
        }
      />
    </>
  );
}

export default EditCreatorInfo;
