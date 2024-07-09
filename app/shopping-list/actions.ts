'use server'
import { addItemToList } from "@/lib/addItemToList";
import { revalidatePath } from "next/cache";

export async function addItemAction (
  prevState: {
    item: string,
    message: string,
  },
  formData: FormData
) {
  const newItem = formData.get("item") as string;
  if (!newItem) {
    return {
      item: '',
      message: 'failure'
    };
  }
  await addItemToList(newItem);
  revalidatePath('/shopping-list')
  return {
    item: '',
    message: 'success'
  }
}