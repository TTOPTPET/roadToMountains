import { getTouristList } from "./AdminAccessTouristAPI/AdminAccessTouristAPI";
import { getTourList, tourBan } from "./AdminAccessTourAPI/AdminAccesTourAPI";
import {
  getCreatorList,
  verifyCreator,
} from "./AdminVerifyTouroperatorAPI/AdminVerifyTouroperatorAPI";
import {
  getUserMessages,
  changeMessageStatus,
} from "./AdminMessagesAPI/AdminMessagesAPI";
import {
  getAdminList,
  registerAdmin,
  loginAdmin,
} from "./AdminConfirmAdminAPI/AdminConfirmAdminAPI";
import { userBan } from "./AdminUsersAPI/AdminUsersAPI";

export {
  getTouristList,
  getTourList,
  getCreatorList,
  getUserMessages,
  getAdminList,
  tourBan,
  verifyCreator,
  changeMessageStatus,
  registerAdmin,
  loginAdmin,
  userBan,
};
