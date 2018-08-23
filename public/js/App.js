//The App class holds all the functionality and control of the Quitter App
//Including the state, which contains if the user is logged in, what page they're view, etc.
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Which page is the user currently viewing
      page: {
        login: false,
        signup: false,
        userShow: false,
        userEdit: false,
        ideaList: true,
        ideaShow: false,
        ideaForm: false,
        ideaEdit: false

      }, //End of this.state.page
      //Login Error - No user found
      errorNoUser: false,
      //Login Error - Password submitted does not match stored password
      errorWrongPassword: false,
      //The current logged in user, if there is one
      loggedUser: null,
      //Used for user show pages
      selectedUser: null,
      //A list of ideas
      ideas: [],
      //The currently selected idea, pulled from the database
      selectedIdea: {},
      selectedIdeaIndex: 0

    } //End of this.state
    //Function Bindings
    this.togglePage = this.togglePage.bind(this);
    this.createUser = this.createUser.bind(this);
    this.setUser = this.setUser.bind(this);
    this.logOut = this.logOut.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.changeSelectedUser = this.changeSelectedUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.loadIdeas = this.loadIdeas.bind(this);
    this.createIdea = this.createIdea.bind(this);
    this.deleteIdea = this.deleteIdea.bind(this);
    this.selectIdea = this.selectIdea.bind(this);
    this.editIdea = this.editIdea.bind(this);
    this.ideaFinder = this.ideaFinder.bind(this);
  }//End of Constructor

  //Function used to load things on page load
  //Function loads a list of ideas on page load
  componentDidMount() {
    // this.togglePage("pageUserRegister");
    this.loadIdeas();
  }

  //Function used to change what section is being displayed (newPage is the new section to be displayed)
  //Function takes all the keys in this.state.page and sets them to false
  //Then it takes the parameter key (newPage) and sets it to be true
  //The state is then updated
  //The function is designed to support being scaled up indefinately
  togglePage (newPage) {
    this.loadIdeas();
    let toUpdate = {};
    for(let key in this.state.page){
      toUpdate[key] = false;
    }
    toUpdate[newPage] = true;
    this.setState({page: toUpdate })
  }

  //Function creates a new user in the database
  //Function makes a POST request to the server
  //If successful it logs the returned user into the state creating a session
  //Logged in users are then brought back to the main page (ideaList)
  createUser(new_user){
    fetch("/users", {
      body: JSON.stringify(new_user),
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(createdUser => {
      return createdUser.json()
    })
    .then(jsonedUser => {
      this.loginUser(jsonedUser);
      // this.togglePage("ideaList");
    })
    .catch(error => console.log(error));
  }

  //Function creates a session by saving the user information in the current state
  //Function changes the password to 'Nice Try' for protection before setting the state
  //this.state.loggedUser is used for user functionality (only logged in users can idea, for example)
  setUser(new_user){
    if(new_user != null){
      new_user["password"] = "*****";
    }
    this.setState({loggedUser: new_user});
  }

  //Function destroys current sesison
  //Function sets the currently logged in user to null, thus destorying the session
  logOut(){
    this.setUser(null);
  }

  //Function calls the server to login user
  //Function first sets the login error messages to false to prevent them from showing up
  //Then the function looks for the username in the database
  //If the username is found it checks the password in the database against the submitted password
  //If the passwords match, log in that user
  //If the passwords do NOT match, set the corresponding error message to true and do nothing else
  //If the username is NOT found, set the corresponding error message to true and do nothing else
  loginUser(new_user){
    // console.log("Logging In User");
    // console.log(new_user);
    this.setState({ errorNoUser: false,
                    errorWrongPassword: false});
    fetch("/users/find/'" + new_user.username + "'")
      .then(response => response.json())
        .then(logged_user => {
          if(new_user.password === logged_user.password){
            this.setUser(logged_user);
            this.togglePage("ideaList");
          } else {
            this.setState({ errorWrongPassword: true });
            console.log("Wrong Password");
          }
        }).catch(error => {
            console.log(error);
            this.setState({ errorNoUser: true });
        });
  }

  //Function changes the selected user.
  //Selected User is used to dislay user show pages
  changeSelectedUser(new_user){
    new_user["password"] = "*****";
    this.setState({selectedUser: new_user});
  }

  //Function edits an existing user
  //Function calls the back end with the information from old_user and updates the user
  //The loggedUser is then updated and the user is redirected back to the main page (ideaList)
  editUser(old_user){
    fetch("/users/" + old_user.id, {
      body: JSON.stringify(old_user),
      method: "PUT",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(updatedUser => {
      return updatedUser.json()
    })
    .then(jsonedUser => {
      this.setUser(jsonedUser);
      this.togglePage("ideaList");
    })
    .catch(error => console.log(error))
  }

  //Loads all the ideas in the database and puts it into state
  //loadIdeas executes automatically on page load
  //If there are no ideas in the database to load a default idea is loaded into state
  loadIdeas() {
    fetch("/ideas")
      .then(response => response.json())
        .then(all_ideas => {
          // console.log(all_ideas);
          if(all_ideas[0] == null){
            this.loadDefaultIdea();
          } else {
            this.setState({ideas: all_ideas})
          }
        }).catch(error => console.log(error));
  }

  //Function creates a default idea to load into state should there be no ideas to load
  //The idea is removed automatically after a idea has been made
  //The idea is automatically placed in if all the ideas are deleted
  loadDefaultIdea(){
    const default_idea = [];
    default_idea.push({
      id: 0,
      idea_title: "Deafault title",
      idea_content: "Default Content",
      user_id: -1
    })
    // console.log(default_idea);
    this.setState({ideas: default_idea});
  }

  //Function creates a new idea in the database
  //Function pushes a new idea into the database then updates the state to reflect the update
  //Should the only idea be the default idea then then default is removed before
  //updating the state with the new idea
  createIdea(new_idea){
    // console.log("Ideaing");
    // console.log(new_idea);
    fetch("/ideas", {
      body: JSON.stringify(new_idea),
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(createdIdea => {
      return createdIdea.json()
    })
    .then(jsonedIdea => {
      const copy_array = this.state.ideas;
      //If the default idea is the only idea, which has a user_id of -1, then remove the default idea
      if(copy_array[0]["user_id"] == -1){
        copy_array.pop();
      }
      jsonedIdea["username"] = this.state.loggedUser.username;
      // console.log([jsonedIdea, ...this.state.ideas]);
      //New ideas are pushed to the top automatically
      copy_array.unshift(jsonedIdea);
      this.setState({ideas: copy_array});
      this.togglePage("ideaList");
    })
  }

  //Function removes a idea from the database
  //Function first removes the idea from the database then updates the
  //current state.  If there are no more ideas in the state then load the default idea
  //Function then redirects the user to the main page (ideaList)
  deleteIdea(old_idea, index){
    // console.log("DELETING");
    // console.log(old_idea);
    fetch("/ideas/" + old_idea.id, {
      method: "DELETE"
    })
    .then(data => {
      this.setState({
        ideas: [
          ...this.state.ideas.slice(0, index),
          ...this.state.ideas.slice(index + 1)
        ]
      })
      if(this.state.ideas.length == 0){
        this.loadDefaultIdea();
      }
      this.togglePage("ideaList");
    }).catch(error => console.log(error))
  }

  //Function is used to call the database to retrive all the information about
  //one selected idea
  //Function first checks to see if the selected idea is the default idea
  //Function does not call the database or updates anything with the default idea
  //After the database is called the selected idea and idea index (used for deletion)
  //are updated in the current state
  //The user is then redirected to the ideaShow page to display the selected idea information
  selectIdea(idea, index) {
    // console.log("Selected Idea");
    // console.log(idea);
    if(idea.id != 0){
      fetch("/ideas/" + idea.id)
        .then(response => response.json())
          .then(my_idea => {
            this.setState({selectedIdea: my_idea,
                           selectedIdeaIndex: index});
            this.togglePage("ideaShow");
          }).catch(error => console.log(error));
    }
  }

  //Function is used to edit an existing idea in the database
  //Function calls the database and makes a PUT request with the new_idea
  //If successful the function calls the database again to correctly update the state
  //and redirects the user back to the selected idea
  editIdea(new_idea){
    // console.log("Editing Idea");
    // console.log(new_idea);
    fetch("/ideas/" + new_idea.id, {
      body: JSON.stringify(new_idea),
      method: "PUT",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(updatedIdea => {
      return updatedIdea.json()
    })
    .then(jsonedIdea => {
      this.loadIdeas();
      this.setState({ selectedIdea: jsonedIdea });
      // setTimeout(() => {this.togglePage("ideaShow"); console.log(this.state.selectedIdea);}, 5000);
      this.togglePage("ideaList");
    })
  }

  ideaFinder(idea_id){
    // console.log("Finding idea");
    // console.log(idea_id);
    let index = -1;
    for(let i = 0; i < this.state.ideas.length; i++){
      if(this.state.ideas[i].id === idea_id){
        index = i;
        break;
      }
    }
    if(index != -1){
      this.selectIdea(this.state.ideas[index], index);
    }
  }

  //Render to the browser
  render() {
    return (
      <div className="container">

      {/* A Nav Bar that will be stuck to the top of the page */}
        <NavBar togglePage={this.togglePage} loggedUser={this.state.loggedUser} logOut={this.logOut} changeSelectedUser={this.changeSelectedUser}/>

        {/* Conditionals that display the rest of the website's content */}
        {/*Idea Listing Section (Default Main Page) for guest users */}
        {this.state.page.ideaList && !(this.state.loggedUser) ? <div className="container"><IdeasList changeSelectedUser={this.changeSelectedUser} togglePage = {this.togglePage} ideas={this.state.ideas} loggedUser={ {id: 0} } selectIdea={this.selectIdea}/>
        </div> : ''}
        {/* If the user is logged in, display their information at the top of the page along with the ideaList section */}
        {this.state.page.ideaList && this.state.loggedUser ? <div><User loggedUser={this.state.loggedUser} togglePage={this.togglePage} changeSelectedUser={this.changeSelectedUser}/>
        <IdeasList changeSelectedUser={this.changeSelectedUser} ideas={this.state.ideas} loggedUser={this.state.loggedUser} togglePage={this.togglePage} deleteIdea={this.deleteIdea} selectIdea={this.selectIdea}/></div> : ''}
        {this.state.page.signup ? <Form functionExecute={this.createUser} title="Register"/> : ''}
        {this.state.page.login ? <Form login={true} functionExecute={this.loginUser} title="Login" errorNoUser={this.state.errorNoUser} errorWrongPassword={this.state.errorWrongPassword}/> : ''}
        {this.state.page.userEdit ? <Form functionExecute={this.editUser} title="Edit" loggedUser={this.state.loggedUser}/> : ''}
        {this.state.page.userShow ? <UserShow loggedUser={this.state.loggedUser} selectedUser={this.state.selectedUser} togglePage={this.togglePage} ideaFinder={this.ideaFinder} deleteIdea={this.deleteIdea}/>: ''}
        {/* Create Idea Section */}
        {this.state.page.ideaForm ? <IdeaForm togglePage={this.togglePage} loggedUser={this.state.loggedUser} functionExecute={this.createIdea}/> : ''}
        {/* Edit Idea Section */}
        {this.state.page.ideaEdit ? <IdeaForm togglePage={this.togglePage} loggedUser={this.state.loggedUser} functionExecute={this.editIdea} idea={this.state.selectedIdea}/> : ''}
        {/* Show idea page with logged in users */}
        {this.state.page.ideaShow && this.state.loggedUser ? <IdeasList loggedUser={this.state.loggedUser} togglePage={this.togglePage} changeSelectedUser={this.changeSelectedUser} idea={this.state.selectedIdea} ideaIndex={this.state.selectedIdeaIndex} deleteIdea={this.deleteIdea}/> : ''}
        {/* Show Idea page with guests */}
        {this.state.page.ideaShow && !(this.state.loggedUser) ? <IdeasList loggedUser={ {id: 0} } togglePage={this.togglePage} changeSelectedUser={this.changeSelectedUser} idea={this.state.selectedIdea} ideaIndex={this.state.selectedIdeaIndex} deleteIdea={this.deleteIdea}/> : ''}

      </div>
    )
  }
}

//Send to index.html
ReactDOM.render(
  <App />,
  document.querySelector(".container")
);
