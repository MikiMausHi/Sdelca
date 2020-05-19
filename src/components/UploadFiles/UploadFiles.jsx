import React, { useState } from "react";
import Button from "../UI/Button/Button";

const UploadFiles = () => {
  const [loadedFiles, setFiles] = useState([]);
  const [currentFile, setFile] = useState({ id: null, file: null });

  let inputElement;

  const onFileChange = e => {
    if (e.target.files[0]) {
      let name = e.target.files[0].name;
      name = name.split(".");
      name = "." + name[1];
      setFile({ ...currentFile, file: name });
      setFiles([...loadedFiles, { ...currentFile, file: name }]);
    }
  };

  const handleClick = position => e => {
    setFile({ id: position });
    inputElement.click();
  };

  return (
    <>
      <div className="photos">
        <div className="photos-line">
          <input
            type="file"
            className="photos-file"
            accept="video/*, image/*"
            ref={input => (inputElement = input)}
            onChange={onFileChange}
          />

          <div className="photos-loader" onClick={handleClick(1)}>
            {loadedFiles[0] && loadedFiles[0].file}
          </div>
          <div className="photos-loader" onClick={handleClick(2)}>
            {loadedFiles[1] && loadedFiles[1].file}
          </div>
          <div className="photos-loader" onClick={handleClick(3)}>
            {loadedFiles[2] && loadedFiles[2].file}
          </div>
          <div className="photos-loader" onClick={handleClick(4)}>
            {loadedFiles[3] && loadedFiles[3].file}
          </div>
          <div className="photos-loader" onClick={handleClick(5)}>
            {loadedFiles[4] && loadedFiles[4].file}
          </div>
        </div>
        <div className="photos-line">
          <div className="photos-loader" onClick={handleClick(6)}>
            {loadedFiles[5] && loadedFiles[5].file}
          </div>
          <div className="photos-loader" onClick={handleClick(7)}>
            {loadedFiles[6] && loadedFiles[6].file}
          </div>
          <div className="photos-loader" onClick={handleClick(8)}>
            {loadedFiles[7] && loadedFiles[7].file}
          </div>
          <div className="photos-loader" onClick={handleClick(9)}>
            {loadedFiles[8] && loadedFiles[8].file}
          </div>
          <div className="photos-loader" onClick={handleClick(10)}>
            {loadedFiles[9] && loadedFiles[9].file}
          </div>
        </div>
      </div>
      <textarea
        className="confirm-comment"
        placeholder="Комментарий для заказчика"
      />
      <div
        className="buttons"
        style={{ justifyContent: "flex-end", marginTop: "15px" }}
      >
        <Button type="primary">Запрос подтверждения</Button>
      </div>
    </>
  );
};

export default UploadFiles;
