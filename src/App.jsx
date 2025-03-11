import React from 'react';
import Tabbar from './components/Tabbar/TabBar';
import WorkshopForm from './components/Workshop/WorkShopForm';
import AtelierList from './components/DisplayWorkshop/Workshops';

function App() {
  return (
    <>
    <WorkshopForm />
    <AtelierList/>
      <Tabbar />
    </>
  );
}

export default App;
