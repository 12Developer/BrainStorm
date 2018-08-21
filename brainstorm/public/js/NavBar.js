class NavBar extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <div className="NavBar">
        <h1>Brainstorm</h1>
        <ul>
          <li onClick={() => {this.props.toggleState('home')}}>Home</li>
          <li onClick={() => {this.props.toggleState('login')}}>Login</li>
          <li onClick={() => {this.props.toggleState('signup')}} >Signup</li>
        </ul>
      </div>
    )
  }
}
