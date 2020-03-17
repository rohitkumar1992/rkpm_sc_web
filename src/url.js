// import Fingerprint from "fingerprintjs";
export const TAG="dash";
const base_url="http://192.168.27.119/Shantanu_project/OTT_LIVE_WORK/LARAVEL_WORK/PmslScheduling/public/api";
//const base_url="http://api.planetshare.in/public/api";
export const COUNTRYCODE=localStorage.getItem('countrycode')==null?'IN':localStorage.getItem('countrycode')
export const LOGIN=base_url+"/login";
export const LOGOUT=base_url+"/logout";
export const CHANGE_STATUS=base_url+"/changeStatus";
export const CREATEEMPLOYEE=base_url+"/createuser"
export const EMPLOYEELIST=base_url+"/getEmployeeList"
export const CREATECHANNEL=base_url+"/createChannel"
export const CHANNELLIST=base_url+"/getChannelList"
export const CHANNELDATABYID=base_url+"/getChannelById"
export const EMPLOYEEDATABYID=base_url+"/getEmployeeById";
export const LOGINLIST=base_url+"/getLoginList";
export const LOGINDATABYID=base_url+"/getLoginById";
export const CREATEELOGINUSER=base_url+"/create/login";
export const CREATECATEGORY=base_url+"/createCategory"
export const CATEGORYLIST=base_url+"/getCategoryList"
export const CATEGORYDATABYID=base_url+"/getCategoryById"
export const INSERTLIBRARY=base_url+"/insertLibrary"
export const GETLIBRARY=base_url+"/getLibraryData"
export const INSERTCOMMERCIAL=base_url+"/insertCommercial"
export const GETCOMMERCIAL=base_url+"/getCommercialData";
export const GETALLLIBRARYCOMMERCIAL=base_url+"/getScheduleLibrary";
export const USERID=localStorage.getItem('user_id')==null?0:localStorage.getItem('user_id');
export const TOKEN=localStorage.getItem('pmsl_token');
// var fingerprint = new Fingerprint().get();
// localStorage.setItem('uuid',fingerprint)
// export const UUID=fingerprint
export const HEADER = {
headers: {
  'Content-Type': 'application/json;charset=UTF-8',
  'Authorization':"Bearer " + TOKEN,
}
};
export const OS=window.navigator.platform
export const NAME=window.navigator.appCodeName
export const backdropStyle = {
    backgroundColor: 'black'
};

export const contentStyle = {
    backgroundColor: 'white',
    height: '100%',
    overflowY:'visible'
};
export const toUpperCaseFilter = (d) => {
    return d.toUpperCase();
};
