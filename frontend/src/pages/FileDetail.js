import React from 'react';

class FileDetail extends React.Component {
  
  render() {
    return <div>THis is file detail for file id {this.props.match.params.fileId}</div>
  }
}

export default FileDetail;
