import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/common/Login";
import CheckYourMail from "./pages/common/CheckYourMail";
import OtpVerification from "./pages/common/OtpVerification";
import ResetPassword from "./pages/common/ResetPassword";
import Dashboard from "./pages/Dashboard";
import ManageTalent from "./pages/ManageTalent";
import TalentDetails from "./pages/TalentDetails";
import User from "./pages/User";
import UserDetails from "./pages/UserDetails";
import Talent from "./pages/Talent";
import Requests from "./pages/Requests";
import RequestVideo from "./pages/RequestVideo";
// import EmailCampaign from "./pages/EmailCampaign";
import Refund from "./pages/Refund";
import Admin from "./pages/Admin";
import AdminEdit from "./pages/AdminEdit";
import ChangePassword from "./pages/ChangePassword";
import HomePageSection from "./pages/HomePageSection";
import EditBannerSection from "./pages/EditBannerSection";
import Popular from "./pages/Popular";
import Trendings from "./pages/Trendings";
import Featured from "./pages/Featured";
import LandingPageContent from "./pages/LandingPageContent";
import LandingPageBuilder from "./pages/LandingPageBuilder";
import RecommendForYou from "./pages/RecommendForYou";
import AboutPageSection from "./pages/AboutPageSection";
import EditAboutSection from "./pages/EditAboutSection";

function RequireAuth({ children, redirectTo }) {
  let isAuthenticated = localStorage.getItem("opad_token");
  return isAuthenticated !== null && isAuthenticated !== undefined && isAuthenticated !== "" ? children : <Navigate to={redirectTo} />;
}

export default function RoutesMain() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            strict
            element={
              <RequireAuth redirectTo="/login">
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path="/login" exact element={<Login />} />
          <Route path="/check-your-mail" exact element={<CheckYourMail />} />
          <Route path="/otp-verification" exact element={<OtpVerification />} />
          {/* <Route path="/changepassword" exact element={<ChangePassword />} /> */}
          <Route path="/reset-password" exact element={<ResetPassword />} />
          <Route
            path="/change-password"
            exact
            element={
              <RequireAuth redirectTo="/login">
                <ChangePassword />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard"
            exact
            element={
              <RequireAuth redirectTo="/login">
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/manage-talent"
            exact
            element={
              <RequireAuth redirectTo="/login">
                <ManageTalent />
              </RequireAuth>
            }
          />
          <Route
            path="/talent-details"
            exact
            element={
              <RequireAuth redirectTo="/login">
                <TalentDetails />
              </RequireAuth>
            }
          />
          <Route
            path="/talent-details/:id"
            exact
            element={
              <RequireAuth redirectTo="/login">
                <TalentDetails />
              </RequireAuth>
            }
          />
          <Route
            path="/user"
            exact
            element={
              <RequireAuth redirectTo="/login">
                <User />
              </RequireAuth>
            }
          />
          <Route
            path="/user-details"
            exact
            element={
              <RequireAuth redirectTo="/login">
                <UserDetails />
              </RequireAuth>
            }
          />
          <Route
            path="/talent"
            exact
            element={
              <RequireAuth redirectTo="/login">
                <Talent />
              </RequireAuth>
            }
          />
          <Route
            path="/requests"
            exact
            element={
              <RequireAuth redirectTo="/login">
                <Requests />
              </RequireAuth>
            }
          />
          <Route
            path="/request-video"
            exact
            element={
              <RequireAuth redirectTo="/login">
                <RequestVideo />
              </RequireAuth>
            }
          />
          <Route
            path="/refund"
            exact
            element={
              <RequireAuth redirectTo="/login">
                <Refund />
              </RequireAuth>
            }
          />
          <Route
            path="/admin"
            exact
            element={
              <RequireAuth redirectTo="/login">
                <Admin />
              </RequireAuth>
            }
          />
          <Route
            path="/admin-edit"
            exact
            element={
              <RequireAuth redirectTo="/login">
                <AdminEdit />
              </RequireAuth>
            }
          />
          <Route
            path="/home-page-section"
            exact
            element={
              <RequireAuth redirectTo="/login">
                <HomePageSection />
              </RequireAuth>
            }
          />

          <Route
            path="/edit-home-page-section"
            exact
            element={
              <RequireAuth redirectTo="/login">
                <EditBannerSection />
              </RequireAuth>
            }
          />
          <Route
            path="/popular"
            exact
            element={
              <RequireAuth redirectTo="/login">
                <Popular />
              </RequireAuth>
            }
          />
          <Route
            path="/featured"
            exact
            element={
              <RequireAuth redirectTo="/login">
                <Featured />
              </RequireAuth>
            }
          />
          <Route
            path="/landing-page-content"
            exact
            element={
              <RequireAuth redirectTo="/login">
                <LandingPageContent />
              </RequireAuth>
            }
          />
          <Route
            path="/landing-page-builder"
            exact
            element={
              <RequireAuth redirectTo="/login">
                <LandingPageBuilder />
              </RequireAuth>
            }
          />
          <Route
            path="/trendings"
            exact
            element={
              <RequireAuth redirectTo="/login">
                <Trendings />
              </RequireAuth>
            }
          />
          <Route
            path="/recommend-for-you"
            exact
            element={
              <RequireAuth redirectTo="/login">
                <RecommendForYou />
              </RequireAuth>
            }
          />
          <Route
            path="/home-about-section"
            exact
            element={
              <RequireAuth redirectTo="/login">
                <AboutPageSection />
              </RequireAuth>
            }
          />

          <Route
            path="/edit-about-page-section"
            exact
            element={
              <RequireAuth redirectTo="/login">
                <EditAboutSection />
              </RequireAuth>
            }
          />

          {/* <Route path="/talent" exact element={<Talent />} />
          <Route path="/requests" exact element={<Requests />} />
          <Route path="/requestvideo" exact element={<RequestVideo />} />
          <Route path="/emailcampaign" exact element={<EmailCampaign />} /> */}
          {/* <Route path="/refund" exact element={<Refund />} />
          <Route path="/admin" exact element={<Admin />} />
          <Route path="/adminedit" exact element={<AdminEdit />} /> */}
          {/* <Route path="/managetalent" exact element={<ManageTalent />} /> */}
          {/* <Route path="/talentdetails" exact element={<TalentDetails />} /> */}
          {/* <Route path="/user" exact element={<User />} />
          <Route path="/userdetails" exact element={<UserDetails />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
