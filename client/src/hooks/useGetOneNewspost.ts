import { useEffect, useState } from "react";
import domain from "../config/API";
import { IItem } from "../interface/item";

export const useGetOneNewspost = (id: string): IItem => {
  const [oneNewsPost, setOneNewsPost] = useState<IItem>({} as IItem);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${domain}/newsposts/${id}`);
        if (!response.ok) {
          throw new Error(`Error Api: status ${response.status}`);
        }
        const { data }: { data: IItem } = await response.json();
		  console.log(data);
		  

		  setOneNewsPost(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return oneNewsPost;
};
