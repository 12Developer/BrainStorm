class IdeasList extends React.Component {
  constructor(props){
    super(props)
  }
  render () {
    console.log(this.props);
    return (
      <div className="container">
        {this.props.ideas.map((idea, index) => {
          return (
          <form>
            <div className="idea">
              <p onClick={()=>this.props.deleteIdea(idea, index)}>X</p>
              <input type="text"/>{idea.idea_title}
              <textarea>{idea.idea_content}</textarea>
            </div>
          </form>
        )
        })}
      </div>
    )
  }
}
