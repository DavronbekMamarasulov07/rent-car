import {   Calendar } from 'antd';

  

const CalendarInfo = () => {
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  return( 
     <> 
      <Calendar onPanelChange={onPanelChange} />
     </>
)
}

export default CalendarInfo
