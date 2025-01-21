import MainContainer from "@/components/MainContainer";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function Home() {
  return (
    <>
    

    <MainContainer>

        

    <div className="bg-black">
          
          <section className='relative w-full bg-bannerImg bg-repeat bg-cover h-screen container mx-auto'>
          <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center flex-col">
          <h1 className="text-white font-bold text-4xl md:text-6xl lg:text-8x1 flex flex-col" >L´ORGÂNICO<span className="text-primary-800 mx-auto" >MEDICINAL</span></h1>
          <p className="text-white font-bold m-2 text-center text-[12px] md:text-[14px] lg:text-[16px] " >Buscando saúde,energia e fontes de criatividade?</p>
          <a href="#products" className="text-white text-4xl cursor-pointer hover:text-purple-400 hover:scale-110 transition-all" ><MdKeyboardArrowDown  /></a>
          
          </div>
          </section>

          <section>
            
          </section>

          {/* <img className="w-full pt-40 h-screen container mx-auto" src="/cogbg04.png" alt="" /> */}
          
        </div>

      
    </MainContainer>
    
    </>
  );
}
