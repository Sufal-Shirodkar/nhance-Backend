const  findMatchingHistoryId =(history, recive)=>{
    for (let hist of history) {
        const historyMemberIds = hist.members.map(member => member._id);
        const reciveMemberIds = recive.members;

        if (historyMemberIds.length === reciveMemberIds.length &&
            historyMemberIds.every(id => reciveMemberIds.includes(id))) {
            return hist._id;
        }
    }
  return null;
}
module.exports = {findMatchingHistoryId}