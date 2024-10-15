import { isJson } from "utils/isJson";
// import { API_URL } from "utils/secret";

export const studentExcelDownloadAsync = (payload) => {
  window.open(
    `${process.env.REACT_APP_BASE_URL}/studentExcelDownload?search=${
      payload.search || ""
    }&classes=${payload.classes || ""}&token=${
      isJson(localStorage.getItem("auth"))
        ? JSON.parse(localStorage.getItem("auth"))?.token
        : null
    }`,
    "_blank"
  );
};

export const attendanceReportDownloadAsync = (payload) => {
  window.open(
    `${process.env.REACT_APP_BASE_URL}/attendanceReportDownload?batchId=${
      payload.batchId || ""
    }&token=${
      isJson(localStorage.getItem("auth"))
        ? JSON.parse(localStorage.getItem("auth"))?.token
        : null
    }`,
    "_blank"
  );
};

export const BatchWiseEmployeeExcelDownloadAsync = (payload) => {
  window.open(
    `${
      process.env.REACT_APP_BASE_URL
    }/BatchWiseEmployeeExcelDownload?batchTypeId=${
      payload.batchTypeId || ""
    }&token=${
      isJson(localStorage.getItem("auth"))
        ? JSON.parse(localStorage.getItem("auth"))?.token
        : null
    }`,
    "_blank"
  );
};

export const contentExcelDownloadAsync = (payload) => {
  window.open(
    `${process.env.REACT_APP_BASE_URL}/contentExcelDownload?search=${
      payload.search || ""
    }&classes=${payload.classes || ""}&subject=${
      payload.subject || ""
    }&chapter=${payload.chapter || ""}&token=${
      isJson(localStorage.getItem("auth"))
        ? JSON.parse(localStorage.getItem("auth"))?.token
        : null
    }`,
    "_blank"
  );
};

export const topicExcelDownloadAsync = (payload) => {
  window.open(
    `${process.env.REACT_APP_BASE_URL}/topicExcelDownload?classes=${
      payload.classes || ""
    }&search=${payload.search || ""}&subject=${payload.subject || ""}&chapter=${
      payload.chapter || ""
    }&status=${payload.status || ""}&token=${
      isJson(localStorage.getItem("auth"))
        ? JSON.parse(localStorage.getItem("auth"))?.token
        : null
    }`,
    "_blank"
  );
};

export const BatchDetailsExcelDownloadAsync = (payload) => {
  window.open(
    `${process.env.REACT_APP_BASE_URL}/BatchDetailsExcelDownload?search=${
      payload.search || ""
    }&token=${
      isJson(localStorage.getItem("auth"))
        ? JSON.parse(localStorage.getItem("auth"))?.token
        : null
    }`,
    "_blank"
  );
};

export const TestReportsByBatchExcelDownloadAsync = (payload) => {
  window.open(
    `${process.env.REACT_APP_BASE_URL}/TestReportsByBatchExcelDownload?page=${
      payload.page || ""
    }&limit=${payload.limit || ""}&type=${payload.type || ""}&batchTypeId=${
      payload.batchTypeId || ""
    }&status=${payload.status || ""}&token=${
      isJson(localStorage.getItem("auth"))
        ? JSON.parse(localStorage.getItem("auth"))?.token
        : null
    }`,
    "_blank"
  );
};

export const TestReportsByUserIdExcelDownloadAsync = (payload) => {
  window.open(
    `${process.env.REACT_APP_BASE_URL}/TestReportsByUserIdExcelDownload?type=${
      payload.type || ""
    }&status=${payload.status || ""}&studentId=${
      payload.studentId || ""
    }&batchId=${payload.batchId || ""}&token=${
      isJson(localStorage.getItem("auth"))
        ? JSON.parse(localStorage.getItem("auth"))?.token
        : null
    }`,
    "_blank"
  );
};

export const batchWiseStudentExcelDownloadAsync = (payload) => {
  window.open(
    `${
      process.env.REACT_APP_BASE_URL
    }/batchWiseStudentExcelDownload?batchTypeId=${
      payload.batchTypeId || ""
    }&startdate=${payload.startdate || ""}&enddate=${
      payload.enddate || ""
    }&employeeCode=${payload.employeeCode || ""}&department=${
      payload.department || ""
    }&token=${
      isJson(localStorage.getItem("auth"))
        ? JSON.parse(localStorage.getItem("auth"))?.token
        : null
    }`,
    "_blank"
  );
};

export const pollReportExcelDownloadAsync = (payload) => {
  window.open(
    `${process.env.REACT_APP_BASE_URL}/pollReportExcelDownload?pollId=${
      payload.pollId || ""
    }}&token=${
      isJson(localStorage.getItem("auth"))
        ? JSON.parse(localStorage.getItem("auth"))?.token
        : null
    }`,
    "_blank"
  );
};

export const staffExcelDownloadAsync = (payload) => {
  window.open(
    `${process.env.REACT_APP_BASE_URL}/teacherExcelDownload?search=${
      payload.search
    }&department=${payload.department}&classes=${payload.classes}&token=${
      isJson(localStorage.getItem("auth"))
        ? JSON.parse(localStorage.getItem("auth"))?.token
        : null
    }`,
    "_blank"
  );
};

export const feedbackExcelDownloadAsync = (payload) => {
  window.open(
    `${
      process.env.REACT_APP_BASE_URL
    }/feedbackExcelDownload?search=${payload}&token=${
      isJson(localStorage.getItem("auth"))
        ? JSON.parse(localStorage.getItem("auth"))?.token
        : null
    }`,
    "_blank"
  );
};

//Scholarship Application  excel
export const scholarshipDownloadAsync = (payload) => {
  window.open(
    `${process.env.REACT_APP_BASE_URL}/scholarshipExcelDownload?search=${
      payload.search || ""
    }&classes=${payload.classes || ""}&token=${
      isJson(localStorage.getItem("auth"))
        ? JSON.parse(localStorage.getItem("auth"))?.token
        : null
    }`,
    "_blank"
  );
};

export const EnquiryExcelDownloadAsync = (payload) => {
  window.open(
    `${
      process.env.REACT_APP_BASE_URL
    }/enquiryExcelDownload?search=${payload}&token=${
      isJson(localStorage.getItem("auth"))
        ? JSON.parse(localStorage.getItem("auth"))?.token
        : null
    }`,
    "_blank"
  );
};
//
export const CityExcelDownloadAsync = (payload) => {
  window.open(
    `${process.env.REACT_APP_BASE_URL}/cityExcelDownload?state=${
      payload.state
    }&city=${payload.city}&token=${
      isJson(localStorage.getItem("auth"))
        ? JSON.parse(localStorage.getItem("auth"))?.token
        : null
    }`,
    "_blank"
  );
};

export const StateExcelDownloadAsync = (payload) => {
  window.open(
    `${
      process.env.REACT_APP_BASE_URL
    }/stateExcelDownload?search=${payload}&token=${
      isJson(localStorage.getItem("auth"))
        ? JSON.parse(localStorage.getItem("auth"))?.token
        : null
    }`,
    "_blank"
  );
};

// subject excel download
export const subjectExcelDownloadAsync = (payload) => {
  window.open(
    `${process.env.REACT_APP_BASE_URL}/subjectExcelDownload?search=${
      payload.search || ""
    }&classes=${payload.classes || ""}&token=${
      isJson(localStorage.getItem("auth"))
        ? JSON.parse(localStorage.getItem("auth"))?.token
        : null
    }`,
    "_blank"
  );
};

// Student Call Request
export const studentCallRequestExcelAsync = (payload) => {
  window.open(
    `${process.env.REACT_APP_BASE_URL}/requestCallExcelDownload?search=${
      payload.search || ""
    }&token=${
      isJson(localStorage.getItem("auth"))
        ? JSON.parse(localStorage.getItem("auth"))?.token
        : null
    }`,
    "_blank"
  );
};
