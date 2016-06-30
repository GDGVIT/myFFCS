const _=require('lodash')
var courses=require('../slot/slot.js')
lab=courses.lab
normalSlot=courses.slots


  var normalValidator=function(slots,slot){
    flag=true
    for(i=0;i<slot.length;i++){
        if(_.indexOf(slots,slot[i])==-1){
            flag=true

        }else {
          flag=false
          break;
        }
    }
    return flag;
}
var labValidator=function(slots,slot){
    flag=true
      for(i=0;i<slot.length;i++){
        if(_.indexOf(slots,lab[slot[i]])==-1){
            flag=true

        }else {
          flag=false;
          break;
        }
    }
    return flag;
}

var normalSlotChecker=function(slot){
    flag=true
    for(i=0;i<slot.length;i++){
        if(_.indexOf(normalSlot,slot[i])==-1){
            flag=false
            break;
        }
    }
    return flag
}

var validator=function(allotedSlot,slots){
    if(normalSlotChecker(slots)){
        return normalValidator(allotedSlot,slots)
    }else{
//      console.log("comming");
        return labValidator(allotedSlot,slots)&&normalValidator(allotedSlot,slots)
    }
}
console.log(validator(['B2'],['L37']));
module.exports=validator
