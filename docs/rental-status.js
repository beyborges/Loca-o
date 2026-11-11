function rentalStatus(rental,now=new Date()){
  if(!rental)return {kind:'manual',label:'Em locação'};
  if(rental.returned_at)return {kind:'returned',label:'Devolvido'};
  const today=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');
  if(rental.due_date<today)return {kind:'overdue',label:'Em atraso'};
  if(rental.due_date===today)return {kind:'today',label:'Vence hoje'};
  return {kind:'active',label:'Em locação'};
}
function overdueDays(dueDate,now=new Date()){
  const today=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');
  const due=Date.parse(`${dueDate}T00:00:00Z`),end=Date.parse(`${today}T00:00:00Z`);
  return Number.isFinite(due)?Math.max(0,Math.round((end-due)/86400000)):0;
}
if(typeof module!=='undefined')module.exports={rentalStatus,overdueDays};
