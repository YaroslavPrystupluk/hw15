import { FC } from "react"
import Button from "../components/Button";
import CardsList from "../components/CardsList";
import { Link } from "react-router-dom";

const HomePage: FC = () => {
  return (
    <>
      <Link style={{ textDecoration: "none" }} to={"/new"}>
        <Button buttonText="Add news" />
      </Link>
      <div>
        <CardsList />
      </div>
    </>
  );
}

export default HomePage
