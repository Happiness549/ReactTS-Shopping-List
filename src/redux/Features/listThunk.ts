import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ShoppingList } from "./ListSlice";

export const addList = createAsyncThunk("lists/addList",
    async(newList: Omit<ShoppingList, "id">) =>{
        const response = await fetch("http:localhost:3000/lists",
            {
                method: "POST",
                headers: {
                    "Contene-Type": "application/json",
                },
                body: JSON.stringify(newList),
            } );
                
            if(!response.ok){
            throw new Error("Failed to add list");
        }
        const data =await response.json();
        return data; 
        }

    
);