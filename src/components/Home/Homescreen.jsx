import SearchBar from "./SearchBar";
import Filter from "./Filter";
import Table from "./Table";
import Image from "next/image";
import { fetchExpense } from "@/lib/data";

const iconMap = {
  'Amazon': 'amazon.png',
  'Swiggy': 'swiggy.png',
  'DMart': 'dmart.png',
  'Flipkart': 'flipkart.png',
  'Zomato': 'zomato.png',
  'Paytm': 'paytm.png',
  'BigBasket': 'bigbasket.png',
  'Reliance Retail': 'reliance.png',
  'Myntra': 'myntra.png',
  'Tata Cliq': 'tatacliq.png',
  'Snapdeal': 'snapdeal.png',
  'JioMart': 'jiomart.png',
  'Blinkit': 'blinkit.png',
  'Uber Eats': 'ubereats.png',
  'PhonePe': 'phonepe.png'
};


function renderIcon(title) {
  for (const key in iconMap) {
    if (title.toLowerCase().includes(key.toLowerCase())) {
      return iconMap[key];
    }
  }
  return 'default-icon.png';
}






const Homescreen = async () => {

  const {data} =  await fetchExpense()


  const columns = [
    {
      title: "icon",
      key: "Particulars",
      dataIndex: "Particulars",
      render : (text)=> <Image src={"/company_logo/zomato.png"} alt="hello" width={25} height={25} className="rounded-lg"/>,
      className : "p-auto px-4"
    },
    {
      title: "Description",
      dataIndex: "Particulars",
      key: "name",
    },
    {
      title: "Reference No.",
      dataIndex: "Cheque/Reference No",
      key: "age",
    },
    {
      title: "Date",
      dataIndex: "Date",
      key: "address",
    },
    {
      title: "Amount",
      key: "amount",
      dataIndex: "amount",
      render: (text,data) => <div className=" font-semibold"> 

      {data.Debit && data.Debit !== '-' &&<p className="text-red-500 text-sm"> - {data.Debit}</p>}
      {data.Credit  &&  data.Credit !== '-'  && <p className="text-lime-400 text-sm"> + {data.Credit}</p>}


      </div>
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
    },
    
  ];




  return (
    <div className="bg-[#fafafa]  w-full p-2 ">
    <div className="flex p-3 m-4 bg-white rounded-lg items-center justify-between">
      <SearchBar/>
      <Filter />
    </div>
    <div className="px-4 ">
      {/* <Table columns={columns} dataSource={data?.filter((text)=>text.Balance)} /> */}
    </div>
  </div>
  );
};

export default Homescreen;
