function rentalStatus(rental,now=new Date()){
  if(!rental)return {kind:'manual',label:'Em locação'};
  if(rental.returned_at)return {kind:'returned',label:'Devolvido'};
  const today=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');
  if(rental.due_date<today)return {kind:'overdue',label:'Em atraso'};
  if(rental.due_date===today)return {kind:'today',label:'Vence hoje'};
  return {kind:'active',label:'Em locação'};
}
if(typeof module!=='undefined')module.exports={rentalStatus};
