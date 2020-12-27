import React from "react";
import axios from "axios";
import { GET_LIST_OF_FILES_URL } from "../constants";

class FileList extends React.Component {
  componentDidMount = () => {
    axios.get(GET_LIST_OF_FILES_URL()).then((response) => console.log(response));
  };

  render() {
    return <div>THis is file list</div>;
  }
}

export default FileList;
