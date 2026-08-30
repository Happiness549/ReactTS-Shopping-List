 
 import {useSelector} from 'react-redux'
 import type  {RootState} from '../../store'
 import { ListCard } from './ListCard'
 import { ShoppingCartIcon } from 'lucide-react'
 import { Clipboard } from 'lucide-react'
 import { PlusIcon } from 'lucide-react'
 import { Button } from '../ui/Button'
 import { Text } from '../ui/Text'
 import { Card } from '../ui/Card'
 import { useDispatch } from 'react-redux'
 import type{ AppDispatch } from '../../store'
 import { openListModal } from '../../redux/Features/ListSlice'
 import { ListItemForm } from './ListForm'
 import { useMemo, useEffect } from 'react';
 import { setSortBy, setSortOrder, setSearchTerm } from '../../redux/Features/SearchSlice';
 import { useSearchParams } from 'react-router-dom';

 

 export const ShoppingList=() => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();

    const lists = useSelector((state: RootState) => state.list.shoppingList);
    const userData = useSelector((state: RootState) => state.login.userData);
    const query = useSelector((state: RootState) => state.search.searchTerm);
    const sortBy = useSelector((state: RootState) => state.search.sortBy);
    const sortOrder = useSelector((state: RootState) =>state.search.sortOrder)

    //When the user searches, update the URL.
        useEffect(() => {
      if (query.trim()) {
        searchParams.set('category', query.trim());
      } else {
        searchParams.delete('category');
      }

      setSearchParams(searchParams);
    }, [query]);
    
    
      // When the URL changes, update Redux and therefore update the displayed lists.
      useEffect(() => {
    const categoryFromUrl = searchParams.get('category') || '';

    if (categoryFromUrl !== query) {
      dispatch(setSearchTerm(categoryFromUrl));
    }
  }, [searchParams]);


    // Syncs sorting options from Redux to the URL
  useEffect(() => {
  if (sortBy) {
    searchParams.set('sort', sortBy);
    searchParams.set('order', sortOrder);
  } else {
    searchParams.delete('sort');
    searchParams.delete('order');
  }
  setSearchParams(searchParams);
}, [sortBy, sortOrder]);



  const filteredLists = useMemo(() => {
  let result = [...lists];

    if (query.trim()) {
      const lowerQuery = query.trim().toLowerCase();

      result = result.filter((item) =>
        item.category.toLowerCase().includes(lowerQuery)
      );
    }
  // Sort
  if (sortBy === 'category') {
    result.sort((a, b) =>
      sortOrder === 'asc'
        ? a.category.localeCompare(b.category)
        : b.category.localeCompare(a.category)
    );
  }

  if (sortBy === 'dateCreated') {
    result.sort((a, b) =>
      sortOrder === 'asc'
        ? new Date(a.dateCreated).getTime() -
          new Date(b.dateCreated).getTime()
        : new Date(b.dateCreated).getTime() -
          new Date(a.dateCreated).getTime()
    );
  }

  return result;
}, [lists, query, sortBy, sortOrder]);

    return(
       <>
       {filteredLists.length === 0 ? (
  <>
    <div className="flex">
      <Text variant={'h1'} className='font-bold text-3xl'>Welcome: {userData?.name}</Text>
      <div className="rounded-full h-40 w-40 ml-130 mt-30 bg-[#BCFEFE]">
      <Clipboard size={120} className="mt-5 ml-5 text-[#2D99AE]"/>
      </div>
      <ShoppingCartIcon size={120} className="mt-40 text-[#2D99AE]"/>
    </div>

     <div className="mt-20 text-center">
      <Text variant={"h1"} className="text-3xl font-bold text-[#001C44]"> You don't have any lists yet</Text>
      <Text variant={"p"} className="text-2xl text-[#001C44] mt-5"> Create your first shopping list and keep <br />everything organized.</Text>
      <Button text={"Add List"} className="mt-8 w-50 relative mr-10" onClick={() => dispatch(openListModal())}/>
      <PlusIcon className="ml-132 text-white absolute -mt-9" />
    </div> 

    
  </>
) : (
  <>
      <div className="flex gap-4 mb-6">
      <select
        value={sortBy}
        onChange={(e) =>
          dispatch(
            setSortBy(e.target.value as 'category' | 'dateCreated' | '')
          )
        }
        className="rounded-lg border border-gray-300 px-4 py-2"
      >
        <option value="">Sort by...</option>
        <option value="category">Category</option>
        <option value="dateCreated">Date added</option>
      </select>

      <select
        value={sortOrder}
        onChange={(e) =>
          dispatch(setSortOrder(e.target.value as 'asc' | 'desc'))
        }
        className="rounded-lg border border-gray-300 px-4 py-2"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>

    {filteredLists.map((listItem) => (
      <ListCard
        key={listItem.id}
        shoppingList={listItem} 
      /> 
    ))}

     

    <Card className='flex  bg-[#BCFEFE] w-300 mt-10 justify-cente text-center h-30 mt-10'>
      <div className='text-center'>
         <Text variant={'h1'} className='font-bold text-2xl text-[#001C44]'>Need something quickly?</Text>
         <Text variant={'p'}>Add a new shopping list in seconds</Text>
      </div>
      <div>
         <Button text={"Add List"} className="w-50 ml-160" id="openModalBtn" onClick={() => dispatch(openListModal())}/>
         <PlusIcon className="ml-168 text-white absolute -mt-9" />
         <ListItemForm/>
      </div> 
    </Card>
  </>
)}
  </>
)}