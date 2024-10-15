import { IconButton } from "@mui/material";
import Iconify from "components/iconify/Iconify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Inf from "assets/ImageStudent/inf.jpg";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

export const doubtscolumns = ({
  openPopover,
  handleOpenPopover,
  setreplyinfo,
  paginationpage,
}) => {
  const columnValues = [
    {
      name: "Sl No.",
      selector: (row, index) =>
        paginationpage === 1
          ? index + 1
          : index === 9
          ? `${paginationpage}0`
          : `${paginationpage - 1}${index + 1}`,
      width: "80px",
    },
    {
      name: "Image",
      selector: (row) => {
        return (
          <LazyLoadImage
            alt={row.question}
            effect="blur"
            src={row.image == null ? Inf : row.image}
            // src={row.image}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "40px",
              objectFit: "cover",
            }}
          />
        );
      },
      width: "140px",
    },
    {
      name: "Student",
      cell: (row) => {
        return (
          <Tooltip title={row.user}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row.user}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      name: "Subject",
      cell: (row) => {
        return (
          <Tooltip title={row.subject}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row.subject}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      name: "Chapter",
      cell: (row) => {
        return (
          <Tooltip title={row.chapter}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row.chapter}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      name: "Question",
      cell: (row) => {
        return (
          <Tooltip title={row.question}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row.question}
            </Typography>
          </Tooltip>
        );
      },
      width: "250px",
    },
    {
      name: "Actions",
      selector: (row) => {
        return (
          <IconButton
            color={openPopover ? "inherit" : "default"}
            onClick={(e) => {
              setreplyinfo(row);
              handleOpenPopover(e);
            }}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        );
      },
    },
  ];

  return columnValues;
};
