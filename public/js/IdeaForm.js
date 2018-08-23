class IdeaForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      idea_title: '',
      idea_content: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount = () => {
      if(this.props.idea) {
          this.refs.idea_title.value = this.props.idea.idea_title
          this.refs.idea_content.value = this.props.idea.idea_content
          // id: this.props.idea.id
      }
    }

    handleChange = (event) => {
      this.setState({[event.target.id]: event.target.value})
      console.log(this.state[event.target.id]);
    }

    handleSubmit = (event) => {
      event.preventDefault()
      const new_idea = {
        idea_title: this.refs.idea_title.value.replace(/'/g, ""),
        idea_content: this.refs.idea_content.value.replace(/'/g, ""),
        user_id: this.props.loggedUser.id
      }
      if(this.props.idea){
        new_idea["id"] = this.props.idea.id
      }
      // this.props.handleSubmit(this.state)
      this.props.functionExecute(new_idea)
  }
  render () {
    return (
      <div className="container">
        <div className="idea">
          <form onSubmit={this.handleSubmit}>
            <p>X</p>
            <input type="text" id="idea_title"   ref="idea_title" />
            <textarea name="idea_content" id="idea_content"  ref="idea_content"/>
            <input type="submit"/>
          </form>
        </div>
      </div>
    )
  }
}
