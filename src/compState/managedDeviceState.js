import qrcode from '../images/qrcode.jpeg';

const initialState = {  
  error   : false,
  success : false,
  msg     : '',
  loading : false,
  ptheme  : 'light',
  showAddDevModal : false,
  isDisabled  : false,
  userName    : '',
  mobNumber   : '',
  email       : '',
  templateN   : 'select-policy-template',
  policyList  : [],
  datatable   : '',  
  selGroupPolicy  : 'select-policy-template',
  clientActList   : [],
  clientAction    : 'select-client-action',
  clientPolicy    : 'select-policy-template',
  qrcodeImg     : qrcode,
  qrImgHeight   : '200px',  
  qrImgWidth    : '200px'  
}
export default initialState;