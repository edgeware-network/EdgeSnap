import React from 'react';

export interface SnapProps {
  name: string;
  img: string;
  description: string;
}

const SnapCard = (props: SnapProps): React.JSX.Element => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex overflow-hidden items-center justify-center rounded-[12px]'>
        <img src={props.img} alt={props.name} className='w-[50px] h-[50px] absolute' />
        <div className={`${props.name === "Polkadot" ? "bg-Polkadot": props.name === "Edgeware" ? "bg-Edgeware": props.name === "Kusama" ? "bg-Kusama": "bg-Astar"} bg-cover bg-center rounded-[12px] bg-no-repeat items-center flex justify-center w-full h-[176px] scale-[1.25] blur-[55px] contrast-[0.9] saturate-[1.3]`}>
        </div>
      </div>
      <div className='flex items-center gap-4 justify-between p-2'>
        <img src={props.img} className="w-10 rounded-full h-10" alt={props.name} />
        <div className='flex flex-col items-center justify-center text-[#c9c9c9]'>
          <h3 className='text-md font-unbounded'>{props.name}</h3>
          <p className='text-xs font-poppins font-light text-[#c9c9c9]'>{props.description}</p>
        </div>
        <button className='py-1 px-2 bg-primary-650 font-poppins font-light text-sm hover:bg-primary-900 active:scale-95 border border-[#010101] rounded-[8px]'>Install</button>
      </div>
    </div>
  );
};

export default SnapCard;