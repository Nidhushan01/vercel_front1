import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import {Routes, Route} from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import SurveyForm from './components/surveyForm/SurveyForm';
import PostList from './practice/pagination/components/PostList';
import OTPPage from './pages/auth/OTPPage';
import GoogleCalendarEmbed from './practice/calender/EmbedGoogleCalender';
import Background from './components/Background';
import ChangePassword from './pages/auth/ChangePassword';
import ProfileUser from './pages/dashboard/ProfileUser';
import ProfileTrainer from './pages/dashboard/ProfileTrainer';
import CustomizePlan from './components/CustomizePlan/CustomizePlan';

function App() {

  return (
    <>
      <Background>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path="/pagination" element={<PostList />} />
          <Route path="/verify-otp" element={<OTPPage />} />
          <Route path="/calender" element={<GoogleCalendarEmbed />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/surveyform" element={<SurveyForm />} />
          <Route path="/userprofile" element={<ProfileUser />} />
          <Route path="/trainerprofile" element={<ProfileTrainer />} />
          <Route path="/customize" element={<CustomizePlan />} />


          {/* Protected Dashboard Route */}
          <Route element={<ProtectedRoute />}>
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          </Route>
        </Routes>
      </Background>
    </>
  );
};

export default App;