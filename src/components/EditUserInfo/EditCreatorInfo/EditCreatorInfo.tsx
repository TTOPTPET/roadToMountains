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
  UserType,
} from "../../../models/userModels/IUserInfo";
import { RootState } from "../../../redux/store";
import { setUserInfo } from "../../../redux/UserInfo/UserInfoReducer";
import Avatar from "../../Avatar/Avatar";
import attachment from "../../../media/attachment.svg";
import EditUserInfo from "../EditUserInfo";
import CreatorDocumentsList from "../../CreatorDocumentsList/CreatorDocumentsList";
import { setCreatorInfo } from "../../../API/creatorAPI/setCreatorInfo";
import InputFieldsCreator from "./InputFieldsCreator/InputFieldsCreator";
import {
  CreatorDocuments,
  StatusVerify,
} from "../../../models/userModels/IUserInfo";
import cloneDeep from "lodash/cloneDeep";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditCreatorInfo() {
  const creatorInfo = useSelector(
    (state: RootState) => state.userInfo.userInfo as ICreatorInfo
  );
  let dispatch = useDispatch();

  const navigate = useNavigate();

  const setFiles = (files: CreatorDocuments[]) => {
    setEditedCreatorInfo({
      ...editedCreatorInfo,
      dataUser: {
        ...editedCreatorInfo?.dataUser,
        documents: files,
      },
    });
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
      let files: CreatorDocuments[] = Array.from(event.target.files).map(
        (file) => {
          // TODO: проверить размер файла
          return { documentName: file.name, file };
        }
      );
      setFiles(editedCreatorInfo?.dataUser?.documents.concat(files));
      event.target.value = null;
    }
  };

  const [editedCreatorInfo, setEditedCreatorInfo] =
    useState<ICreatorInfo>(creatorInfo);

  useEffect(() => {
    setEditedCreatorInfo(creatorInfo);
  }, [creatorInfo]);

  return (
    <>
      <EditUserInfo
        fields={
          <>
            <TextField
              placeholder="Имя"
              color="primary"
              value={editedCreatorInfo?.name}
              onChange={(e) =>
                setEditedCreatorInfo({
                  ...editedCreatorInfo,
                  name: e.target.value,
                })
              }
            />
            <TextField
              placeholder="Телефон"
              color="primary"
              value={editedCreatorInfo?.phone}
              onChange={(e) =>
                setEditedCreatorInfo({
                  ...editedCreatorInfo,
                  phone: e.target.value,
                })
              }
            />
            <TextField
              placeholder="Электронная почта"
              color="primary"
              value={editedCreatorInfo?.email}
              onChange={(e) =>
                setEditedCreatorInfo({
                  ...editedCreatorInfo,
                  email: e.target.value,
                })
              }
            />
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Тип организации
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={
                  editedCreatorInfo?.dataUser?.creatorType
                    ? editedCreatorInfo?.dataUser?.creatorType
                    : ""
                }
                name="radio-buttons-group"
                onChange={(e) => {
                  setEditedCreatorInfo({
                    ...editedCreatorInfo,
                    dataUser: {
                      ...editedCreatorInfo?.dataUser,
                      creatorType: e.target.value as any,
                    },
                  });
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
              editedCreatorInfo={editedCreatorInfo}
              setEditedCreatorInfo={(creatorInfo) =>
                setEditedCreatorInfo(creatorInfo)
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
              files={editedCreatorInfo?.dataUser?.documents}
              variant={"editInfo"}
            />
          </>
        }
        submitFuntion={() =>
          setCreatorInfo(
            editedCreatorInfo,
            (resp) => {
              setInfoStatus(resp?.data?.statusVerify, resp?.data?.timeToSend);
              dispatch(
                setUserInfo({
                  ...editedCreatorInfo,
                  dataUser: {
                    ...editedCreatorInfo.dataUser,
                    documents: resp?.data?.documents,
                  },
                })
              );
              navigate("/creator/lk");
            },
            () => {}
          )
        }
        header={"Личный кабинет"}
        linkTo={"/creator/lk"}
        avatarComponent={
          <Avatar
            photoUrl={editedCreatorInfo.photo}
            setUserPhoto={(photoUrl: string) =>
              setEditedCreatorInfo({ ...editedCreatorInfo, photo: photoUrl })
            }
          />
        }
      />
    </>
  );
}

export default EditCreatorInfo;
