import { MenuItem } from "@mui/material";
import MenuPopover from "components/menu-popover/MenuPopover";
import Iconify from "components/iconify/Iconify";
import { useNavigate } from "react-router";
import { PATH_DASHBOARD } from "routes/paths";

const MenuPopupChapter = ({ openPopover, handleClosePopover, reportInfo }) => {
  const navigate = useNavigate();

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
            navigate(
              `${PATH_DASHBOARD.batchTestReport}/${reportInfo.data[0].id}?testId=${reportInfo.data[0].testId}&studentId=${reportInfo.data[0].studentId}&studentStartId=${reportInfo.data[0].id}`
            );
          }}
        >
          <Iconify icon="eva:eye-fill" />
          View
        </MenuItem>
      </MenuPopover>
    </>
  );
};

export default MenuPopupChapter;
