'use server'
import { addItemToList } from "./data/addItemToList";
import { revalidatePath } from "next/cache";

export async function addItemAction (
  prevState: {
    item: string,
    message: string,
  },
  formData: FormData,
  id: string
) {
  const newItem = formData.get("item") as string;
  if (!newItem) {
    return {
      item: '',
      message: 'failure'
    };
  }
  await addItemToList(newItem, id);
  revalidatePath('/shopping-list')
  return {
    item: '',
    message: 'success'
  }
}