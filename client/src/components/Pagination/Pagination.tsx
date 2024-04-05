import { ChangeEvent, FC } from "react";
import { Pagination, PaginationItem, Stack } from "@mui/material";
import { Link } from "react-router-dom";

interface IProps {
  count: number;
  limit: number;
  page: number;
  handleChange: (event: ChangeEvent<unknown>, value: number) => void;
}

const PaginationBtn: FC<IProps> = ({ count, page, limit, handleChange }) => {
	
  return (
    <Stack mt={2} spacing={2} style={{display: "flex", alignItems: "center"}}>
      <Pagination
        count={count}
        page={page}
        onChange={handleChange}
        color="primary"
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={{ pathname: "/", search: `?page=${item.page}&size=${limit}` }}
            {...item}
          />
        )}
      />
    </Stack>
  );
};

export default PaginationBtn;
