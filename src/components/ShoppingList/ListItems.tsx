import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { fetchListItems } from "../../redux/Features/ListItemSlice";
import { Text } from "../ui/Text";
import { ListItemCard } from "./ListItemCard";
import { ListForm } from "./ListForm";

export const ListItems = () => {
  const { listId } = useParams<{ listId: string }>();

  const dispatch = useDispatch<AppDispatch>();

  const items = useSelector((state: RootState) => state.items.items);

  useEffect(() => {
    if (listId) {
      dispatch(fetchListItems(listId));
    }
  }, [listId, dispatch]);

  if (!listId) {
    return <Text variant="p">List not found</Text>;
  }

  const currentItems = items.filter((item) => String(item.listId) === String(listId));

  return (
    <>
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
      </div>
    </>
  );
};