/*
* multipal routes example : https://reactrouter.com/web/guides/quick-start
* https://www.youtube.com/watch?v=sfvrjwVihFY
* https://www.youtube.com/watch?v=35lXWvCuM8o

setState in functional component
1] set state variables

    const [islogin,setLogin] = useState(false);
    const [token,setToken]   = useState('');

2] if u update state value depend on prevois state value use function in useState
  setCount(preState=>preState+1);

3] useState with objects : useState not automatically merge and update state
    const [person,setPerson] = useState({name,lastName});
  
  write state object
    onChange={(e)=>{useState({...person,name:e.target.value});}}   
    onChange={(e)=>{useState({...person,lastName:e.target.value});}}   
  read state object
    {person.name}
    {person.lastName}

4] state variable as aaray
  const [items,setItems] = useState([]);

read state array
  items.map(item=>{
    <li key={item.id}>{item.value}</li>
  });
write/modified 
  setItems([...items,{copy items arry 1st then insert new 
    id: giv array index number,
    value : value must be value 
  }]);






side bar menu : https://github.com/briancodex/react-sidebar-v1

  dependencies
  npm install react-bootstrap bootstrap

life cycle
https://www.geeksforgeeks.org/reactjs-lifecycle-components/

bootstrap
  https://react-bootstrap.github.io/components/modal/  
Media Queries
  https://www.w3schools.com/css/css_rwd_mediaqueries.asp  
data table
  https://mdbootstrap.com/docs/react/tables/datatables/

get icons from : https://react-icons.github.io/search
document       : https://www.npmjs.com/package/react-icons

material design : https://material-ui.com/components/tabs/

box shadow effects : https://css-tricks.com/almanac/properties/b/box-shadow/

get captcha key from google
https://www.google.com/recaptcha/admin/create

site key    : 6Lf_4NEZAAAAABFmYOi_fAHdmCKeSlk-wiXzMKgh
secret key  : 6Lf_4NEZAAAAAMCv0-IP9AMtpGOdbb9VoihbEwIu
for google login use : install react-google-login


Font Awsom icons
npm i --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/react-fontawesome
npm install @material-ui/core

important points to remember
1] while using reduce dispatch method calls twice bcause of <React.StrictMode> in development
   see result after comment and uncomment this



*/