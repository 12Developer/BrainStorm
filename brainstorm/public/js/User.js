class User extends React.Component {
  render() {
    return (
      <div>
        <div>
          <div>
            <img
              src={this.props.loggedUser.avatar}
              onClick={() => {
                  this.props.changeSelectedUser(this.props.loggedUser);
                  this.props.togglePage("userShow");}}/>
          </div>
          <h3
            className="user_welcome"
            onClick={() => {
              this.props.changeSelectedUser(this.props.loggedUser);
              this.props.togglePage("userShow");}}>
                {this.props.loggedUser.user_name}
          </h3>
          <button className="button is-info" onClick={() => this.props.togglePage("ideaForm")}>New Idea</button>
        </div>
      </div>
    )
  }
}
