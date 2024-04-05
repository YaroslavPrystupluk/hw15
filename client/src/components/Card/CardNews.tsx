import { FC } from "react"

import {Card, CardActionArea, CardContent, Typography} from "@mui/material";
import { IItem } from "../../interface/item";

interface Props {
  news: IItem;
}



const CardNews: FC<Props> = ({ news }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{
              WebkitLineClamp: 1,
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
            }}
          >
            {news.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{
              WebkitLineClamp: 3,
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
            }}
          >
            {news.text}
          </Typography>
          <p>Author's Email: {news.author.email}</p>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardNews
