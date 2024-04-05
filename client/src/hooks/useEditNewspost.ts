import { useEffect, useState } from "react";
import domain from "../config/API";
import { IItem } from "../interface/item";
import { useParams } from "react-router-dom";
// import inMemoryToken from "../service/inMemoryToken";

export const useEditNewspost = ({title, text,}: {title: string; text: string;}) => {

	const {id} = useParams();
 if (!id) {
   throw new Error("No id provided");
 }

  const [editNewsPosts, setEditNewsPosts] = useState<IItem>({} as IItem);
  const TOKEN = localStorage.getItem("token");
useEffect(() => {
  const editNewspost = async () => {
    try {
      const response = await fetch(`${domain}/newsposts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          //  "Authorization": "Bearer " + inMemoryToken.getToken(),
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          title,
          text,
        }),
      });
      if (!response.ok) {
        throw new Error(`Error Api: status ${response.status}`);
      }
      const { data }: { data: IItem } = await response.json();
      setEditNewsPosts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  editNewspost();
},[TOKEN, id, text, title]);

  return editNewsPosts;
};
