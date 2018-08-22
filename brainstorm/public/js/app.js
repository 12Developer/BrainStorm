class App extends React.Component {
  render() {
    return (
      <div>
        <Users />
        <Ideas />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('.container')
)
