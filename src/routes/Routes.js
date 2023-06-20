import React from 'react'
import QrNotFound from '../views/user/screens/QrNotFound'
// userComponents
const Login = React.lazy(() => import('../views/user/auth/Login'))
const Register = React.lazy(() => import('../views/user/auth/Register'))
const Dashboard = React.lazy(() => import('../views/user/screens/Dashboard'))
const SendMessage = React.lazy(() => import('../views/user/screens/SendMessage'))
const DownloadApp = React.lazy(() => import('../views/user/screens/DownloadApp'))
const QrcodeScan = React.lazy(() => import('../views/user/screens/QrScan'))
const QrResponse = React.lazy(() => import('../views/user/screens/QrResponse'))
const AdminDashboard = React.lazy(() => import('../views/admin/screens/Dashboard'))
const ManageUser = React.lazy(() => import('../views/admin/screens/ManageUsers'))
const printerReports = React.lazy(() => import('../views/admin/screens/PrinterReports'))
const faqs = React.lazy(() => import('../views/admin/screens/Faq'))
const notFound = React.lazy(() => import('../views/errorPages/NotFound'))
const Settings = React.lazy(() => import('../views/settings/Setting'))
const VerifyResetPassword = React.lazy(() => import('../views/user/auth/VerifyResetPassword'))
// const QrTemplates = React.lazy(() => import('../views/admin/screens/QrTemplates'))
const routes = [
    // userRoutes
    { path: '/', exact: true,  name: 'Login', component: Login },
    { path: '/register', exact: true,  name: 'Register', component: Register },
    { path: '/sendMessage', exact: true,  name: 'send Message', component: SendMessage },
    { path: '/downloadApp', exact: true,  name: 'Download App', component: DownloadApp },
    { path: '/qrScan', exact: true,  name: 'Qr Code Scan', component: QrcodeScan },
    { path: '/qrResponse', exact: true,  name: 'Qr Response', component: QrResponse },
    { path: '/user/dashboard', exact: true,  name: 'Dashoard', component: Dashboard },
    { path: '/user/downloadReport', exact: true,  name: 'User Download Reports', component: printerReports },
    { path: '/user/settings', exact: true,  name: 'Settings', component: Settings },
    {path: '/password-reset',   name: 'Verify Password', component: VerifyResetPassword },
    // adminRoutes
    { path: '/admin/dashboard', exact: true,  name: 'Admin Dashoard', component: AdminDashboard },
    { path: '/admin/manageUsers', exact: true,  name: 'Manage Users', component: ManageUser },
    { path: '/admin/printerReports', exact: true,  name: 'Printer Reports', component: printerReports },
    { path: '/admin/faq', exact: true,  name: "FAQ'S", component: faqs },
    { path: '/admin/settings', exact: true,  name: 'Settings', component: Settings },
    // { path: '/admin/qr-templates', exact: true,  name: 'Qr Templates', component: QrTemplates },
    // errorRoutes
    { path: '/404', exact: true,  name: "404", component: notFound},
    { path: '/qr/not-found', exact: true,  name: 'Qr Not Found', component: QrNotFound },
]
export default routes