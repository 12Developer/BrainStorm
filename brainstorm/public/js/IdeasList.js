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
              <input onClick={()=> {this.props.toggleState('ideasListIsVisible', 'ideaIsVisible');  this.props.getIdeas(idea)}}/>{idea.idea_title}
              <textarea onClick={()=> {this.props.toggleState('ideasListIsVisible', 'ideaIsVisible'); this.props.getIdeas(idea)}}>{idea.idea_content}</textarea>
            </div>
          </form>
        )
        })}
      </div>
    )
  }
}
