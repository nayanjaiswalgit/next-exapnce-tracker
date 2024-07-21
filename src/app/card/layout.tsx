import Sidebar from "@/components/Home/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen py-12 w-screen overflow-hidden p-auto bg-gradient-to-r  from-green-200 via-green-300 to-green-100">
      <div className=" m-auto h-full bg-[#343434]  rounded-[1rem] md-rounded-[2rem]  max-w-screen-xl  flex ">
        <Sidebar />
        <div className="overflow-hidden h-full w-full  overflow-y-auto bg-white">{children}</div>
      </div>
    </div>
  );
}
