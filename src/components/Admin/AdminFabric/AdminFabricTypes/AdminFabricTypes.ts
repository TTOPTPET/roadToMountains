import { IAdminList } from "../../../../models/adminModels/IAdminList";
import { ICreatorList } from "../../../../models/adminModels/ICreatorList";
import { ITourList } from "../../../../models/adminModels/ITourList";
import { ITouristList } from "../../../../models/adminModels/ITouristList";
import { IUserMessage } from "../../../../models/adminModels/IUsersMessage";

interface ITouristComponent extends ITouristList {
  type: "tourist";
}

interface ITourComponent extends ITourList {
  type: "tour";
}

interface IMessageComponent extends IUserMessage {
  type: "message";
}

interface ICreatorComponent extends ICreatorList {
  type: "creator";
}

interface IAdminRegisterComponent extends IAdminList {
  type: "admin";
}

export type IAdminComponent =
  | ITourComponent
  | ITouristComponent
  | IMessageComponent
  | ICreatorComponent
  | IAdminRegisterComponent;
