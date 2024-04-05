import { FC, useState } from "react";
import Form from "../components/Form";
import { useAddNewspost } from "../hooks/useAddNewspost";


const CreateNews: FC = () => {

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const {addNewspost} = useAddNewspost({ title, text });

  
const handleCreateNewspost = () => {
addNewspost();
  setTitle("");
  setText("");
};

  return (
    <>
      <div>
        <h1>Create news</h1>
      </div>
      <Form
        handleCreateNewspost={handleCreateNewspost}
        title={title}
        updateTitle={setTitle}
        text={text}
        updateText={setText}
      />
    </>
  );
};

export default CreateNews;
