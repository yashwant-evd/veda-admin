import { IconButton } from "@mui/material";
import Iconify from "components/iconify/Iconify";
import Label from "components/label/Label";
import { capitalize } from "lodash";
import ReactHtmlParser from "react-html-parser";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

export const columns = ({
  openPopover,
  handleOpenPopover,
  setQuestionBankinfo,
  paginationpage,
}) => {
  const columnValues = [
    {
      name: "Sr. No.",
      selector: (row, index) =>
        paginationpage === 1
          ? index + 1
          : index === 9
          ? `${paginationpage}0`
          : `${paginationpage - 1}${index + 1}`,
      width: "100px",
    },
    {
      name: "Difficulty Level",
      selector: (data) => {
        return (
          <Label
            variant="soft"
            color={_dificulty[data.difficultyLevel] || ""}
            sx={{ textTransform: "capitalize" }}
          >
            {capitalize(data?.difficultyLevel)}
          </Label>
        );
      },
    },
    {
      name: "Question",
      cell: (data) => {
        return (
          <Tooltip title={ReactHtmlParser(data?.question)}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {ReactHtmlParser(data?.question.slice(0, 100))}
            </Typography>
          </Tooltip>
        );
      },
      width: "250px",
    },
    {
      name: "Language",
      selector: (data) => data.language,
    },
    {
      name: "Correct Answer",
      selector: (data) => ReactHtmlParser(data.answer),
    },
    {
      name: "Course",
      cell: (data) => {
        return (
          <Tooltip title={ReactHtmlParser(data?.course)}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {ReactHtmlParser(data?.course.slice(0, 100))}
            </Typography>
          </Tooltip>
        );
      },
      width: "180px",
    },
    {
      name: "Chapter",
      selector: (data) => data.chapter,
    },
    {
      name: "Topic",
      selector: (data) => (
        <Tooltip title={data.topic}>
          <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
            {data.topic}
          </Typography>
        </Tooltip>
      ),
      width: "150px",
    },
    {
      name: "Created By",
      selector: (data) =>
        data?.createdByName
          ? `${data?.createdByName} (${data.createdByRole})`
          : "N/A",
    },
    {
      name: "Actions",
      selector: (row) => {
        return (
          <IconButton
            color={openPopover ? "inherit" : "default"}
            onClick={(e) => {
              handleOpenPopover(e);
              setQuestionBankinfo(row);
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

const _dificulty = {
  Easy: "success",
  Medium: "warning",
  Hard: "error",
};

export const _dificultylevel = [
  {
    value: "Easy",
    label: "Easy",
  },
  {
    value: "Medium",
    label: "Medium",
  },
  {
    value: "Hard",
    label: "Hard",
  },
];
