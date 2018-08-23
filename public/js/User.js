class User extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h3
            onClick={() => {
              this.props.changeSelectedUser(this.props.loggedUser);
              this.props.togglePage("userShow");}}>
                {this.props.loggedUser.user_name}
          </h3>
          
        </div>
      </div>
    )
  }
}
