class UserShow extends React.Component {
  render() {
    return (
      <div className="container">
          {this.props.loggedUser == this.props.selectedUser ? <h1>{this.props.selectedUser.username}</h1> : <h1>{this.props.selectedUser.username}</h1>}
          {(this.props.selectedUser == this.props.loggedUser) ? <button onClick={() => this.props.toggleState("userEdit")}>Edit User</button> : ''}
          {this.props.selectedUser.ideas.length != 0 ? <h1>Ideas</h1> : ''}
          {this.props.selectedUser.ideas.map((idea, index) => {
              return (
              <div className="container">
                <div className="idea"onClick={() => this.props.ideaFinder(idea.id)}>
                  <input/>{idea.idea_title}
                  <textarea>{idea.idea_content}</textarea>
                </div>
              </div>
          )}
        )}
      </div>

  )}
}
