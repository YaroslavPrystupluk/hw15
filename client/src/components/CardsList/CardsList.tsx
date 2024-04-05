import { ChangeEvent, FC } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CardNews from "../Card/CardNews";
import { IItem } from "../../interface/item";
import { useGetAllNews } from "../../hooks/useGetAllNews";
import PaginationBtn from "../Pagination";

const CardsList: FC = () => {
  const [serchParams, setSearchParams] = useSearchParams();
  const page = serchParams.get("page") ? Number(serchParams.get("page")) : 1;
  const limit = 12;
  const skip = page > 1 ? limit * (page - 1) : 0;
  const { newsposts, maxPageCount } = useGetAllNews(skip, limit);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setSearchParams(value.toString());
  };

  return (
    <>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {newsposts.map((item: IItem, index: number) => (
          <Link
            style={{ textDecoration: "none" }}
            key={index}
            to={`/${item.id}`}
          >
            <CardNews news={item} />
          </Link>
        ))}
      </div>
      <div>
        {!!maxPageCount && (
          <PaginationBtn
            count={maxPageCount}
            page={page}
            limit={limit}
            handleChange={handleChange}
          />
        )}
      </div>
    </>
  );
};

export default CardsList;
