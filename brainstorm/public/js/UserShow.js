class UserShow extends React.Component {
  render() {
    return (
      <div className="container">
      <button className="button is-info" onClick={() => this.props.togglePage("ideaForm")}>New Idea</button>
          {this.props.loggedUser == this.props.selectedUser ? <h1>{this.props.selectedUser.username}</h1> : <h1>{this.props.selectedUser.username}</h1>}
          {this.props.selectedUser.ideas.length != 0 ? <h1>Ideas</h1> : ''}
          {(this.props.selectedUser == this.props.loggedUser) ? <button className='button is-warning is-small' onClick={() => this.props.togglePage("userEdit")}>Edit User</button> : ''}
          {this.props.selectedUser.ideas.map((idea, index) => {
              return (

                <div className="idea"onClick={() => this.props.ideaFinder(idea.id)}>
                  <p onClick={()=>this.props.deleteIdea(idea, index)}>X</p>
                  <input/>{idea.idea_title}
                  <textarea>{idea.idea_content}</textarea>
                  <h3>{this.props.selectedUser.username}</h3>
                </div>

          )}
        )}
      </div>

  )}
}
