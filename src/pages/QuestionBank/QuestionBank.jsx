import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Typography,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import Iconify from "components/iconify";
import MenuPopupQuestionBank from "./components/MenuPopupQuestionBank";
import { _dificultylevel, columns } from "./utils";
import { PATH_DASHBOARD } from "routes/paths";
import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";
import CustomBreadcrumbs from "components/custom-breadcrumbs";
import { useSettingsContext } from "components/settings";
import CustomTable from "components/CustomTable";
import ReactHtmlParser from "react-html-parser";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestionBankAsync } from "redux/questionbank/questionbank.async";
import {
  getSubjectFilterAsync,
  getSubjectByClassIdFilterAsync,
  getChapterFilterAsync,
  getChapterBySubjectIdFilterAsync,
  getClassWithBoardFilterAsync,
} from "redux/filter/filter.async";
import _ from "lodash";
import AutoCompleteCustom from "components/AutoCompleteCustom/AutoCompleteCustom";
import { write, writeFile, utils } from "xlsx";
import excelDownload from "../../assets/excel/ExcelDownload.png";

export default function QuestionBank() {
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();
  const [openPopover, setOpenPopover] = useState(null);
  const [paginationpage, setPaginationpage] = useState(1);
  const [perPageNumber, setperPageNumber] = useState(10);
  const [questionBankInfo, setQuestionBankinfo] = useState("");
  const [searchClass, setSearchClass] = useState([]);
  const [searchSubject, setSearchSubject] = useState([]);
  const [searchChapter, setSearchChapter] = useState([]);
  const [getDifficultyLevel, setDifficultyLevel] = useState("");
  const [isFind, setIsFind] = useState(false);
  const { modulePermit } = useSelector((state) => state.menuPermission);

  const {
    filterLoader,
    subjectFilter,
    subjectByClassIdFilter,
    chapterFilter,
    ChapterBySubjectId,
    classWithBoardFilter,
  } = useSelector((state) => state.filterInfo);

  const { questionBankLoader, getAllquestions, getAllQuestionBank } =
    useSelector((state) => state.questionbank);
  const tabTitle = useSelector(
    (state) => state?.admin?.adminSetting?.siteTitle
  );

  const InitialQuestions = ({ pageNo, paginateNo, isFindManual, isReset }) => {
    if (pageNo && paginateNo) {
      setPaginationpage(pageNo);
      setperPageNumber(paginateNo);
    }
    let payload = {};
    if (isFind || isFindManual) {
      payload = {
        subject: searchSubject?.value,
        chapter: searchChapter?.value,
        difficultyLevel: getDifficultyLevel,
      };
    }
    if (isReset) {
      delete payload.subject;
      delete payload.chapter;
      delete payload.difficultyLevel;
    }
    dispatch(
      getAllQuestionBankAsync({
        page: pageNo || paginationpage,
        limit: paginateNo || perPageNumber,
        ...payload,
      })
    );
  };

  // useEffect(() => {
  //   dispatch(
  //     getAllQuestionBankAsync({
  //       page: "",
  //       limit: "",
  //       subject: "",
  //       chapter: "",
  //       classes: "",
  //       difficultyLevel: "",
  //     })
  //   );
  // }, []);

  // RESET FILTER
  const resetFilter = () => {
    setIsFind(false);
    setSearchSubject([]);
    setSearchChapter([]);
    setDifficultyLevel("");
    InitialQuestions({
      pageNo: 1,
      paginateNo: 10,
      isReset: true,
    });
  };

  // POPUPOVER
  const handleClosePopover = () => {
    setOpenPopover(null);
  };
  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };
  // PAGINATION
  const handlePageChange = (page) => {
    setPaginationpage(page);
  };
  const handlePerRowsChange = async (newPerPage, page) => {
    setperPageNumber(newPerPage);
  };

  useEffect(() => {
    InitialQuestions({});
  }, [paginationpage, perPageNumber]);

  useEffect(() => {
    // dispatch(getClassWithBoardFilterAsync({}));
    dispatch(getSubjectFilterAsync({}));
    dispatch(getChapterFilterAsync({}));
  }, []);

  // useEffect(() => {
  //   dispatch(getSubjectByClassIdFilterAsync({ classId: [searchClass?.value] }));
  // }, [searchClass]);

  useEffect(() => {
    dispatch(
      getChapterBySubjectIdFilterAsync({ subjectId: searchSubject?.value })
    );
  }, [searchSubject]);

  const fetchDataAndConvertToXLSX = async () => {
    // dispatch(
    //   getAllQuestionBankAsync({
    //     page: "",
    //     limit: "",
    //     subject: "",
    //     chapter: "",
    //     classes: "",
    //     difficultyLevel: "",
    //   })
    // );
    const data = getAllQuestionBank?.data;

    if (!data || data.length === 0) {
      console.log("No data available.");
      return;
    }

    const worksheet = utils.aoa_to_sheet([
      Object.keys(data[0]),
      ...data.map(Object.values),
    ]);

    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const xlsxBuffer = write(workbook, { type: "buffer", bookType: "xlsx" });

    const blob = new Blob([xlsxBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "question-bank.xlsx";
    link.target = "_blank";

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <Container maxWidth={themeStretch ? false : false}>
      <Helmet>
        <title>Question Bank | {`${tabTitle}`} </title>
      </Helmet>
      <CustomBreadcrumbs
        // heading="Question Bank"
        links={[{ name: "Question Bank", href: "" }, { name: "Question List" }]}
        action={
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Box>
              {/*<FormControl>
                <AutoCompleteCustom
                  size="small"
                  sx={{ width: 150, mr: 2, mb: { xs: 1, md: 0 } }}
                  loading={filterLoader}
                  options={_.map(classWithBoardFilter, (ev) => {
                    return {
                      label: `${ev.className} (${ev.board})`,
                      value: ev.id,
                    };
                  })}
                  value={searchClass}
                  onChange={(event, value) => setSearchClass(value)}
                  label="Class"
                />
                </FormControl> */}
              <FormControl>
                <AutoCompleteCustom
                  size="small"
                  sx={{ width: 150, mr: 2, mb: { xs: 1, md: 0 } }}
                  loading={filterLoader}
                  options={
                    searchClass?.value
                      ? _.map(subjectByClassIdFilter, (ev) => {
                          return { label: `${ev.subject}`, value: ev.id };
                        })
                      : _.map(subjectFilter, (ev) => {
                          return { label: `${ev.subjectName}`, value: ev.id };
                        })
                  }
                  value={searchSubject}
                  onChange={(event, value) => setSearchSubject(value)}
                  label="Subject"
                />
              </FormControl>
              <FormControl>
                <AutoCompleteCustom
                  size="small"
                  sx={{ width: 150, mr: 2, mb: { xs: 1, md: 0 } }}
                  loading={filterLoader}
                  options={
                    searchSubject?.value
                      ? _.map(ChapterBySubjectId, (ev) => {
                          return { label: `${ev.name}`, value: ev.id };
                        })
                      : _.map(chapterFilter, (ev) => {
                          return { label: `${ev.chapterName}`, value: ev.id };
                        })
                  }
                  value={searchChapter}
                  onChange={(event, value) => setSearchChapter(value)}
                  label="Chapter"
                />
              </FormControl>
              <FormControl size="small">
                <InputLabel size="small">Difficulty Level</InputLabel>
                <Select
                  size="small"
                  sx={{ width: 150, mr: 2, mb: { xs: 1, md: 0 } }}
                  label="Difficulty Level"
                  value={getDifficultyLevel}
                  onChange={(e) => setDifficultyLevel(e.target.value)}
                >
                  <MenuItem value="">Select Difficulty Level</MenuItem>
                  {_.map(_dificultylevel, (evv) => {
                    return <MenuItem value={evv.value}>{evv.label}</MenuItem>;
                  })}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                sx={{ borderRadius: "7px", mr: 1, mb: { xs: 1, md: 0 } }}
                onClick={() => {
                  setIsFind(true);
                  InitialQuestions({
                    pageNo: 1,
                    paginateNo: 10,
                    isFindManual: true,
                  });
                }}
              >
                Filter
              </Button>
              <Button
                variant="contained"
                sx={{ borderRadius: "7px", mr: 1, mb: { xs: 1, md: 0 } }}
                onClick={resetFilter}
              >
                <AutorenewRoundedIcon />
              </Button>
              <Button
                sx={{ borderRadius: "7px", mr: 1, mb: { xs: 1, md: 0 } }}
                to={PATH_DASHBOARD.createquestionbank}
                component={RouterLink}
                variant="contained"
                disabled={!Boolean(modulePermit?.add)}
              >
                <AddIcon />
              </Button>
            </Box>
            {/*<Box>
              <Button
                onClick={() => fetchDataAndConvertToXLSX()}
                sx={{
                  "&:hover": { cursor: "pointer", backgroundColor: "#fff" },
                }}
              >
                <img
                  src={excelDownload}
                  alt="Download Excel"
                  width="50px"
                  height="50px"
                  borderRadius="40px"
                />
              </Button>
              <Button
                sx={{ borderRadius: "7px", mr: 1, mb: { xs: 1, md: 0 } }}
                variant="contained"
                component={RouterLink}
                to={PATH_DASHBOARD.questionbulkupload}
              >
                <FileUploadIcon />
              </Button>
              </Box> */}
          </Box>
        }
      />
      <CustomTable
        columnheight="30px"
        loader={questionBankLoader}
        data={getAllQuestionBank?.data}
        columns={columns({
          openPopover,
          handleOpenPopover,
          setQuestionBankinfo,
          paginationpage,
        })}
        totalcount={getAllQuestionBank?.count}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        expandableRows={true}
        expandableRowsComponent={ExpandedComponent}
      />
      <MenuPopupQuestionBank
        {...{
          openPopover,
          handleClosePopover,
          questionBankInfo,
          paginationpage,
          perPageNumber,
        }}
      />
    </Container>
  );
}

const ExpandedComponent = ({ data }) => {
  const config = {
    loader: { load: ["[tex]/html"] },
    tex: {
      packages: { "[+]": ["html"] },
      inlineMath: [["$", "$"]],
      displayMath: [["$$", "$$"]],
    },
    onLoad: () => {},
  };
  return (
    <Box
      sx={{
        m: 3,
      }}
    >
      <Box display="flex" alignItems="center" sx={{ mb: "20px" }}>
        <Typography
          sx={{
            ml: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: "600", marginRight: "10px" }}>
            Questions:{"  "}
          </span>
          <MathJaxContext config={config}>
            <MathJax>{ReactHtmlParser(data?.question)}</MathJax>
          </MathJaxContext>
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            my: "8px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#dff3ea",
              width: "30px",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            A
          </Box>
          <MathJaxContext config={config}>
            <MathJax style={{ display: "flex", alignItems: "center" }}>
              {ReactHtmlParser(data?.option1)}
            </MathJax>
          </MathJaxContext>
        </Typography>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            my: "8px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#dff3ea",
              width: "30px",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            B
          </Box>
          <MathJaxContext config={config}>
            <MathJax style={{ display: "flex", alignItems: "center" }}>
              {ReactHtmlParser(data?.option2)}
            </MathJax>
          </MathJaxContext>
        </Typography>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            my: "8px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#dff3ea",
              width: "30px",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            C
          </Box>
          <MathJaxContext config={config}>
            <MathJax style={{ display: "flex", alignItems: "center" }}>
              {ReactHtmlParser(data?.option3)}
            </MathJax>
          </MathJaxContext>
        </Typography>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            my: "8px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#dff3ea",
              width: "30px",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            D
          </Box>
          <MathJaxContext config={config}>
            <MathJax style={{ display: "flex", alignItems: "center" }}>
              {ReactHtmlParser(data?.option4)}
            </MathJax>
          </MathJaxContext>
        </Typography>
      </Box>
    </Box>
  );
};
