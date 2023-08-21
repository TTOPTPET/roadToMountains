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
import { v4 } from "uuid";
import EnterMobileCodeModal from "../../Modals/EnterMobileCodeModal/EnterMobileCodeModal";
import {
  setModalActive,
  setModalInactive,
} from "../../../redux/Modal/ModalReducer";
import ConfirmChangeCreatorTypeModal from "../../Modals/ConfirmChangeCreatorTypeModal/ConfirmChangeCreatorTypeModal";
import InputMask from "react-input-mask";

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

  const setInfoStatus = (
    statusVerify: StatusVerify,
    timeToSend: string,
    changeStatus: boolean
  ) => {
    dispatch(
      setUserInfo({
        ...creatorInfo,
        dataUser: {
          ...creatorInfo?.dataUser,
          statusVerify,
          timeToSend,
          changeStatus,
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
          return { documentName: file.name, file, tempId: v4() };
        }
      );
      setFiles(editedCreatorInfo?.dataUser?.documents?.concat(files) || files);
      event.target.value = null;
    }
  };

  const [editedCreatorInfo, setEditedCreatorInfo] =
    useState<ICreatorInfo>(creatorInfo);

  useEffect(() => {
    JSON.stringify(editedCreatorInfo) === JSON.stringify({ dataUser: {} }) &&
      setEditedCreatorInfo(creatorInfo);
  }, [creatorInfo]);

  const [radioFirstChange, setRadioFirstChange] = useState(true);

  useEffect(() => {
    setRadioFirstChange(true);
  }, []);

  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const getPhoneTextField = (): React.ReactNode => {
    //@ts-ignore
    return () => (
      <TextField
        label="Номер телефона"
        color="primary"
        value={editedCreatorInfo?.phone}
        error={
          editedCreatorInfo?.phone.replace(/[() -+-]/g, "").length !== 11
            ? true
            : false
        }
      />
    );
  };

  const [innError, setInnError] = useState(false);

  return (
    <>
      <EditUserInfo
        fields={
          <>
            <TextField
              label="Имя"
              color="primary"
              value={editedCreatorInfo?.name}
              onChange={(e) =>
                setEditedCreatorInfo({
                  ...editedCreatorInfo,
                  name: e.target.value,
                })
              }
            />
            <InputMask
              mask={"+7 (999) 999-99-99"}
              maskChar=" "
              value={editedCreatorInfo?.phone}
              onChange={(e) => {
                setEditedCreatorInfo({
                  ...editedCreatorInfo,
                  phone: e.target.value,
                });
              }}
            >
              {getPhoneTextField()}
            </InputMask>
            <TextField
              label="Электронная почта"
              color="primary"
              value={editedCreatorInfo?.email}
              error={!re.test(editedCreatorInfo?.email)}
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
                  if (radioFirstChange && creatorInfo?.dataUser?.creatorType) {
                    setRadioFirstChange(false);
                    dispatch(
                      setModalActive("confirmChangeCreatorTypeModal", {
                        creatorTypeRadio: e.target.value,
                      })
                    );
                  } else {
                    setEditedCreatorInfo({
                      ...editedCreatorInfo,
                      dataUser: {
                        ...editedCreatorInfo?.dataUser,
                        creatorType: e.target.value as any,
                      },
                    });
                  }
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
              setInnError={setInnError}
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
              setInfoStatus(
                resp?.statusVerify,
                resp?.timeToSend,
                resp?.changeStatus
              );
              dispatch(
                setUserInfo({
                  ...editedCreatorInfo,
                  photo: resp?.photo,
                  dataUser: {
                    ...editedCreatorInfo.dataUser,
                    documents: resp?.documents,
                  },
                })
              );
              navigate("/creator/lk");
            },
            (resp) => {
              dispatch(
                setUserInfo({
                  ...editedCreatorInfo,
                  email: creatorInfo.email,
                  phone: creatorInfo.phone,
                  photo: resp?.photo,
                  dataUser: {
                    ...editedCreatorInfo.dataUser,
                    documents: resp?.documents,
                  },
                })
              );
              dispatch(setModalActive("enterMobileCodeModal"));
            }
          )
        }
        header={"Личный кабинет"}
        linkTo={"/creator/lk"}
        AvatarComponent={() => (
          <Avatar
            photoUrl={editedCreatorInfo.photo as string}
            setUserPhoto={(photo: string | File) =>
              setEditedCreatorInfo({ ...editedCreatorInfo, photo })
            }
          />
        )}
        errored={
          editedCreatorInfo?.phone.replace(/[() -+-]/g, "").length !== 11 ||
          (!re.test(editedCreatorInfo?.email) ? true : false) ||
          innError
        }
      />
      <EnterMobileCodeModal
        successCallback={(resp) => {
          dispatch(
            setUserInfo({
              ...editedCreatorInfo,
              dataUser: {
                ...editedCreatorInfo.dataUser,
                documents: creatorInfo.dataUser.documents,
              },
            })
          );
          dispatch(setModalInactive("enterMobileCodeModal"));
          navigate("/creator/lk");
        }}
      />
      <ConfirmChangeCreatorTypeModal
        setEditedCreatorInfo={setEditedCreatorInfo}
      />
    </>
  );
}

export default EditCreatorInfo;
