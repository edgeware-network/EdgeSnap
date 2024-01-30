import { Link, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home, InteractiveUI, SnapStore } from './pages';
import { navLinks } from './constants';

const App = () => {
  return (
    <div className='bg-[#000] z-0 min-w-full relative min-h-screen flex flex-col items-center gap-10'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/snap-store' element={<SnapStore />} />
        <Route path='interactive-ui' element={<InteractiveUI />} />
      </Routes>
      {/* bottom nav for mobile */}
      <div className='flex z-10 sm:hidden w-[80vw] h-[48px] sticky text-white bottom-4 gap-1 items-center bg-inherit justify-center rounded-[8px] shadow-[1px_2px_20px_black] p-1'>
        {navLinks.map((item) => ((item.name !== "EdgeSnap") && 
          <Link 
            to={item.link}
            key={item.name}
            className={`px-4 py-2 w-full text-sm ${item.name === "snap-store" ? "bg-primary-800 hover:bg-primary-900" : "bg-[#404040] hover:bg-[#282828] text-black"} flex items-center justify-center font-unbounded cursor-pointer font-normal rounded-[8px]`}
            >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default App;
