import { useEffect } from "react";
import {  useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { fetchListItems } from "../../redux/Features/ListItemSlice";
import { fetchLists } from "../../redux/Features/ListSlice";
import { openListModal } from "../../redux/Features/ListItemSlice";
import { Text } from "../ui/Text";
import { ListItemCard } from "./ListItemCard";
import { ListForm } from "./ListItemForm";
import { Button } from "../ui/Button";
import { PlusIcon } from "lucide-react";



export const ListItems = () => {
  const { listId } = useParams<{ listId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.items.items);
  const list = useSelector((state: RootState) =>state.list.shoppingList.find(
      (list) => String(list.id) === String(listId)
    )
);
 

  useEffect(() => {
    if (listId) {
      dispatch(fetchListItems(listId));
    }
  }, [listId, dispatch]);

  useEffect(() => {
  dispatch(fetchLists());
  dispatch(fetchListItems(listId!));
}, [dispatch, listId]);

  if (!listId) {
    return <Text variant="p">List not found</Text>;
  }

  const currentItems = items.filter((item) => String(item.listId) === String(listId));
   

  return (
    <>

      <div className="w-300 h-50 bg-blue-50 ml-10 rounded-3xl mt-5 ">
          {list && (
        <div>
          <Text variant="h2">{list.category}</Text>
          <Text variant="p">Items: {currentItems.length}</Text>
          <Text variant={'p'}>Created: {new Date(list.dateCreated).toLocaleDateString()}</Text>
          
        </div>
          )}
      </div>

      <ListForm listId={listId} />

      <div>
        {currentItems.length === 0 ? (
          <Text variant="p">No items in this list yet.</Text>
        ) : (
          currentItems.map((item) => (
            <ListItemCard
              key={item.id}
              ListItem={item}
            />
            
          ))
        )}
         <Button text={"Add List"} className="w-50 ml-260 mt-10" id="openModalBtn" onClick={() => dispatch(openListModal())}/>
         <PlusIcon className="ml-168 text-white absolute -mt-9" />
      </div>
    </>
  );
};