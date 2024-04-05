import { useState } from "react";
import domain from "../config/API";
import { IItem } from "../interface/item";
// import inMemoryToken from "../service/inMemoryToken";

export const useAddNewspost = ({title, text}: {title: string, text: string}) => {

  const [addNewsPosts, setAddNewsPosts] = useState<IItem>({} as IItem);
  const TOKEN = localStorage.getItem("token");

    const addNewspost = async () => {
      try {
        const response = await fetch(`${domain}/newsposts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
				// "Authorization": "Bearer " + inMemoryToken.getToken(),
				"Authorization": `Bearer ${TOKEN}`,
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
        setAddNewsPosts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
return { addNewsPosts, addNewspost };

};