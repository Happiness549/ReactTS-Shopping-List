import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Text } from "../ui/Text";
import type { ShoppingList } from "../../redux/Features/ListSlice";
import type { ListItem } from "../../redux/Features/ListItemSlice";

export const SharedList = () => {
  const { listId } = useParams<{ listId: string }>();

  const [list, setList] = useState<ShoppingList | null>(null);
  const [items, setItems] = useState<ListItem[]>([]);

  useEffect(() => {
    if (!listId) return;

    const fetchSharedList = async () => {
      try {
        // Get the list
        const listResponse = await fetch(
          `http://localhost:3000/lists/${listId}`
        );

        if (!listResponse.ok) {
          throw new Error("List not found");
        }

        const listData: ShoppingList = await listResponse.json();
        setList(listData);

        // Get the items belonging to that list
        const itemsResponse = await fetch(
          `http://localhost:3000/itemList?listId=${listId}`
        );

        if (!itemsResponse.ok) {
          throw new Error("Items could not be loaded");
        }

        const itemsData: ListItem[] = await itemsResponse.json();
        setItems(itemsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSharedList();
  }, [listId]);

  if (!list) {
    return <Text variant="p">Loading list...</Text>;
  }

  return (
    <div className="p-8">

      {/* LIST INFORMATION */}
      <div className="mb-8">
        <Text variant="h1" className="font-bold text-3xl">
          {list.category}
        </Text>

        <Text variant="p">
          Created:{" "}
          {new Date(list.dateCreated).toLocaleDateString()}
        </Text>

        <Text variant="p">
          Items: {items.length}
        </Text>
      </div>

      {/* ITEMS */}
      {items.length === 0 ? (
        <Text variant="p">
          No items in this list yet.
        </Text>
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            className="rounded-4xl flex p-6 mt-5 border border-gray-300"
          >
            <div className="flex gap-8">
              <Text variant="p">
                {item.title}
              </Text>

              <Text variant="p">
                Category: {item.category}
              </Text>

              <Text variant="p">
                Qty: {item.Quantity}
              </Text>

              {item.notes && (
                <Text variant="p">
                  Notes: {item.notes}
                </Text>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};