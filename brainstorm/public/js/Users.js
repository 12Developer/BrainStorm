class Users extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      login: false,
      signup: false,
      userIsVisible: false,
      editUserIsVisible: false,
      home: true,
      users: [],
      user: {}
    }
    this.toggleState = this.toggleState.bind(this)
    this.getUsers = this.getUsers.bind(this)
    this.getUser = this.getUser.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleCreateSubmit = this.handleCreateSubmit.bind(this)
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this)
  }
  componentDidMount = () =>{
    this.getUsers()
  }
  handleCreate = (user) => {
    console.log([user,...this.state.users]);
    this.setState=({users:[user,...this.state.users]})
  }
  handleCreateSubmit = (user) => {
    fetch('/users', {
      body: JSON.stringify(user),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(createdUser => {
        return createdUser.json()
      })
      .then(jsonedUser => {
        this.handleCreate(jsonedUser)
        this.toggleState('signup', 'login')
      })
      .catch(error => console.log(error))
  }
  handleUpdateSubmit = (user) => {
    fetch('/users/' + user.id, {
      body: JSON.stringify(user),
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(updatedUser => {
        return updatedUser.json()
      })
      .then(jsonedUser => {
        //need to update state be naughty, call that db!
        this.getUsers()
        this.toggleState('login', 'userIsVisible')
      })
      .catch(error => console.log(error));
  }
  deleteUser = (user, index) => {
    fetch('/users/' + user.id,
    {
      method: 'DELETE'
    })
    .then(data => {
      this.setState({
        users: [
          ...this.state.users.slice(0, index),
          ...this.state.users.slice(index + 1)
        ]
      })
    })
  }
  getUsers = () =>  {
    fetch('/users')
      .then(response => response.json())
      .then(JSONdata => {
        this.setState({
          users: JSONdata
        })
      }).catch(error => console.log(error))
  }
  getUser = (user) => {
    this.setState({user: user})
  }
  toggleState = (st1, st2) => {
  this.setState({
    [st1]: !this.state[st1],
    [st2]: !this.state[st2]
  })
}
  render () {
    return (
      <div className='users column'>
        <NavBar toggleState={this.toggleState}/>
        <h2> Users</h2>
        {this.state.login && !(this.state.signup) ? <Login toggleState={this.toggleState} users={this.state.users} getUser={this.getUser} deleteUser={this.deleteUser}/> : ''}
        {this.state.signup ? <Signup toggleState={this.toggleState} handleCreate={this.handleCreate} handleSubmit={this.handleCreateSubmit} /> : ''}
        {this.state.userIsVisible ? <User toggleState={this.toggleState } user={this.state.user} handleSubmit={this.handleUpdateSubmit}/> : ''}
      </div>
    )
  }
}
