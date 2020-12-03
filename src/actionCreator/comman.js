const Action = {
  DISPLAY_ERROR : 'DISPLAY_ERROR',
  DISPLAY_SUCESS : 'DISPLAY_SUCESS',
  HIDE_PROGRESS : 'HIDE_PROGRESS',
  SHOW_PROGRESS : 'SHOW_PROGRESS',
  F_TABLE_DATA_SUCCESS : 'F_TABLE_DATA_SUCCESS',
  LIGHT_P : 'LIGHT_THEME',  
  DARK_P  : 'DARK_THEME', 

  showProgress : function(){
    return { type:this.SHOW_PROGRESS}
  },  
  displayErrorMsg : function(error){
    return { type:this.DISPLAY_ERROR, payload : error }
  },
  displaySuccessMsg : function(msg){
    return { type:this.DISPLAY_SUCESS, payload : msg }
  },
  hideProgress : function(){
    return {type:this.HIDE_PROGRESS}
  },
  fetchTableDataSucess : function(table_data){
    return {type:this.F_TABLE_DATA_SUCCESS, payload : table_data}    
  }        
}
export default Action;
