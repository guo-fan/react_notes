export default class Comment extends Component {
	state = {
		comments: [
			{ name: "Tom", content: "aaa" },
			{ name: "Jack", content: "bbb" }
		]
	}
	addComment = (comment) => {
		var comments = this.state.comments;
		comments.unshift(comment);
		this.setState({ comments });
	}
	deleteComment = (index) => {
		var comments = this.state.comments;
		comments.splice(index, 1);
		this.setState({ comments });
	}

	render() {
		return (
			<div>
				<CommentAdd addComment={this.addComment}></CommentAdd>
				<CommentList comments={this.state.comments} deleteComment={this.deleteComment}></CommentList>
			</div>
		);
	}
}

class CommentAdd extends Component {
	state = {
		name: "",
		content: "",
	}
	handleSubmit = () => {
		var comment = this.state;
		this.props.addComment(comment);
		this.setState({
			name: "",
			content: ""
		});
	}
	handleNameChange = (e) => {
		const name = e.target.value;
		this.setState({ name });
	}

	render() {
		return (
			<div>
				<input value={name} onChange={this.handleNameChange}></input>
				<button onClick={this.handleSubmit}></button>
			</div>
		);
	}
}

class CommentList extends Component {
	render() {
		var display = this.props.commetns.length === 0 ? "block" : "none";
		return (
			<div>
				<p style={display}>暂无评论</p>
				<ul>
					{
						this.props.comments.map((item, index) =>
							<CommentItem
								comment={item} 
								deleteComment={this.props.deleteComment}
								key={index}
								index={index}
							>
							</CommentItem>)
					}
				</ul>
			</div>
		);
	}
}

class CommentItem extends Component{
	handleDelete = ()=>{
		const {deleteComment,comment,index} = this.props;
		if(window.confirm(`确定删除${comment.name}的评论吗`)){
			deleteComment(index);
		}
	}

	render(){
		retrun (
			<li>
				<a onClick={this.handleDelete}>删除</a>
				<p>{this.props.comment.name}</p>
				<p>{this.props.comment.content}</p>
			</li>
		);
	}
}

