class App extends React.Component {
  render() {
    return (
      <div>
        <Users />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('.container')
)
