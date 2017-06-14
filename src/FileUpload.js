import React, { Component } from 'react';

class FileUpload extends Component {
	constructor(){
		super();
		this.state = {
			uploadValue : 0
		};
	}


	render(){
		return(
			<div>

				<progress value= {this.state.uploadValue} max="100"></progress>
				<br/>

				<input className="btn-floating btn-large red" type="file" onChange={this.props.onUpload} />
			</div>
			);
	}
} 

export default FileUpload;