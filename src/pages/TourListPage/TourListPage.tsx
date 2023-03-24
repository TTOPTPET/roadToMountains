import { Button, Dialog, Modal } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isModalActive,
  setModalActive,
  setModalInactive,
} from "../../redux/Modal/ModalReducer";
import { RootState } from "../../redux/store";

function TourListPage() {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );
  const dispatch = useDispatch();
  return (
    <div>
      <Button onClick={() => dispatch(setModalActive("filterModal"))}></Button>
      <Dialog
        className="filters"
        onClose={() => dispatch(setModalInactive("filterModal"))}
        open={isModalActive("filterModal", activeModals)}
      ></Dialog>
    </div>
  );
}

export default TourListPage;
