import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home, InteractiveUI, SnapStore } from './pages';

const App = () => {
  return (
    <div className='bg-[#0d0d0d] min-h-screen flex flex-col items-center fixed w-[100vw] justify-between'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/snap-store' element={<SnapStore />} />
        <Route path='interactive-ui' element={<InteractiveUI />} />
      </Routes>
      <div className='flex sm:hidden w-[60vw] h-[40px] rounded-[8px] sticky bottom-5 outline-2'>
        <button className='px-4 w-[30vw] py-1 bg-primary-800 font-poppins font-medium hover:bg-primary-900 border-l border-[#010101] rounded-l-[8px]'>SnapStore</button>
        <button className='px-4 w-[30vw] py-1 bg-[#404040] text-black font-poppins font-medium border-r border-[#010101] rounded-r-[8px]'>InteractiveUI</button>
      </div>
    </div>
  );
};

export default App;
