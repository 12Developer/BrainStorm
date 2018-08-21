class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount = () => {
    if(this.props.user) {
      this.setState({
        username: this.props.user.username,
        password: this.props.user.password,
        id: this.props.user.id
      })
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value})
    console.log(this.state[event.target.id]);
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.handleSubmit(this.state)
  }
  render () {
    return (
      <div>
      <h1>Login</h1>
      <form>
          <label className='label' for='username'>Username</label>
          <div className='control'>
            <input className='input' type='text' id='username' ref="username"/>
          </div>
          <label className='label' for='password'>Password</label>
          <div className='control'>
            <input className='input' type='text' id='password' ref="password"/>
          </div>
          <div className='control'>
            <input className='button is-primary' type='submit' />
          </div>
      </form>
      </div>
    )
  }
}
