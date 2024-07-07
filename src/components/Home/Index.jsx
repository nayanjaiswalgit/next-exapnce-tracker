import Homescreen from "./Homescreen"
import Sidebar from "./Sidebar"



const Index = () => {
  return (
    <div className=" h-full w-full bg-[#343434]  rounded-[1rem] md-rounded-[2rem]  max-w-screen-xl m-auto flex overflow-none" >
<Sidebar/>
<Homescreen/>

    </div>
  )
}



export default Index