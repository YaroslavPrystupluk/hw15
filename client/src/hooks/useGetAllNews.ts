import { useEffect, useState } from "react";
import domain from "../config/API";
import { IItem } from "../interface/item";

export const useGetAllNews = (
  skip: number,
  limit: number
): { newsposts: IItem[]; maxPageCount: number } => {
  const [newsposts, setNewsPosts] = useState<IItem[]>([]);
  const [maxPageCount, setMaxPageCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${domain}/newsposts?page=${skip}&size=${limit}`
      );
      if (!response.ok) {
        throw new Error(`Error Api: status ${response.status}`);
      }
      const { data }: { data: { items: IItem[]; maxPagesCount: number } } =
        await response.json();
		  
      setNewsPosts(data.items);
      setMaxPageCount(data.maxPagesCount);
    };

    fetchData();
  }, [skip, limit]);

  return { newsposts, maxPageCount };
};
