import { useState } from "react";
import domain from "../config/API";
// import inMemoryToken from "../service/inMemoryToken";

export const useDeleteNewspost = (id: string) => {
const [deletedNewsPostId, setDeletedNewsPostId] = useState<string | null>(null);
const TOKEN = localStorage.getItem("token");
    const deleteNewspost = async () => {
      try {
        const response = await fetch(`${domain}/newsposts/${id}`, {
          method: "DELETE",
          headers: {
            // "Authorization": "Bearer " + inMemoryToken.getToken(),
            Authorization: `Bearer ${TOKEN}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error Api: status ${response.status}`);
        }
		 setDeletedNewsPostId(id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    return { deletedNewsPostId, deleteNewspost };
};
