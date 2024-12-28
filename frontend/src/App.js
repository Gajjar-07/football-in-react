import './App.css'
import { Route,Routes } from 'react-router-dom';
import {NavBar} from './component/navbar';
import {AddTeamForm} from './component/addteamdata';
import { UpdateTeam } from './component/update';
import { DeleteTeam } from './component/delete';
import { TotalsForYear } from './component/total';
import { DisplayTeams } from './component/displaydata';
import { QueryTeams } from './component/avgGoal';
import { HomePage } from './component/home';
import { ViewTeams } from './component/view';

//U2669165 GAJJAR


const App = () => {
  return (
  <div className='App'>
    <NavBar/>
    <Routes>
    <Route path='/' element={<HomePage/>}/>
       <Route path='Add-team' element={<AddTeamForm/>}/>
       <Route path='Update-team' element={<UpdateTeam/>}/>
       <Route path='Delete-team' element={<DeleteTeam/>}/>
       <Route path='Display-data' element={<DisplayTeams/>}/>
       <Route path='Total-year' element={<TotalsForYear/>}/>
       <Route path='Query-teams' element={<QueryTeams/>}/>
       <Route path='View' element={<ViewTeams/>}/>
       
    </Routes>
    
  </div>
  );
};

export default App;
