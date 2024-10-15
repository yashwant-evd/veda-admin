function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/app";

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
  loginUnprotected: path(ROOTS_AUTH, "/login-unprotected"),
  registerUnprotected: path(ROOTS_AUTH, "/register-unprotected"),
  verify: path(ROOTS_AUTH, "/verify"),
  resetPassword: path(ROOTS_AUTH, "/reset-password"),
  newPassword: path(ROOTS_AUTH, "/new-password"),
  // changePassword: path(ROOTS_AUTH, "/change-password"),
};

export const PATH_PAGE = {
  comingSoon: "/coming-soon",
  maintenance: "/maintenance",
  pricing: "/pricing",
  payment: "/payment",
  about: "/about-us",
  contact: "/contact-us",
  faqs: "/faqs",
  page403: "/403",
  page404: "/404",
  page500: "/500",
  components: "/components",
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  app: path(ROOTS_DASHBOARD, "/dashboard"),
  changePassword: path(ROOTS_DASHBOARD, "/change-password"),

  // COURSE
  courses: path(ROOTS_DASHBOARD, "/master/course"),
  createcourse: path(ROOTS_DASHBOARD, "/master/course/create"),
  editcourse: path(ROOTS_DASHBOARD, "/master/course/edit"),
  // BOARD
  board: path(ROOTS_DASHBOARD, "/master/board"),
  createboard: path(ROOTS_DASHBOARD, "/master/board/create"),
  editboard: path(ROOTS_DASHBOARD, "/master/board/edit"),
  // CLASS
  class: path(ROOTS_DASHBOARD, "/master/class"),
  createclass: path(ROOTS_DASHBOARD, "/master/class/create"),
  editclass: path(ROOTS_DASHBOARD, "/master/class/edit"),

  // BATCH TYPE
  batchtype: path(ROOTS_DASHBOARD, "/master/batch-type"),
  createbatchtype: path(ROOTS_DASHBOARD, "/master/batch-type/create"),
  editbatchtype: path(ROOTS_DASHBOARD, "/master/batch-type/edit"),
  uploadBulkStudent: path(
    ROOTS_DASHBOARD,
    "/master/batch-type/bulk-upload-staff"
  ),
  addStudent: path(ROOTS_DASHBOARD, "/master/batch-type/staff/create"),
  assignStaff: path(ROOTS_DASHBOARD, "/master/batch-type/batch/assign"),
  assignTrainer: path(ROOTS_DASHBOARD, "/master/batch-type/trainer/assign"),
  editStudentinBatch: path(ROOTS_DASHBOARD, "/master/batch-type/staff/edit"),
  viewProfile: path(ROOTS_DASHBOARD, "/master/batch-type/staff/profile"),

  // BATCH DATE
  batchdate: path(ROOTS_DASHBOARD, "/master/batch-date"),
  createbatchdate: path(ROOTS_DASHBOARD, "/master/batch-date/create"),
  editbatchdate: path(ROOTS_DASHBOARD, "/master/batch-date/edit"),
  // SUBJECT
  subject: path(ROOTS_DASHBOARD, "/master/subject"),
  createsubject: path(ROOTS_DASHBOARD, "/master/subject/create"),
  editsubject: path(ROOTS_DASHBOARD, "/master/subject/edit"),
  // CHAPTER
  chapter: path(ROOTS_DASHBOARD, "/master/chapter"),
  createchapter: path(ROOTS_DASHBOARD, "/master/chapter/create"),
  editchapter: path(ROOTS_DASHBOARD, "/master/chapter/edit"),
  // STATE
  state: path(ROOTS_DASHBOARD, "/master/state"),
  // CITY
  city: path(ROOTS_DASHBOARD, "/master/city"),
  // Category
  grievancescategory: path(ROOTS_DASHBOARD, "/master/category"),
  // SubCategory
  grievancessubcategory: path(ROOTS_DASHBOARD, "/master/subcategory"),
  // WANT TO BE
  wanttobe: path(ROOTS_DASHBOARD, "/master/want-to-be"),
  createwanttobe: path(ROOTS_DASHBOARD, "/master/want-to-be/create"),
  editwanttobe: path(ROOTS_DASHBOARD, "/master/want-to-be/edit"),

  //Images-Bookmark
  imagesbookmark: path(ROOTS_DASHBOARD, "/master/images-bookmark"),

  // STAFF
  staff: path(ROOTS_DASHBOARD, "/trainer-manager/trainer-list"),
  createstaff: path(ROOTS_DASHBOARD, "/trainer-manager/trainer/create"),
  editstaff: path(ROOTS_DASHBOARD, "/trainer-manager/trainer/edit"),
  bulkuploadstaff: path(
    ROOTS_DASHBOARD,
    "/trainer-manager/bulk-upload-trainer"
  ),
  staffattendance: path(ROOTS_DASHBOARD, "/trainer-manager/trainer-attendance"),

  // BANNER
  banner: path(ROOTS_DASHBOARD, "/master/banner"),
  createbanner: path(ROOTS_DASHBOARD, "/master/banner/create"),
  editbanner: path(ROOTS_DASHBOARD, "/master/banner/edit"),
  // NOTICE
  notice: path(ROOTS_DASHBOARD, "/notice"),
  createnotice: path(ROOTS_DASHBOARD, "/notice/create"),
  createPoll: path(ROOTS_DASHBOARD, "/poll/create"),
  editPoll: path(ROOTS_DASHBOARD, "/poll/edit"),
  editnotice: path(ROOTS_DASHBOARD, "/notice/edit"),
  // REVISION
  revision: path(ROOTS_DASHBOARD, "/revision"),
  createrevision: path(ROOTS_DASHBOARD, "/revision/create"),
  editrevision: path(ROOTS_DASHBOARD, "/revision/edit"),
  editrevision: path(ROOTS_DASHBOARD, "/revision/edit"),
  uploadbulk: path(ROOTS_DASHBOARD, "/revision/revision-bulkupload"),
  // QUESTION BANK
  questionbank: path(
    ROOTS_DASHBOARD,
    "/questionbank/questionbank-singleupload"
  ),
  createquestionbank: path(ROOTS_DASHBOARD, "/questionbank/create"),
  editquestionbank: path(ROOTS_DASHBOARD, "/questionbank/edit"),
  viewquestionbank: path(ROOTS_DASHBOARD, "/questionbank"),
  questionbulkupload: path(
    ROOTS_DASHBOARD,
    "/questionbank/questionbank-bulkupload"
  ),
  // STUDENT
  student: path(ROOTS_DASHBOARD, "/staff-manager/staff-list"),
  profileStudent: path(ROOTS_DASHBOARD, "/staff-manager/staff/profile"),
  createStudent: path(ROOTS_DASHBOARD, "/staff-manager/staff/create"),
  editStudent: path(ROOTS_DASHBOARD, "/staff-manager/staff/edit"),
  ratings: path(ROOTS_DASHBOARD, "/staff-manager/ratings"),
  StudentAttendance: path(ROOTS_DASHBOARD, "/staff-manager/staff-attendance"),
  studentbulkupload: path(ROOTS_DASHBOARD, "/staff-manager/staff/bulk-upload"),
  StudentRequest: path(ROOTS_DASHBOARD, "/staff-manager/staff-request"),
  feedback: path(ROOTS_DASHBOARD, "/staff-manager/feedback"),
  order: path(ROOTS_DASHBOARD, "/staff-manager/order"),
  payment: path(ROOTS_DASHBOARD, "/staff-manager/payment"),

  // SYLLABUS TOPIC
  topic: path(ROOTS_DASHBOARD, "/syllabus/topic"),
  createtopic: path(ROOTS_DASHBOARD, "/syllabus/topic/create"),
  edittopic: path(ROOTS_DASHBOARD, "/syllabus/topic/edit"),
  // SYLLABUS CONTENT
  content: path(ROOTS_DASHBOARD, "/syllabus/content"),
  createcontent: path(ROOTS_DASHBOARD, "/syllabus/content/create"),
  editcontent: path(ROOTS_DASHBOARD, "/syllabus/content/edit"),
  bulkupload: path(ROOTS_DASHBOARD, "/syllabus/bulk-upload-topic"),
  bulkuploadChapter: path(
    ROOTS_DASHBOARD,
    "/master/chapter/bulk-upload-chapter"
  ),
  bulkuploadvideo: path(ROOTS_DASHBOARD, "/syllabus/bulk-upload-video"),
  // Video Manager Bulk Hide For Now
  // videoManagerBulk: path(ROOTS_DASHBOARD, "/syllabus/Createvideomanagerbulk/create"),
  // DOUBTS
  doubts: path(ROOTS_DASHBOARD, "/doubts"),
  // EVENTS
  event: path(ROOTS_DASHBOARD, "/event"),
  createevent: path(ROOTS_DASHBOARD, "/event/create"),
  editevent: path(ROOTS_DASHBOARD, "/event/edit"),
  // SHORTS
  short: path(ROOTS_DASHBOARD, "/short"),
  createshort: path(ROOTS_DASHBOARD, "/short/create"),
  editshort: path(ROOTS_DASHBOARD, "/short/edit"),
  // SCHOLORSHIP
  scholarship: path(ROOTS_DASHBOARD, "/scholarship/scholarship-create"),
  createscholarship: path(ROOTS_DASHBOARD, "/scholarship/create"),
  editscholarship: path(ROOTS_DASHBOARD, "/scholarship/edit"),
  scholarshipclass: path(ROOTS_DASHBOARD, "/scholarship/scholarship-class"),
  createscholarshipclass: path(
    ROOTS_DASHBOARD,
    "/scholarship/scholarship-class/create"
  ),
  editscholarshipclass: path(
    ROOTS_DASHBOARD,
    "/scholarship/scholarship-class/edit"
  ),

  // scholarship test
  scholarshiptest: path(ROOTS_DASHBOARD, "/scholarshiptest/scholarship-test"),
  createscholarshiptest: path(ROOTS_DASHBOARD, "/scholarshiptest/create"),
  editscholarshiptest: path(ROOTS_DASHBOARD, "/scholarshiptest/edit"),

  //tophighlight
  tophighlight: path(ROOTS_DASHBOARD, "/scholarship/top-highlight"),
  createhighlight: path(ROOTS_DASHBOARD, "/scholarship/top-highlight/create"),
  edithighlight: path(ROOTS_DASHBOARD, "/scholarship/top-highlight/edit"),
  // FAQ
  faq: path(ROOTS_DASHBOARD, "/faq"),
  createfaq: path(ROOTS_DASHBOARD, "/faq/create"),
  editfaq: path(ROOTS_DASHBOARD, "/faq/edit"),
  // ACTIVITY
  activity: path(ROOTS_DASHBOARD, "/activity"),
  // ONLY FOR YOU
  onlyforyou: path(ROOTS_DASHBOARD, "/only-for-you"),
  createonlyforyou: path(ROOTS_DASHBOARD, "/only-for-you/create"),
  editonlyforyou: path(ROOTS_DASHBOARD, "/only-for-you/edit"),
  // ASSIGNMENT
  assignment: path(ROOTS_DASHBOARD, "/assignment/assignment-create"),
  createassignment: path(ROOTS_DASHBOARD, "/assignment/create"),
  editassignment: path(ROOTS_DASHBOARD, "/assignment/edit"),
  assignmentresult: path(ROOTS_DASHBOARD, "/assignment/assignment-result"),
  editassignmentresult: path(
    ROOTS_DASHBOARD,
    "/assignment/assignment-result/edit"
  ),
  offlinemode: path(ROOTS_DASHBOARD, "/assignment/assignment-offline-mode"),
  onlinemode: path(ROOTS_DASHBOARD, "/assignment/assignment-online-mode"),
  // PACKAGE
  package: path(ROOTS_DASHBOARD, "/subscription/package-master"),
  createpackage: path(ROOTS_DASHBOARD, "/subscription/package-master/create"),
  editpackage: path(ROOTS_DASHBOARD, "/subscription/package-master/edit"),
  packagesubscription: path(ROOTS_DASHBOARD, "/subscription/package-details"),
  createpackagesubscription: path(
    ROOTS_DASHBOARD,
    "/subscription/package-details/create"
  ),
  editpackagesubscription: path(
    ROOTS_DASHBOARD,
    "/subscription/package-details/edit"
  ),
  SubscriptionList: path(ROOTS_DASHBOARD, "/subscription/Subscription-plan"),
  createsubscriptionList: path(
    ROOTS_DASHBOARD,
    "/subscription/Subscription-plan/create"
  ),
  editsubscriptionList: path(
    ROOTS_DASHBOARD,
    "/subscription/Subscription-plan/edit"
  ),
  // MENTORSHIP
  feature: path(ROOTS_DASHBOARD, "/mentorship/feature"),
  createfeature: path(ROOTS_DASHBOARD, "/mentorship/feature/create"),
  editfeature: path(ROOTS_DASHBOARD, "/mentorship/feature/edit"),
  whyyouneed: path(ROOTS_DASHBOARD, "/mentorship/why-you-need"),
  createwhyyouneed: path(ROOTS_DASHBOARD, "/mentorship/why-you-need/create"),
  editwhyyouneed: path(ROOTS_DASHBOARD, "/mentorship/why-you-need/edit"),
  howithelp: path(ROOTS_DASHBOARD, "/mentorship/how-it-help"),
  createhowithelp: path(ROOTS_DASHBOARD, "/mentorship/how-it-help/create"),
  edithowithelp: path(ROOTS_DASHBOARD, "/mentorship/how-it-help/edit"),
  mentorshippackage: path(ROOTS_DASHBOARD, "/mentorship/mentorship-package"),
  // GENERAL SETTINGS
  instruction: path(ROOTS_DASHBOARD, "/general-setting/instruction-setting"),
  paymentsetting: path(ROOTS_DASHBOARD, "/general-setting/payment-setting"),
  sitesetting: path(ROOTS_DASHBOARD, "/general-setting/site-setting"),
  indivisualsetting: path(
    ROOTS_DASHBOARD,
    "/general-setting/indivisual-setting"
  ),
  zoomsetting: path(ROOTS_DASHBOARD, "/general-setting/zoom-setting"),
  createzoomsetting: path(
    ROOTS_DASHBOARD,
    "/general-setting/zoom-setting/create"
  ),
  editzoomsetting: path(ROOTS_DASHBOARD, "/general-setting/zoom-setting/edit"),

  firebasesetting: path(ROOTS_DASHBOARD, "/general-setting/fire-base-setting"),

  // GALLARY MANAGER
  gallery: path(ROOTS_DASHBOARD, "/gallery"),
  creategallery: path(ROOTS_DASHBOARD, "/gallery/create"),
  editgallery: path(ROOTS_DASHBOARD, "/gallery/edit"),
  // SCHEDULE
  schedule: path(ROOTS_DASHBOARD, "/schedule"),
  createschedule: path(ROOTS_DASHBOARD, "/schedule/create"),
  // TEST
  testreport: path(ROOTS_DASHBOARD, "/test/test-report"),
  testquestion: path(ROOTS_DASHBOARD, "/test/test-questions"),
  createtest: path(ROOTS_DASHBOARD, "/test/test-questions/create"),
  studentowntest: path(ROOTS_DASHBOARD, "/test/staff-own-test"),
  questions: path(ROOTS_DASHBOARD, "/test/test-questions/questions"),

  // LIVE
  liveclass: path(ROOTS_DASHBOARD, "/academics/live-class"),
  createlive: path(ROOTS_DASHBOARD, "/academics/live-class/create"),
  editlive: path(ROOTS_DASHBOARD, "/academics/live-class/edit"),
  history: path(ROOTS_DASHBOARD, "/academics/history"),
  dobtdemorequest: path(ROOTS_DASHBOARD, "/academics/doubt-demo-request"),
  // SCHOLARSHIP APPLICATION
  scholorshipapplication: path(ROOTS_DASHBOARD, "/scholorship-application"),
  scholarshiptestreport: path(
    ROOTS_DASHBOARD,
    "/scholorship-application/scholarship-testReport"
  ),
  // ENQUIRY
  enquiry: path(ROOTS_DASHBOARD, "/enquiry"),
  // STATE
  roles: path(ROOTS_DASHBOARD, "/master/roles"),
  // Quiz
  quizreportlist: path(ROOTS_DASHBOARD, "/quiz/quiz-report"),
  quizreportview: path(ROOTS_DASHBOARD, "/quiz/quiz-report/view"),

  //Grievances
  grievances: path(ROOTS_DASHBOARD, "/grievances"),
  // quizreportview: path(ROOTS_DASHBOARD, "/quiz/quiz-report/view"),

  //poll
  poll: path(ROOTS_DASHBOARD, "/poll"),

  //language
  language: path(ROOTS_DASHBOARD, "/language"),
  createLanguage: path(ROOTS_DASHBOARD, "/language/create"),
  editLanguage: path(ROOTS_DASHBOARD, "/language/edit"),

  //batchwise details
  Batchwisedetails: path(ROOTS_DASHBOARD, "/batchwisedetails"),
  batchTestReport: path(ROOTS_DASHBOARD, "/batchwisedetails/test-report"),
  permission: path(ROOTS_DASHBOARD, "/master/roles/permission"),
  zoommeeting: path(ROOTS_DASHBOARD, "/meeting"),
  viewBatchwiseProfile: path(
    ROOTS_DASHBOARD,
    "/batchwisedetails/staff/profile"
  ),

  //Attendance
  attendance: path(ROOTS_DASHBOARD, "/attendance"),

  // Student Reports
  StudentReports: path(ROOTS_DASHBOARD, "/reports"),
};
