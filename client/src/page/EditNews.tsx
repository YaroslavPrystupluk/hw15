import { FC, useState } from "react";
import Form from "../components/Form";
import { useLocation } from "react-router-dom";
import { useEditNewspost } from "../hooks/useEditNewspost";

const EditNews: FC = () => {
let {state} = useLocation();


  const [title, setTitle] = useState(state.news.title);
  const [text, setText] = useState(state.news.text);
const editNewspost = useEditNewspost({title, text });
  
  
const handleEditNewspost = async() => {
await editNewspost;
};


  return (
    <>
      <div>
        <h1>Edit news</h1>
      </div>
      <Form
		isEditing={true}
        handleEditNewspost={handleEditNewspost}
        title={title}
        updateTitle={setTitle}
        text={text}
        updateText={setText}
      />
    </>
  );
};

export default EditNews;
