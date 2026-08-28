import React, { useEffect, useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import {addList,updateList,closeListModal, clearEditList,
} from "../../redux/Features/ListSlice";
import type { RootState, AppDispatch } from "../../store";

export const ListItemForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const isOpen = useSelector((state: RootState) => state.list.isListModalOpen);

  const editingList = useSelector((state: RootState) => state.list.editingList);

  const [category, setCategory] = useState("");

  useEffect(() => {
    if (editingList) {
      setCategory(editingList.category);
    } else {
      setCategory("");
    }
  }, [editingList]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingList) {
      dispatch(
        updateList({
          ...editingList,
          category,
        })
      );
    } else {
      dispatch(
        addList({
          category,
          numberOfItem: 0,
          completed: 0,
          dateCreated: new Date().toISOString(),
        })
      );
    }

    setCategory("");
    dispatch(clearEditList());
  };

  const handleCancel = () => {
    setCategory("");
    dispatch(clearEditList());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-4xl p-8 w-80">

        <form onSubmit={handleSubmit}>

          <Input
            label={editingList ? "Edit List" : "Title"}
            placeholder="Enter your list title"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <div className="flex gap-3 mt-4">

            <Button
              text={editingList ? "Update List" : "Create List"}
            />

            <Button
              text="Cancel"
            
              onClick={handleCancel}
            />

          </div>

        </form>

      </div>
    </div>
  );
};