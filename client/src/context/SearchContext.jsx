import {
  createContext,
  useContext,
  useMemo,
  useState
} from "react";


const SearchContext = createContext();



export function SearchProvider({children}){


const [search,setSearch] = useState("");



const [items,setItems] = useState([


{
name:"Dashboard",
type:"Page",
path:"/dashboard"
},


{
name:"Products",
type:"Page",
path:"/products"
},


{
name:"Orders",
type:"Page",
path:"/orders"
},


{
name:"Reports",
type:"Page",
path:"/reports"
},


{
name:"Staff",
type:"Page",
path:"/staff"
},


{
name:"Settings",
type:"Page",
path:"/settings"
},


{
name:"Profile",
type:"Page",
path:"/profile"
}


]);






function addSearchItems(newItems){


setItems(prev=>{


const merged=[

...prev,

...newItems

];



return merged.filter(

(item,index,self)=>

index === self.findIndex(

x=>x.name === item.name &&
x.type === item.type

)

);


});


}








const results = useMemo(()=>{


if(!search.trim()){

return [];

}



return items.filter(item=>


item.name
.toLowerCase()
.includes(
search.toLowerCase()
)

);


},[search,items]);







return(


<SearchContext.Provider


value={{

search,

setSearch,

results,

addSearchItems

}}


>


{children}


</SearchContext.Provider>


);


}







export function useSearch(){


return useContext(SearchContext);


}