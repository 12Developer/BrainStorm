class Ideas extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      login: false,
      signup: false,
      ideaIsVisible: false,
      editIdeaIsVisible: false,
      home: true,
      ideas: [],
      idea: {},
      loggedUser: null,
      errorNoUser: false,
      errorWrongPassword: false
    }
    this.toggleState = this.toggleState.bind(this)
    this.getIdeas = this.getIdeas.bind(this)
    this.getDefaultIdea = this.getDefaultIdea.bind(this)
    this.deleteIdea = this.deleteIdea.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleCreateSubmit = this.handleCreateSubmit.bind(this)
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this)
    this.selectIdea = this.selectIdea.bind(this)
    this.ideaFinder = this.ideaFinder.bind(this)
  }


  componentDidMount = () =>{
    this.getIdeas()
  }
  handleCreate = (idea) => {
    console.log([idea,...this.state.ideas]);
    this.setState=({ideas:[idea,...this.state.ideas]})
  }
  handleCreateSubmit = (new_idea) => {
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
      const copy_array = this.state.ideas
      if(copy_array[0]["user_id"] == -1){
        copy_array.pop()
      }
      jsonedIdea["username"] = this.state.loggedUser.username
      copy_array.unshift(jsonedIdea)
      this.setState({ideas: copy_array})
      this.toggleState("ideaIsVisible")
    })
  }
  handleUpdateSubmit = (idea) => {
    fetch('/ideas/' + idea.id, {
      body: JSON.stringify(idea),
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(updatedIdea => {
        return updatedIdea.json()
      })
      .then(jsonedIdea => {
        //need to update state be naughty, call that db!
        this.getIdeas()
        this.setState({selectedIdea: jsonedIdea })
        this.toggleState('ideaIsVisible')
      })
      .catch(error => console.log(error));
  }
  deleteIdea = (idea, index) => {
    fetch('/ideas/' + idea.id,
    {
      method: 'DELETE'
    })
    .then(data => {
      this.setState({
        ideas: [
          ...this.state.ideas.slice(0, index),
          ...this.state.ideas.slice(index + 1)
        ]
      })
      if(this.state.ideas.length == 0) {
        this.loadDefaultIdea()
      }
      this.toggleState("ideaIsVisible")
    }).catch(error => console.log(error))
  }
  getIdeas = (idea) => {
    fetch("/ideas")
      .then(response => response.json())
        .then(all_ideas => {
          if(all_ideas[0] == null) {
            this.loadDefaultIdea()
          } else {
            this.setState({ideas: all_ideas})
          }
        }).catch(error => console.log(error))
  }
  getDefaultIdea = () => {
    const default_idea = []
    default_idea.push({
      id:0,
      idea_title: '',
      idea_content: ''
    })
    this.setState({ideas: deafault_idea})
  }

  selectIdea = (idea, index) => {
    if(idea.id != 0){
      fetch("/ideas/" + idea.id)
      .then(response => response.json())
      .then(my_idea => {
        this.setState({selectedIdea: my_idea, selectedIdeaIndex: index})
        this.toggleState("ideaIsVisible")
      }).catch(error => console.log(error))
    }
  }

  ideaFinder  = (idea_id) => {
    let index = -1
    for(let i = 0; i < this.state.ideas.length; i++) {
      if(this.state.ideas[i].id === idea_id) {
        index = i
        break
      }
    }
    if (index != -1){
      this.selectIdea(this.state.ideas[index], index)
    }
  }

  toggleState = (st1, st2) => {
  this.setState({
    [st1]: !this.state[st1],
    [st2]: !this.state[st2]
  })
}
  render () {
    return (
      <div>
        <IdeaForm handleCreate={this.handleCreate} handleSubmit={this.handleCreateSubmit} />
        {this.state.login && !(this.state.signup) ? <IdeaForm toggleState={this.toggleState} ideas={this.state.ideas} getIdea={this.getIdea} deleteIdea={this.deleteIdea} login={true}/> : ''}
        {this.state.signup ? <IdeaForm toggleState={this.toggleState} handleCreate={this.handleCreate} handleSubmit={this.handleCreateSubmit} /> : ''}
        {this.state.ideaIsVisible ? <IdeaForm toggleState={this.toggleState } idea={this.state.idea} handleSubmit={this.handleUpdateSubmit}/> : ''}
        <IdeasList ideas={this.state.ideas} deleteIdea={this.deleteIdea}/>
      </div>
    )
  }
}
