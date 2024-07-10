import React from 'react'
import {Link} from 'react-router-dom';
import {BsArrowBarRight } from 'react-icons/bs';
function ServiceCard({item , index}) {
    const { name, desc , bgColor  , textColor} = item;
  return (
    <>   
      <div className="relative py-[30px] px-3 lg:px-5 border border-solid border-gray-500 rounded-lg  bg-[url('./assets/images/hero-bg.png')] bg-no-repeat bg-center bg-cover bg-fixed w-full h-full leading-[100px]  ">
          <h2 className="text-[26px] leading-9 text-headingColor font-[700]">{name}</h2>
          <p className="text-[16px] leading-7 font-[400] text-textColo mt-4">{desc}</p>
          <div className='flex items-center justify-between mt-[10px] transform transition-transform hover:scale-150'>
          <a href={`https://www.google.com/search?q=${name}&sca_esv=d7773eb477db942c&sxsrf=ADLYWIINJldBvnB50O33oRiIYBP4LuY1Xw%3A1715193586225&source=hp&ei=8sY7ZsXsC5-JjuMPrJ2j2AU&iflsig=AL9hbdgAAAAAZjvVAlBL9G9WaLWQxLuuSowBVJ5-TBkS&ved=0ahUKEwjFrbSD2v6FAxWfhGMGHazOCFsQ4dUDCA0&uact=5&oq=Burn+Treatment&gs_lp=Egdnd3Mtd2l6Ig5CdXJuIFRyZWF0bWVudDIIEAAYgAQYsQMyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgARI-xlQAFjGF3AFeACQAQCYAYACoAHACKoBBTAuNC4yuAEDyAEA-AEB-AECmAILoALwCKgCCsICChAjGIAEGCcYigXCAgsQABiABBixAxiDAcICEBAuGIAEGNEDGEMYxwEYigXCAhYQLhiABBixAxjRAxhDGIMBGMcBGIoFwgILEC4YgAQYsQMYgwHCAg4QLhiABBixAxjHARivAcICGRAuGIAEGLEDGNEDGEMYgwEYxwEYyQMYigXCAhMQLhiABBixAxhDGMcBGIoFGK8BwgILEAAYgAQYkgMYigXCAg0QABiABBixAxhDGIoFwgINEC4YgAQYsQMYQxiKBcICChAuGIAEGEMYigXCAhAQLhiABBixAxhDGIMBGIoFwgIKEAAYgAQYQxiKBcICBxAjGCcY6gKYAwKSBwU1LjQuMqAHl0Q&sclient=gws-wiz`} className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[10px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
              <BsArrowBarRight className='group-hover:text-white w-6 h-5' />
          </a>

          </div>
      </div>
    </>
  )
}

export default ServiceCard;