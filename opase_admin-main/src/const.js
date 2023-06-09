export const ApiBaseUrl = Number(process.env.REACT_APP_LIVE) === 1 ? process.env.REACT_APP_LIVE_BASE_URL : process.env.REACT_APP_LOCAL_BASE_URL;

export const API_Path = {
  login: ApiBaseUrl + "user/login",
  forgotPassword: ApiBaseUrl + "user/forgotpass",
  verifyOtp: ApiBaseUrl + "user/verifyotp",
  Reset_password: ApiBaseUrl + "user/resetpass",
  changePassword: ApiBaseUrl + "user/changepass",
  checkEmailverify: ApiBaseUrl + "user/choose-verification",
  getDashboardData: ApiBaseUrl + "home/admin-dashbord",
  getUsers: ApiBaseUrl + "user/getProfileData",
  getUsersDetails: ApiBaseUrl + "user/user-detail",
  getTalent: ApiBaseUrl + "home/talent",
  getTalentDetails: ApiBaseUrl + "home/talent-detail",
  removeTalent: ApiBaseUrl + "home/talent-remove",
  registerTalent: ApiBaseUrl + "user/talent-register",
  managetalentStatus: ApiBaseUrl + "home/manage-talent",
  addImage: ApiBaseUrl + "user/imgtest",
  addVideo: ApiBaseUrl + "home/uploadvideo",
  removeVideo: ApiBaseUrl + "home/video",
  addrequest: ApiBaseUrl + "home/request-get",
  removeRequest: ApiBaseUrl + "home/request-remove",
  videoDetails: ApiBaseUrl + "home/request-details",
  addAdmin: ApiBaseUrl + "home/admin-create",
  getAdmin: ApiBaseUrl + "home/admin",
  editAdmin: ApiBaseUrl + "home/admin-edit",
  getPopularData: ApiBaseUrl + "home/popular",
  getTrendingData: ApiBaseUrl + "home/trending",
  getRecommendData: ApiBaseUrl + "home/recommended-view",
  getFeaturedData: ApiBaseUrl + "home/featured",
  getWebsiteAboutPage: ApiBaseUrl + "home/about-section",
  getWebsiteAboutPageById: ApiBaseUrl + "home/get-by-id-about-section",
  UpdateWebsiteAboutPage: ApiBaseUrl + "home/update-about-section",
  getWebsiteHomePage: ApiBaseUrl + "home/home-section",
  getWebsiteHomePageById: ApiBaseUrl + "home/get-by-id-home-section",
  UpdateWebsiteHomePage: ApiBaseUrl + "home/update-home-section",
  UpdateSectionData: ApiBaseUrl + "home/update-home-slider",
  getSectionUpdatedData: ApiBaseUrl + "home/get-by-position-home-slider",
  getNotification: ApiBaseUrl + "user/notifget",
  changeNotification: ApiBaseUrl + "user/statnotif",
  getPaymentReceipt: ApiBaseUrl + "user/payment-receipt",
  searchTalent: ApiBaseUrl + "home/search",
  refundReward: ApiBaseUrl + "home/refund-reward",
  GEtTransferData: ApiBaseUrl + "user/transfer-get",
  GetRevenueChart: ApiBaseUrl + "user/revenue-graph",
};
