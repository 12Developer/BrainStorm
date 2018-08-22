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
        this.setState({
          idea_title: this.props.idea.idea_title,
          idea_content: this.props.idea.idea_content,
          id: this.props.idea.id
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
        <div className="idea">
          <form onSubmit={this.handleSubmit}>
            <p>X</p>
            <input type="text" id="idea_title" onChange={this.handleChange} value={this.state.idea_title} ref="idea_title" />
            <textarea name="idea_content" id="idea_content"onChange={this.handleChange} value={this.state.idea_content} ref="idea_content"/>
            <input type="submit" value="submit"/>
          </form>
        </div>
      </div>  
    )
  }
}
