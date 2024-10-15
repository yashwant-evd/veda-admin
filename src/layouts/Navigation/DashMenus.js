import { PATH_DASHBOARD } from "routes/paths";
import { ICONS } from "./utils";

export const DashMenus = [
  // {
  //   subheader: "general",
  //   items: [
  //     { title: "Dashboard", path: PATH_DASHBOARD.app, icon: ICONS.dashboard },
  //     {
  //       title: "Master",
  //       path: "/app/master",
  //       icon: ICONS.Master,
  //       children: [
  //         { title: "Course", path: PATH_DASHBOARD.courses }, 
  //         { title: "Board", path: PATH_DASHBOARD.board },
  //         { title: "Class", path: PATH_DASHBOARD.class },
  //         { title: "Batch Type", path: PATH_DASHBOARD.batchtype },
  //         { title: "Batch Date", path: PATH_DASHBOARD.batchdate },
  //         { title: "Subject", path: PATH_DASHBOARD.subject },
  //         { title: "Chapter", path: PATH_DASHBOARD.chapter },
  //         { title: "Banner", path: PATH_DASHBOARD.banner },
  //         { title: "State", path: PATH_DASHBOARD.state },
  //         { title: "City", path: PATH_DASHBOARD.city },
  //         { title: "Want To Be", path: PATH_DASHBOARD.wanttobe },
  //         { title: "Roles", path: PATH_DASHBOARD.roles },
  //       ],
  //     },
  //     {
  //       title: "Syllabus",
  //       path: "/app/syllabus",
  //       icon: ICONS.Syllabus,
  //       children: [
  //         {
  //           title: "Topic",
  //           path: PATH_DASHBOARD.topic,
  //         },
  //         {
  //           title: "Video Manager",
  //           path: PATH_DASHBOARD.content,
  //         },
  //         {
  //           title: "Upload Bulk Topic",
  //           path: PATH_DASHBOARD.bulkupload,
  //         },
  //         {
  //           title: "Upload Bulk Video",
  //           path: PATH_DASHBOARD.bulkuploadvideo,
  //         },
  //       ],
  //     },
  //     // {
  //     //   title: "Payments",
  //     //   path: PATH_DASHBOARD.payment,
  //     //   icon: ICONS.ecommerce,
  //     // },
  //     // {
  //     //   title: "Orders",
  //     //   path: PATH_DASHBOARD.order,
  //     //   icon: ICONS.ecommerce,
  //     // },
  //     // {
  //     //   title: "Students",
  //     //   path: PATH_DASHBOARD.student,
  //     //   icon: ICONS.ecommerce,
  //     // },
  //     {
  //       title: "Student Manager",
  //       path: "/app/student-manager",
  //       icon: ICONS.students,
  //       children: [
  //         {
  //           title: "Student List",
  //           path: PATH_DASHBOARD.student,
  //         },
  //         {
  //           title: "Upload Bulk Student",
  //           path: PATH_DASHBOARD.studentbulkupload,
  //         },
  //         {
  //           title: "Student Call Request",
  //           path: PATH_DASHBOARD.StudentRequest,
  //         },
  //         {
  //           title: "Feedback",
  //           path: PATH_DASHBOARD.feedback,
  //         },
  //         {
  //           title: "Orders",
  //           path: PATH_DASHBOARD.order,
  //         },
  //         {
  //           title: "Payments",
  //           path: PATH_DASHBOARD.payment,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Staff",
  //       path: "/app/staff-manager",
  //       icon: ICONS.Staff,
  //       children: [
  //         {
  //           title: "Staff List",
  //           path: PATH_DASHBOARD.staff,
  //         },

  //         {
  //           title: "Upload Bulk Staff",
  //           path: PATH_DASHBOARD.bulkuploadstaff,
  //         },
  //       ],
  //     },

  //     // {
  //     //   title: "Staff",
  //     //   path: PATH_DASHBOARD.staff,
  //     //   icon: ICONS.analytics,
  //     // },
  //     {
  //       title: "Shorts",
  //       path: PATH_DASHBOARD.short,
  //       icon: ICONS.Shorts,
  //     },
  //     {
  //       title: "Schedules",
  //       path: PATH_DASHBOARD.schedule,
  //       icon: ICONS.calendar,
  //     },
  //     {
  //       title: "FAQ",
  //       path: PATH_DASHBOARD.faq,
  //       icon: ICONS.FAQ,
  //     },
  //     // {
  //     //   title: "Feedback",
  //     //   path: PATH_DASHBOARD.feedback,
  //     //   icon: ICONS.folder,
  //     // },
  //     {
  //       title: "Only For You",
  //       path: PATH_DASHBOARD.onlyforyou,
  //       icon: ICONS.OnlyforYou,
  //     },
  //     // {
  //     //   title: "Notice",
  //     //   path: PATH_DASHBOARD.notice.notice,
  //     //   icon: ICONS.ecommerce,
  //     // },
  //     {
  //       title: "Notice",
  //       path: PATH_DASHBOARD.notice,
  //       icon: ICONS.notice,
  //     },
  //     {
  //       title: "Doubts",
  //       path: PATH_DASHBOARD.doubts,
  //       icon: ICONS.doubt,
  //     },

  //     {
  //       title: "Revision",
  //       path: PATH_DASHBOARD.revision,
  //       icon: ICONS.revision,
  //       children: [
  //         {
  //           title: "Revision List",
  //           path: PATH_DASHBOARD.revision,
  //         },
  //         {
  //           title: "Upload Bulk Revision",
  //           path: PATH_DASHBOARD.uploadbulk,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Question Bank",
  //       path: "/app/questionbank",
  //       icon: ICONS.question,
  //       children: [
  //         {
  //           title: "Question Bank",
  //           path: PATH_DASHBOARD.questionbank,
  //         },
  //         {
  //           title: "Upload Bulk Question",
  //           path: PATH_DASHBOARD.questionbulkupload,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Scholarship",
  //       path: "/app/scholarship",
  //       icon: ICONS.Scholarship,
  //       children: [
  //         {
  //           title: "Create Scholarship",
  //           path: PATH_DASHBOARD.scholarship,
  //         },
  //         {
  //           title: "Create Scholarship Class",
  //           path: PATH_DASHBOARD.scholarshipclass,
  //         },
  //         {
  //           title: "Top Highlight",
  //           path: PATH_DASHBOARD.tophighlight,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Assignment",
  //       path: "/app/assignment",
  //       icon: ICONS.assignment,
  //       children: [
  //         {
  //           title: "Create Assignment",
  //           path: PATH_DASHBOARD.assignment,
  //         },
  //         {
  //           title: "Assignment Result",
  //           path: PATH_DASHBOARD.assignmentresult,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Scholarship Application",
  //       path: PATH_DASHBOARD.scholorshipapplication,
  //       icon: ICONS.ScholarshipApplication,
  //     },
  //     {
  //       title: "Subscription",
  //       path: "/app/subscription",
  //       icon: ICONS.Package,
  //       children: [
  //         {
  //           title: "Package Master",
  //           path: PATH_DASHBOARD.package,
  //         },
  //         {
  //           title: "Package Details",
  //           path: PATH_DASHBOARD.packagesubscription,
  //         },
  //         {
  //           title: "Subscription Plan",
  //           path: PATH_DASHBOARD.SubscriptionList,
  //         },
  //       ],
  //     },

  //     {
  //       title: "Test",
  //       path: "/app/test",
  //       icon: ICONS.Test,
  //       children: [
  //         {
  //           title: "Create Test",
  //           path: PATH_DASHBOARD.testquestion,
  //         },
  //         {
  //           title: "Test Reports",
  //           path: PATH_DASHBOARD.testreport,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Quiz Report",
  //       path: PATH_DASHBOARD.quizreportlist,
  //       icon: ICONS.calendar,
  //     },
  //     {
  //       title: "Mentorship",
  //       path: "/app/mentorship",
  //       icon: ICONS.mentorship,
  //       children: [
  //         {
  //           title: "Features",
  //           path: PATH_DASHBOARD.feature,
  //         },
  //         {
  //           title: "How it helps ?",
  //           path: PATH_DASHBOARD.howithelp,
  //         },
  //         {
  //           title: "Why you need ?",
  //           path: PATH_DASHBOARD.whyyouneed,
  //         },
  //       ],
  //     },
  //     {
  //       title: "General Setting",
  //       path: "/app/general-setting",
  //       icon: ICONS.GeneralSetting,
  //       children: [
  //         {
  //           title: "Instructions",
  //           path: PATH_DASHBOARD.instruction,
  //         },
  //         {
  //           title: "Payment Setting",
  //           path: PATH_DASHBOARD.paymentsetting,
  //         },
  //         {
  //           title: "Site Setting",
  //           path: PATH_DASHBOARD.sitesetting,
  //         },
  //         {
  //           title: "Individual Setting",
  //           path: PATH_DASHBOARD.indivisualsetting,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Gallery Manager",
  //       path: "/app/gallery",
  //       icon: ICONS.Gallery,
  //     },
  //     {
  //       title: "Academics",
  //       path: "/app/academics",
  //       icon: ICONS.Academics,
  //       children: [
  //         {
  //           title: "Live Class",
  //           path: PATH_DASHBOARD.liveclass,
  //         },
  //         {
  //           title: "Live Class History",
  //           path: PATH_DASHBOARD.history,
  //         },
  //         {
  //           title: "Doubt/Demo Request",
  //           path: PATH_DASHBOARD.dobtdemorequest,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Enquiry",
  //       path: PATH_DASHBOARD.enquiry,
  //       icon: ICONS.Enquiry,
  //     },
  //     {
  //       title: "Activity Log",
  //       path: PATH_DASHBOARD.activity,
  //       icon: ICONS.ActivityLog,
  //     },
  //     // {
  //     //   title: "Top Highlight",
  //     //   path: PATH_DASHBOARD.tophighlight,
  //     //   icon: ICONS.calendar,
  //     // },
  //   ],
  // },
];
