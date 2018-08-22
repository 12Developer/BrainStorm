class NavBar extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <div className="NavBar">
        <h1>Brainstorm</h1>
        <ul>
          {this.props.loggedUser ? <li onClick={() => {this.props.changeSelectedUser(this.props.loggedUser); this.props.toggleState("userShow");}}>{this.props.loggedUser.username}</li> : ''}
          <li className="Nav" onClick={() => {this.props.toggleState('home');}}>Home</li>
          <li className="Nav" onClick={() => {this.props.toggleState('login');}}>Login</li>
          <li className="Nav" onClick={() => {this.props.toggleState('signup');}} >Signup</li>
          {this.props.loggedUser ? <li onClick={() => {this.props.logOut(); this.props.toggleState("ideaList");}}>LogOut</li>: ''}

        </ul>
      </div>
    )
  }
}
