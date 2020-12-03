const Action = { 
  SEND_LOCK_COMMAND : 'SEND_LOCK_COMMAND',
  SEND_WIPE_COMMAND : 'SEND_WIPE_COMMAND',  

  sendLockCommand : function(data){
    return {type:this.SEND_LOCK_COMMAND,payload:data}
  },
  sendWipeommand : function(data){
    return {type:this.SEND_WIPE_COMMAND,payload:data}
  }  
}
export default Action;
