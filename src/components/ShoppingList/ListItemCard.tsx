import React from "react";
import { Text } from "../ui/Text";
import { Button } from "../ui/Button";
import { TrashIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import {
  deleteListItem,
  type ListItem,
} from "../../redux/Features/ListItemSlice";

interface ListCardProps {
  ListItem: ListItem;
}

export const ListItemCard: React.FC<ListCardProps> = ({
  ListItem,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    if (ListItem.id === undefined) return;

    dispatch(deleteListItem(ListItem.id));
  };

  return (
    <div className="rounded-4xl p-8 mt-5 w-70 h-70 border border-gray-300 xl">
      <div>
        <Text variant={"p"}>{ListItem.image}</Text>

        <Text variant={"p"}>{ListItem.title}</Text>

        <Text variant={"p"}>{ListItem.category}</Text>

        <Text variant={"p"}>{ListItem.Quantity}</Text>

        <Text variant={"p"}>{ListItem.notes}</Text>
      </div>

      <div className="flex gap-4 mt-4">
        <Button
          text=""
          className="w-12 h-12 mt-3 bg-red-300 rounded-full"
          onClick={handleDelete}
        />

        <TrashIcon className="absolute mt-5 ml-3 text-red-700" />
      </div>
    </div>
  );
};