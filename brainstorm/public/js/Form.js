class Form extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //Functin is used for Editing existing users
  //If there is a user, prefill the input boxes
  componentDidMount() {
    if(this.props.loggedUser){
      // console.log("Logged In User:");
      // console.log(this.props.loggedUser);
      this.refs.username.value = this.props.loggedUser.username;
      this.refs.password.value = this.props.loggedUser.password;

    }
  }

  //Function is used to handle form submitions
  //Function prevents the page from being reloaded
  //Then creates a new user based off of the form information
  //It then calls the provided parentclass function with the new user as a parameter
  handleSubmit(event) {
    //Prevent the page from being reloaded
    event.preventDefault()

    //Create new user from the form data
    const new_user = {
      username: this.refs.username.value.replace(/'/g, ""),
      password: this.refs.password.value.replace(/'/g, "")
    }

    //If the user is editing their user information, add the user ID to the new_user
    if(this.props.loggedUser){
      new_user["id"] = this.props.loggedUser.id;
    }
    //Call the ParentClass function with the newly created user
    //Different functions are (Login, Register, and (soon) Edit)
    this.props.functionExecute(new_user);
  }

  render() {
    return (
      <div className="container">
        <h1>{this.props.title}</h1>
        {/* Error Messages */}
        {/* User Name not found */}
        {
          this.props.errorNoUser ?
            <h2 className="error_message">User not found</h2>
          : ''
        }
        {/* Password entered incorrectly */}
        {
          this.props.errorWrongPassword ?
            <h2 className="error_message">Wrong Password</h2>
          : ''
        }
        <form onSubmit={this.handleSubmit}>
          <label className="label" for="username">Username</label>
          <div className="control">
            <input className="input" type="text" id="username" ref="username" required />
          </div>
          <label className="label" for="password">Password</label>
          <div className="control">
            <input className="input" type="password" id="password" ref="password" required />
          </div>
            <input className="button is-info" type="submit" />
        </form>
      </div>
    )
  }
}
