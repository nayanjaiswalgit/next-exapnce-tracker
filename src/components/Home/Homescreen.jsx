import SearchBar from "./SearchBar";
import Filter from "./Filter";
import Table from "./Table";
import Image from "next/image";

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
 const initialExpenses = [
    {
        icon: "Store",
        date: "2024-07-21T00:00:00.000Z",
        expenses: [],
        title: "Weekly groceries",
        total: 300,
        description: "Groceries for the week"
    },
    {
        transactionId: "12344555",
        icon: "Store",
        date: "2024-07-21T00:00:00.000Z",
        total: 300,
        description: "Groceries for the week",
        expenses: [],
        title: "Weekly groceries"
   },
     {
        transactionId: "12344555",
        icon: "Store",
        date: "2024-07-21T00:00:00.000Z",
        total: 300,
        description: "Groceries for the week",
        expenses: [],
        title: "Weekly groceries"
   },
     {
        transactionId: "12344555",
        icon: "Store",
        date: "2024-07-21T00:00:00.000Z",
        total: 300,
        description: "Groceries for the week",
        expenses: [],
        title: "Weekly groceries"
   },
     {
        transactionId: "12344555",
        icon: "Store",
        date: "2024-07-21T00:00:00.000Z",
        total: 300,
        description: "Groceries for the week",
        expenses: [],
        title: "Weekly groceries"
   },
     {
        transactionId: "12344555",
        icon: "Store",
        date: "2024-07-21T00:00:00.000Z",
        total: 300,
        description: "Groceries for the week",
        expenses: [],
        title: "Weekly groceries"
    },
     {
        transactionId: "12344555",
        icon: "Store",
        date: "2024-07-21T00:00:00.000Z",
        total: 300,
        description: "Groceries for the week",
        expenses: [],
        title: "Weekly groceries"
    },
     {
        transactionId: "12344555",
        icon: "Store",
        date: "2024-07-21T00:00:00.000Z",
        total: 300,
        description: "Groceries for the week",
        expenses: [],
        title: "Weekly groceries"
    }, {
        transactionId: "12344555",
        icon: "Store",
        date: "2024-07-21T00:00:00.000Z",
        total: 300,
        description: "Groceries for the week",
        expenses: [],
        title: "Weekly groceries"
    },


     {
        transactionId: "12344555",
        icon: "Store",
        date: "2024-07-21T00:00:00.000Z",
        total: 300,
        description: "Groceries for the week",
        expenses: [],
       title: "Weekly groceries"

    },
    {
        transactionId: "1234d4555",
        icon: "Store",
        date: "2024-07-21T00:00:00.000Z",
        expenses: [],
        title: "Weekly groceries"
    },
    {
        transactionId: "1234d4545655",
        icon: "Store",
        date: "2024-07-21T00:00:00.000Z",
        expenses: [],
        title: "Weekly groceries"
    },
    {
        icon: "Store",
        date: "2024-07-21T00:00:00.000Z",
        expenses: [
            {
                name: "Fruit and vegetables",
                quantity: 1,
                price: 10,
                category: "groceries"
            },
            {
                name: "Fruit and vegetables",
                quantity: 1,
                price: 10,
                category: "groceries"
            }
        ],
        title: "Weekly groceries"
    },
    {
        transactionId: "1234w4545dd655",
        icon: "Store",
        date: "2024-07-21T00:00:00.000Z",
        total: 300,
        description: "Groceries for the week",
        expenses: [
            {
                name: "Fruit and vegetables",
                quantity: 1,
                price: 10,
                category: "groceries"
            },
            {
                name: "Fruit and vegetables",
                quantity: 1,
                price: 10,
                category: "groceries"
            }
        ],
        title: "Weekly groceries"
    }
];
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
      dataIndex: "description",
      key: "name",
    },
    {
      title: "Reference No.",
      dataIndex: "Cheque/Reference No",
      key: "age",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "address",
      render : (date) =>new Date(date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 

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



  const data = []
  return (
    <div className="bg-[#fafafa]  w-full p-2 ">
    <div className="flex p-3 m-4 bg-white rounded-lg items-center justify-between">
      <SearchBar/>
      <Filter />
    </div>
    <div className="px-4 ">
     {initialExpenses?.length > 0 && <Table columns={columns} dataSource={initialExpenses  } />}
    </div>
  </div>
  );
};

export default Homescreen;
