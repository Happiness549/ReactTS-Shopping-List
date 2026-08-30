import React from "react";
import { Text } from "../ui/Text";
import { Button } from "../ui/Button";
import { TrashIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import {deleteListItem,type ListItem,} from "../../redux/Features/ListItemSlice";
import { startEditList } from "../../redux/Features/ListItemSlice";
import { EditIcon } from "lucide-react";

interface ListCardProps {
  ListItem: ListItem;
}

export const ListItemCard: React.FC<ListCardProps> = ({ ListItem,}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    if (ListItem.id === undefined) return;
         dispatch(deleteListItem(ListItem.id));
  };

  return (
    <div className="rounded-4xl flex p-8 mt-5 w-300 h-25 border border-gray-300 xl ml-10">
      <div className='flex gap-25'>
        <Text variant={"p"}>{ListItem.image}</Text>

        <Text variant={"p"}>{ListItem.title}</Text>
        <div className='bg-[#BCFEFE] w-25 h-15'><Text variant={"p"}>{ListItem.category}</Text></div>

        

        <Text variant={"p"}>Qty:  {ListItem.Quantity}</Text>

        <Text variant={"p"}>Notes:  {ListItem.notes}</Text>
      </div>

      <div className="flex gap-4 mt-4 ml-25 -mt-10">
        <Button
          text=""
          className="w-12 h-12 mt-3 bg-red-300 rounded-full "
          onClick={handleDelete}
        />
        <TrashIcon className="absolute mt-5 ml-3 text-red-700" />
        <Button text="" className="w-11 h-11 mt-4" onClick={() => dispatch(startEditList(ListItem))}/>
        <EditIcon className="absolute ml-19 mt-6" />
      </div>
    </div>
  );
};