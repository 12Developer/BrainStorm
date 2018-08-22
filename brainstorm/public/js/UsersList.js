class UsersList extends React.Component {
  render () {
    console.log(this.props);
    return (
      <div className="container">
        {this.props.users.map((user, index) => {
          return (
          <div>
            <p onClick={()=> {this.props.toggleState('usersListIsVisible', 'userIsVisible');  this.props.getUser(user)}}>{user.username}</p>
            <button className='button is-warning is-small' onClick={()=> {this.props.toggleState('usersListIsVisible', 'userIsVisible'); this.props.getUser(user)}}>Edit</button>
            <button className='button is-danger is-small' onClick={()=>this.props.deleteUser(user, index)}>Delete</button>
          </div>
        )
        })}
      </div>
    )
  }
}
