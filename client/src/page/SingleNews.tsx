import { FC } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { useGoBack } from "../hooks/useGoBack";
import Button from "../components/Button";
import { useGetOneNewspost } from "../hooks/useGetOneNewspost";
import { useDeleteNewspost } from "../hooks/useDeleteNewspost";

const SingleNews: FC = () => {
  const { id } = useParams();
  const goBack = useGoBack();
  const navigate = useNavigate();

const news = useGetOneNewspost(id!);
const email = news?.author?.email




const {deleteNewspost} = useDeleteNewspost(id!);

 const handleDelete = () => {
   deleteNewspost();
   navigate(-1);
 };

  return (
    <>
      <Button onClick={goBack} buttonText="Go back" color="warning" />
      {news && (
        <>
          <Typography variant="h4">{news.title}</Typography>
          <Typography>{news.text}</Typography>
          <p>Author's Email: {email}</p>

          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Link
              style={{ textDecoration: "none" }}
              to={`/${news.id}/edit`}
              state={{ news }}
            >
              <Button buttonText="Edit news" />
            </Link>
            <Button
              onClick={handleDelete}
              buttonText="Delete news"
              color="error"
            />
          </div>
        </>
      )}
    </>
  );
};

export default SingleNews;
