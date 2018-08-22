class Login extends React.Component {
  constructor(props) {
    super(props)
    // this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount = () => {
    if(this.props.loggedUser) {
      this.refs.username.value = this.props.loggedUser.username
      this.refs.password.value = this.props.loggedUser.password
    }
  }

  // handleChange = (event) => {
  //   this.setState({[event.target.id]: event.target.value})
  //   console.log(this.state[event.target.id]);
  // }

  handleSubmit = (event) => {
    event.preventDefault()
    // this.props.handleSubmit(this.state)
  }

  render () {
    return (
      <div className="container">
      <h1>Login</h1>
      {this.props.errorNoUser ? <h2>User not found</h2> : ''}
      {this.props.errorWrongPassword ? <h2>Wrong Password</h2> : ''}
      <form onSubmit={this.handleSubmit}>
          <label className="label" for="username">Username</label>
          <div className="control">
            <input className="input" type="text" id="username" ref="username"/>
          </div>
          <label className="label" for="password">Password</label>
          <div className="control">
            <input className="input" type="password" id="password" ref="password"/>
          </div>
          <div className="control">
            <input className="button is-primary" type="submit" />
          </div>
      </form>
      </div>
    )
  }
}
