import { Divider, MenuItem } from "@mui/material";
import MenuPopover from "components/menu-popover/MenuPopover";
import Iconify from "components/iconify/Iconify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { PATH_DASHBOARD } from "routes/paths";

const MenuPopupChapter = ({
  openPopover,
  handleClosePopover,
  wantInfo,
  setOpenConfirm,
}) => {
  const navigate = useNavigate();
  const { modulePermit } = useSelector((state) => state.menuPermission);
  return (
    <>
      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            handleClosePopover();
            navigate(`${PATH_DASHBOARD.editwanttobe}/${wantInfo?.id}`);
          }}
          disabled={!Boolean(modulePermit?.edit)}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
        <Divider sx={{ borderStyle: "dashed" }} />
        <MenuItem
          onClick={() => {
            handleClosePopover();
            setOpenConfirm(true);
          }}
          sx={{ color: "error.main" }}
          disabled={!Boolean(modulePermit?.remove)}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>
    </>
  );
};

export default MenuPopupChapter;
