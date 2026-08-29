import React from "react";
import { Text } from "../ui/Text";
import { deleteList, startEditList, type ShoppingList } from "../../redux/Features/ListSlice";
import { Button } from "../ui/Button";
import { TrashIcon, EditIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type{ RootState } from "../../store";


interface ListCardProps {
  shoppingList: ShoppingList;
}

export const ListCard: React.FC<ListCardProps> = ({shoppingList,}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const items = useSelector((state: RootState) => state.items.items);
  const itemCount = items.filter((item) => String(item.listId) === String(shoppingList.id)
).length;

  const handleCardClick = () => {
  if (shoppingList.id === undefined) return;
       navigate(`/lists/${shoppingList.id}`, {
       state: shoppingList,
  });
};
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (shoppingList.id === undefined) return;
     dispatch(deleteList(shoppingList.id));
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(startEditList(shoppingList));
  }


  return (
    <div className=" h-80 w-80 rounded-3xl  has-[:hover]:bg-gray-100 flex transition-colors duration-500">
    <div className="rounded-4xl p-8 mt-5 w-70 h-70 border border-gray-300 xl hover:bg-gray-100 transition-colors duration-200" onClick={handleCardClick}>
      <div className="p-2">
        
        <Text variant={"h2"} className="font-bold text-2xl text-[#001C44]">{shoppingList.category}</Text>
        <Text variant={"p"} className="p-2 text-[#001C44]">{itemCount}: items</Text>
        <Text variant={"p"}className="text-[#001C44]">{shoppingList.completed}completed</Text>
        <Text>Created: {new Date(shoppingList.dateCreated).toLocaleDateString()}</Text>
      </div>

      <div className="flex gap-4 mt-4">
        <Button text="" className="w-12 h-12 mt-3 bg-red-300 rounded-full"onClick={handleDelete}/>
        <TrashIcon className="absolute mt-5 ml-3 text-red-700" />
        <Button text="" className="w-11 h-11 mt-4" onClick={handleEdit} />
        <EditIcon className="absolute ml-19 mt-6" />
      </div>
    </div>
    </div>
  );
};