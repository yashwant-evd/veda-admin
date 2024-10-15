import { Navigate, useRoutes } from "react-router-dom";
import GuestGuard from "auth/GuestGuard";
import CompactLayout from "layouts/compact";
import DashboardLayout from "layouts/dashboard";
import BlankLayout from "layouts/BlankLayout";
import {
  Banner,
  Batch,
  BatchDate,
  Board,
  ChangePassword,
  Chapter,
  City,
  Class,
  Content,
  Course,
  CreateBanner,
  CreateBatch,
  CreateBatchDate,
  CreateBoard,
  CreateChapter,
  CreateClass,
  CreateContent,
  CreateCourse,
  CreateFeature,
  CreateGallery,
  CreateHowItHelps,
  CreateLiveClass,
  CreatePackage,
  CreatePakacgeSubscription,
  CreateShorts,
  CreateStaff,
  CreateSubject,
  CreateSubscriptionList,
  CreateTopic,
  CreateWantToBe,
  CreateWhyYouNeed,
  Dashboard,
  Doubts,
  DoubtsReply,
  Enquiry,
  Feature,
  Gallery,
  HowItHelps,
  Instructions,
  LiveClass,
  Login,
  NewPassword,
  Orders,
  Package,
  PackageSubscription,
  PackageSubscriptionList,
  Page404,
  PaymentSettings,
  Payments,
  Permission,
  ResetPassword,
  Schedule,
  CreateSchedule,
  ScholarshipApplication,
  Shorts,
  SiteSettings,
  State,
  Subject,
  Topic,
  VerifyCode,
  WantToBe,
  WhyYouNeed,
  ZoomMeeting,
  CreateFaq,
  Faq,
  CreateOnlyForYou,
  OnlyForYou,
  CreateStudent,
  StudentProfile,
  StudentAttendance,
  QuestionBulkUpload,
  Notice,
  CreateNotice,
  CreatePoll,
  CreateLanguage,
  EditLanguage,
  Revision,
  CreateRevision,
  UploadBulkRevision,
  TestReportList,
  TestReportId,
  TestQuestion,
  QuestionBank,
  CreateQuestionBank,
  TestQuestionView,
  Scholarship,
  CreateScholarship,
  ScholarshipClass,
  CreateScholarshipClass,
  HistoryLive,
  Assignment,
  CreateAssignment,
  AssignmentResult,
  DoubtDemoRequest,
  Activity,
  BulkUploadStudent,
  IndivisualSetting,
  Students,
  StudentRequest,
  Roles,
  Feedback,
  // CreateTest,
  Staff,
  BulkUploadStaff,
  QuizReportList,
  QuizReportId,
  TopHighlight,
  CreateHighlight,
  Offline,
  Online,
  BulkTopic,
  StaffAttendance,
  Questions,
  BulkVideo,
  StudentOwnTest,
  StudentOwnTestId,
  Ratings,
  MentorshipPackage,
  ZoomSetting,
  FireBaseSetting,
  CreateZoomSetting,
  ScholarshipTest,
  CreateScholarshipTest,
  ImagesBookmark,
  ScholarshipTestReport,
  Category,
  SubCategory,
  GrievancesList,
  PollsList,
  BatchList,
  LanguageList,
  CreateVideoManagerBulk,
  ChapterBulkUpload,
  BulkUploadStudentInBatch,
  StudentReports,
  CreateStudentinBatch,
  StudentProfileInBatch,
  StudentProfileInBatchDetails,
  AssignStaffinBatch,
  AssignTrainerinBatch,
  Attendance,
} from "./elements";
import AuthMiddleware from "layouts/Middleware/AuthMiddleware";
import NavigateMiddleware from "layouts/Middleware/NavigateMiddleware";
import RoutePermissionMiddleware from "layouts/Middleware/RoutePermissionMiddleware";

export default function Router() {
  return useRoutes([
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          element: <CompactLayout />,
          children: [
            { path: "reset-password", element: <ResetPassword /> },
            { path: "new-password", element: <NewPassword /> },
            { path: "verify", element: <VerifyCode /> },
          ],
        },
      ],
    },
    {
      path: "app",
      element: (
        <AuthMiddleware>
          <NavigateMiddleware>
            <RoutePermissionMiddleware>
              <DashboardLayout />
            </RoutePermissionMiddleware>
          </NavigateMiddleware>
        </AuthMiddleware>
      ),
      children: [
        { path: "dashboard", element: <Dashboard /> },

        // COURSE
        { path: "master/course", element: <Course /> },
        { path: "master/course/create", element: <CreateCourse /> },
        { path: "master/course/edit/:id", element: <CreateCourse /> },

        //Attendance
        { path: "attendance", element: <Attendance /> },

        // BOARD
        { path: "master/board", element: <Board /> },
        { path: "master/board/create", element: <CreateBoard /> },
        { path: "master/board/edit/:id", element: <CreateBoard /> },
        // CLASS
        { path: "master/class", element: <Class /> },
        { path: "master/class/create", element: <CreateClass /> },
        { path: "master/class/edit/:id", element: <CreateClass /> },

        // BATCH TYPE
        { path: "master/batch-type", element: <Batch /> },
        { path: "master/batch-type/create", element: <CreateBatch /> },
        { path: "master/batch-type/edit/:id", element: <CreateBatch /> },
        {
          path: "master/batch-type/bulk-upload-staff/:batchId",
          element: <BulkUploadStudentInBatch />,
        },
        {
          path: "master/batch-type/staff/create/:batchId",
          element: <CreateStudentinBatch />,
        },
        {
          path: "master/batch-type/batch/assign/:batchId",
          element: <AssignStaffinBatch />,
        },
        {
          path: "master/batch-type/trainer/assign/:batchId",
          element: <AssignTrainerinBatch />,
        },
        {
          path: "master/batch-type/staff/edit/:id",
          element: <CreateStudentinBatch />,
        },
        {
          path: "master/batch-type/staff/profile/:id",
          element: <StudentProfileInBatch />,
        },
        {
          path: "batchwisedetails/staff/profile/:id",
          element: <StudentProfileInBatchDetails />,
        },

        // BATCH DATE
        { path: "master/batch-date", element: <BatchDate /> },
        { path: "master/batch-date/create", element: <CreateBatchDate /> },
        { path: "master/batch-date/edit/:id", element: <CreateBatchDate /> },
        // SUBJECT
        { path: "master/subject", element: <Subject /> },
        { path: "master/subject/create", element: <CreateSubject /> },
        { path: "master/subject/edit/:id", element: <CreateSubject /> },
        // CHAPTER
        { path: "master/chapter", element: <Chapter /> },
        { path: "master/chapter/create", element: <CreateChapter /> },
        { path: "master/chapter/edit/:id", element: <CreateChapter /> },
        // STATES
        { path: "master/state", element: <State /> },
        // CITY
        { path: "master/city", element: <City /> },
        // Category
        { path: "master/category", element: <Category /> },
        // SubCategory
        { path: "master/subcategory", element: <SubCategory /> },
        // Images Bookmark
        { path: "master/images-bookmark", element: <ImagesBookmark /> },
        // WANT TO BE
        { path: "master/want-to-be", element: <WantToBe /> },
        { path: "master/want-to-be/create", element: <CreateWantToBe /> },
        { path: "master/want-to-be/edit/:id", element: <CreateWantToBe /> },

        // STAFF
        { path: "trainer-manager/trainer-list", element: <Staff /> },
        { path: "trainer-manager/trainer/create", element: <CreateStaff /> },
        { path: "trainer-manager/trainer/edit/:id", element: <CreateStaff /> },
        {
          path: "trainer-manager/trainer-attendance/:id",
          element: <StaffAttendance />,
        },
        {
          path: "trainer-manager/bulk-upload-trainer",
          element: <BulkUploadStaff />,
        },

        //Bulk Upload chapter
        {
          path: "master/chapter/bulk-upload-Chapter",
          element: <ChapterBulkUpload />,
        },
        // BANNER
        { path: "master/banner", element: <Banner /> },
        { path: "master/banner/create", element: <CreateBanner /> },
        { path: "master/banner/edit/:id", element: <CreateBanner /> },
        // SYLLABUS TOPIC
        { path: "syllabus/topic", element: <Topic /> },
        { path: "syllabus/topic/create", element: <CreateTopic /> },
        { path: "syllabus/topic/edit/:id", element: <CreateTopic /> },
        { path: "syllabus/bulk-upload-topic", element: <BulkTopic /> },
        { path: "syllabus/bulk-upload-video", element: <BulkVideo /> },
        // SYLLABUS CONTENT
        { path: "syllabus/content", element: <Content /> },
        { path: "syllabus/content/create", element: <CreateContent /> },
        { path: "syllabus/content/edit/:id", element: <CreateContent /> },
        // SYLLABUS CONTENT BULK Hide For Now
        // { path: "syllabus/Createvideomanagerbulk/create", element: <CreateVideoManagerBulk /> },
        // SCHEDULE
        { path: "schedule", element: <Schedule /> },
        { path: "schedule/create", element: <CreateSchedule /> },
        // // NOTICE
        { path: "notice", element: <Notice /> },
        { path: "notice/create", element: <CreateNotice /> },
        { path: "notice/edit/:id", element: <CreateNotice /> },
        // // REVISION
        { path: "revision", element: <Revision /> },
        { path: "revision/create", element: <CreateRevision /> },
        { path: "revision/edit/:id", element: <CreateRevision /> },
        {
          path: "revision/revision-bulkupload",
          element: <UploadBulkRevision />,
        },
        // QUESTION BANK
        {
          path: "questionbank/questionbank-singleupload",
          element: <QuestionBank />,
        },
        { path: "questionbank/:id", element: <CreateQuestionBank /> },
        { path: "questionbank/create", element: <CreateQuestionBank /> },
        { path: "questionbank/edit/:id", element: <CreateQuestionBank /> },
        {
          path: "questionbank/questionbank-bulkupload",
          element: <QuestionBulkUpload />,
        },

        // STUDENT
        { path: "staff-manager/staff-list", element: <Students /> },
        {
          path: "staff-manager/staff/profile/:id",
          element: <StudentProfile />,
        },
        { path: "staff-manager/staff/create", element: <CreateStudent /> },
        {
          path: "staff-manager/staff/edit/:id",
          element: <CreateStudent />,
        },
        {
          path: "staff-manager/ratings",
          element: <Ratings />,
        },
        // STUDENT ATTENDENCE
        {
          path: "staff-manager/staff-attendance/:id",
          element: <StudentAttendance />,
        },
        //BULK UPLOAD
        {
          path: "staff-manager/staff/bulk-upload",
          element: <BulkUploadStudent />,
        },
        // STUDENT REQUEST
        {
          path: "staff-manager/staff-request",
          element: <StudentRequest />,
        },
        {
          path: "staff-manager/feedback",
          element: <Feedback />,
        },
        { path: "staff-manager/order", element: <Orders /> },
        { path: "staff-manager/payment", element: <Payments /> },

        //Student Reports
        { path: "reports", element: <StudentReports /> },

        // DOUBTS
        { path: "doubts", element: <Doubts /> },
        { path: "doubts/:id", element: <DoubtsReply /> },
        // SHORTS
        { path: "short", element: <Shorts /> },
        { path: "short/create", element: <CreateShorts /> },
        { path: "short/edit/:id", element: <CreateShorts /> },
        // FAQ
        { path: "faq", element: <Faq /> },
        { path: "faq/create", element: <CreateFaq /> },
        { path: "faq/edit/:id", element: <CreateFaq /> },
        // ACTIVITY
        { path: "activity", element: <Activity /> },
        // SCHOLORSHIP
        { path: "scholarship/scholarship-create", element: <Scholarship /> },
        { path: "scholarship/create", element: <CreateScholarship /> },
        { path: "scholarship/edit/:id", element: <CreateScholarship /> },
        {
          path: "scholarship/scholarship-class",
          element: <ScholarshipClass />,
        },
        {
          path: "scholarship/scholarship-class/create",
          element: <CreateScholarshipClass />,
        },
        {
          path: "scholarship/scholarship-class/edit/:id",
          element: <CreateScholarshipClass />,
        },
        { path: "scholarship/top-highlight", element: <TopHighlight /> },

        {
          path: "scholarship/top-highlight/create",
          element: <CreateHighlight />,
        },
        {
          path: "scholarship/top-highlight/edit/:id",
          element: <CreateHighlight />,
        },
        //Create Scholarship Test
        {
          path: "scholarshiptest/scholarship-test",
          element: <ScholarshipTest />,
        },
        { path: "scholarshiptest/create", element: <CreateScholarshipTest /> },
        {
          path: "scholarshiptest/edit/:id",
          element: <CreateScholarshipTest />,
        },

        // ASSIGNMENT
        { path: "assignment/assignment-create", element: <Assignment /> },
        { path: "assignment/create", element: <CreateAssignment /> },
        { path: "assignment/edit/:id", element: <CreateAssignment /> },
        { path: "assignment/assignment-result", element: <AssignmentResult /> },
        {
          path: "assignment/assignment-offline-mode/:id",
          element: <Offline />,
        },
        { path: "assignment/assignment-online-mode/:id", element: <Online /> },
        // PACKAGE
        { path: "subscription/package-master", element: <Package /> },
        {
          path: "subscription/package-master/create",
          element: <CreatePackage />,
        },
        {
          path: "subscription/package-master/edit/:id",
          element: <CreatePackage />,
        },
        {
          path: "subscription/package-details",
          element: <PackageSubscription />,
        },
        {
          path: "subscription/package-details/create",
          element: <CreatePakacgeSubscription />,
        },
        {
          path: "subscription/package-details/edit/:id",
          element: <CreatePakacgeSubscription />,
        },
        {
          path: "subscription/Subscription-plan",
          element: <PackageSubscriptionList />,
        },
        {
          path: "subscription/Subscription-plan/create",
          element: <CreateSubscriptionList />,
        },
        {
          path: "subscription/Subscription-plan/edit/:id",
          element: <CreateSubscriptionList />,
        },
        // ONLY FOR YOU
        { path: "only-for-you", element: <OnlyForYou /> },
        { path: "only-for-you/create", element: <CreateOnlyForYou /> },
        { path: "only-for-you/edit/:id", element: <CreateOnlyForYou /> },
        // TEST
        { path: "test/test-report", element: <TestReportList /> },
        { path: "test/test-report/:id", element: <TestReportId /> },
        { path: "test/test-questions", element: <TestQuestion /> },
        { path: "test/test-questions/questions", element: <Questions /> },
        { path: "test/test-questions/:id", element: <TestQuestionView /> },
        { path: "test/staff-own-test", element: <StudentOwnTest /> },
        { path: "test/staff-own-test/:id", element: <StudentOwnTestId /> },
        // MENTORSHIP
        { path: "mentorship/feature", element: <Feature /> },
        { path: "mentorship/feature/create", element: <CreateFeature /> },
        { path: "mentorship/feature/edit/:id", element: <CreateFeature /> },

        { path: "mentorship/why-you-need", element: <WhyYouNeed /> },
        {
          path: "mentorship/why-you-need/create",
          element: <CreateWhyYouNeed />,
        },
        {
          path: "mentorship/why-you-need/edit/:id",
          element: <CreateWhyYouNeed />,
        },
        { path: "mentorship/how-it-help", element: <HowItHelps /> },
        {
          path: "mentorship/how-it-help/create",
          element: <CreateHowItHelps />,
        },
        {
          path: "mentorship/how-it-help/edit/:id",
          element: <CreateHowItHelps />,
        },
        {
          path: "mentorship/mentorship-package",
          element: <MentorshipPackage />,
        },
        // CHANGE PASSWORD
        { path: "change-password", element: <ChangePassword /> },
        // GENERAL SETTINGS
        {
          path: "general-setting/instruction-setting",
          element: <Instructions />,
        },
        {
          path: "general-setting/payment-setting",
          element: <PaymentSettings />,
        },
        { path: "general-setting/site-setting", element: <SiteSettings /> },
        {
          path: "general-setting/indivisual-setting",
          element: <IndivisualSetting />,
        },

        {
          path: "general-setting/zoom-setting",
          element: <ZoomSetting />,
        },

        {
          path: "general-setting/zoom-setting/create",
          element: <CreateZoomSetting />,
        },

        {
          path: "general-setting/zoom-setting/edit/:id",
          element: <CreateZoomSetting />,
        },

        {
          path: "general-setting/fire-base-setting",
          element: <FireBaseSetting />,
        },
        // GALLARY MANAGER
        { path: "gallery", element: <Gallery /> },
        { path: "gallery/create", element: <CreateGallery /> },
        { path: "gallery/edit/:id", element: <CreateGallery /> },
        // ACEDEMICS LIVE
        { path: "academics/live-class", element: <LiveClass /> },
        { path: "academics/live-class/create", element: <CreateLiveClass /> },
        { path: "academics/live-class/edit/:id", element: <CreateLiveClass /> },
        { path: "academics/history", element: <HistoryLive /> },
        { path: "academics/doubt-demo-request", element: <DoubtDemoRequest /> },
        // SCHOLARSHIP APPLICATION
        {
          path: "scholorship-application",
          element: <ScholarshipApplication />,
        },
        {
          path: "scholorship-application/scholarship-testReport/:id",

          element: <ScholarshipTestReport />,
        },

        // ENQUIRY
        { path: "enquiry", element: <Enquiry /> },
        // ROLES
        { path: "master/roles", element: <Roles /> },
        // Quiz
        { path: "quiz/quiz-report", element: <QuizReportList /> },
        { path: "quiz/quiz-report/view/:id", element: <QuizReportId /> },
        { path: "master/roles/permission/:id", element: <Permission /> },

        // Grievances
        { path: "grievances", element: <GrievancesList /> },

        // Poll
        { path: "poll", element: <PollsList /> },
        { path: "poll/create", element: <CreatePoll /> },
        { path: "poll/edit/:id", element: <CreatePoll /> },

        //Language
        { path: "language", element: <LanguageList /> },
        { path: "language/create", element: <CreateLanguage /> },
        { path: "language/edit/:id", element: <EditLanguage /> },

        // batchlist
        { path: "batchwisedetails", element: <BatchList /> },
        { path: "batchwisedetails/test-report/:id", element: <TestReportId /> },
      ],
    },
    {
      element: <CompactLayout />,
      children: [{ path: "404", element: <Page404 /> }],
    },
    {
      element: <BlankLayout />,
      children: [{ path: "app/meeting/:id", element: <ZoomMeeting /> }],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
