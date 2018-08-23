class NavBar extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <div className="NavBar">
        <h1>Brainstorm</h1>
        <ul>
          <li className="Nav" onClick={() => {this.props.togglePage('ideaList');}}>Home</li>
          {this.props.loggedUser ? <li onClick={() => {this.props.changeSelectedUser(this.props.loggedUser); this.props.togglePage("userShow");}}>{this.props.loggedUser.username}</li>
          : <li className="Nav" onClick={() => {this.props.togglePage("login");}}>Login</li>}
          {this.props.loggedUser ? <li onClick={() => {this.props.logOut(); this.props.togglePage("ideaList");}}>LogOut</li>
          : <li className="Nav" onClick={() => {this.props.togglePage('signup');}} >Signup</li>}



        </ul>
      </div>
    )
  }
}
