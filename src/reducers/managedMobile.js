import CA from '../actionCreator/comman';
import MMA from '../actionCreator/managedMobile';
import qrcode from '../images/qrcode.jpeg';

const manageMobile =(state,action)=>{
 
  let selGroupPolicy = 'select-policy-template',
      policyList = [],
      clientActList = [],
      clientAction = 'select-client-action',      
      showAddDevModal = false,
      error = false,
      success = false,
      loading = false,
      isDisabled = false,
      userName= '',
      mobNumber= '',
      email = '',
      //msg ='',
      datatable = '',  
      clientPolicy = 'select-policy-template',
      qrcodeImg    = qrcode, 
      qrImgHeight = '200px',  
      qrImgWidth  = '200px';      

  switch (action.type){
    case CA.SHOW_PROGRESS : 
      return {...state,error,success,loading : true} 
    case CA.HIDE_PROGRESS : 
      return {...state,error,success,loading}             
    case CA.DISPLAY_ERROR :       
      return {...state,error:true,success,loading,msg:action.payload} 
    case CA.DISPLAY_SUCESS :
      return {...state,success:true,error,loading,msg:action.payload}  
    case CA.F_TABLE_DATA_SUCCESS : 
      datatable = action.payload;
      return {...state,error,success,loading,datatable}          
    case MMA.F_POLICY_LIST_SUCCESS : 
      policyList = [...action.payload];
      selGroupPolicy = policyList.length>0 ? policyList[1] : 'select-policy';
      return {...state,error,success,loading,policyList,selGroupPolicy} 
    case MMA.F_POLICY_LIST_FAIL : 
      return {...state,error,success,loading,policyList:action.payload}     
    case MMA.POLICY_TEMPLATE_CHANGE : 
      selGroupPolicy = action.payload;
      return {...state,error,success,loading,selGroupPolicy}       
    case MMA.CLIENT_ACT_LIST_CHANGE :       
      clientAction = action.payload;      
      return {...state,error,success,loading,clientAction}  
    case MMA.F_CLIENT_ACT_LIST_SUCCESS :       
      clientActList = action.payload;      
      return {...state,error,success,loading,clientActList}      
    case MMA.TOGGEL_ADD_DEVICE_MODAL :            
      showAddDevModal = !state.showAddDevModal ? true : false;      
      return {...state,error,success,loading,showAddDevModal,userName,mobNumber,email,clientPolicy,qrcodeImg,qrImgHeight,qrImgWidth,isDisabled} 
    case MMA.DISPLAY_QRCODE : 
      userName = action.payload.userName;
      mobNumber = action.payload.mobNumber;
      email = action.payload.email;
      clientPolicy = action.payload.clientPolicy;
      qrcodeImg = action.payload.qrcodeImg; 
      qrImgHeight = '50px';  
      qrImgWidth  = '50px';                       
      showAddDevModal = !state.showAddDevModal ? true : false;
      isDisabled = true;     
      return {...state,error,success,loading,showAddDevModal,userName,mobNumber,email,clientPolicy,qrcodeImg,qrImgHeight,qrImgWidth,isDisabled}        
    case MMA.SET_USER_NAME : 
      userName = action.payload.replace(/[^\w\s]/gi, "")                 
      return {...state,error,success,loading,userName}                                                             
    case MMA.SET_MOBILE_NUMBER : 
      const re = /^[0-9\b]+$/;
      mobNumber = re.test(action.payload)? action.payload : '';                 
      return {...state,error,success,loading,mobNumber}  
    case MMA.SET_EMAIL :
      email = action.payload;       
      return {...state,error,success,loading,email}          
    case MMA.ADD_DEV_TEM_CHANGE : 
      clientPolicy = action.payload;
      return {...state,error,success,loading,clientPolicy}      
    default:
      return state;  
  }
}
export default manageMobile;
