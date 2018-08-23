class UserEdit extends React.Component {
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
      <div className="container">
      <h1>Edit User</h1>
      <form onSubmit={this.handleSubmit}>
          <label className='label' for='username'>Username</label>
          <div className='control'>
            <input className='input' type='text' id='username' onChange={this.handleChange} value={this.state.username} ref="username"/>
          </div>
          <label className='label' for='password'>Password</label>
          <div className='control'>
            <input className='input' type='text' id='password' onChange={this.handleChange} value={this.state.password} ref="password"/>
          </div>
          <div className='control'>
            <input className='button is-primary' type='submit' value="Update"/>
          </div>
      </form>
      </div>
    )
  }
}
