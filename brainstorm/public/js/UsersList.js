class UsersList extends React.Component {
  render () {
    console.log(this.props);
    return (
      <table>
        <tbody>
        {this.props.users.map((user, index) => {
          return (
          <tr>
            <td onClick={()=> {this.props.toggleState('usersListIsVisible', 'userIsVisible');  this.props.getPerson(user)}}><h3> {user.username}</h3></td>
            <td onClick={()=> {this.props.toggleState('usersListIsVisible', 'userIsVisible'); this.props.getPerson(user)}}><button className='button is-warning is-small'>Edit</button></td>
            <td><button className='button is-danger is-small' onClick={()=>this.props.deletePerson(user, index)}>Delete</button></td>
          </tr>
        )
        })}
        </tbody>
      </table>
    )
  }
}
