import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

class App extends Component {
  state = {
    list: [],
    website: '',
    username: '',
    password: '',
    showing: true,
    no: false,
    updatingNo: 0,
    showPassword: true,
  }

  Website = event => {
    console.log(event.target.value)
    this.setState({website: event.target.value})
  }

  Username = event => {
    console.log(event.target.value)
    this.setState({username: event.target.value})
  }

  Password = event => {
    console.log(event.target.value)
    this.setState({password: event.target.value})
  }

  Add = event => {
    event.preventDefault()
    console.log('add')
    this.setState(prevState => ({
      showing: false,
      no: true,
      updatingNo: prevState.updatingNo + 1,
    }))

    const {website, username, password} = this.state
    const newList = {
      id: uuidv4(),
      website,
      username,
      password,
    }

    this.setState(
      prevState => ({
        list: [...prevState.list, newList],
      }),
      () => {
        document.getElementById('website').value = ''
        document.getElementById('username').value = ''
        document.getElementById('password').value = ''
      },
    )
  }

  checkBox = event => {
    console.log(event.target.checked)
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  searchResult = event => {
    const {list} = this.state
    console.log(event.target.value)
    const FilterData = list.filter(each =>
      each.website.toLowerCase().includes(event.target.value.toLowerCase()),
    )

    this.setState({list: FilterData, updatingNo: FilterData.length})
    console.log(list.length)
    if (list.length === 1) {
      this.setState({showing: true})
    }
  }

  Delete = id => {
    const {list} = this.state
    const Filtered = list.filter(each => each.id !== id)
    this.setState({list: Filtered, updatingNo: Filtered.length})
    if (list.length === 1) {
      this.setState({showing: true})
    }
  }

  render() {
    const {list, showing, no, updatingNo, showPassword} = this.state
    return (
      <div className="bg">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png "
          alt="app logo"
          className="logo"
        />
        <div className="fir">
          <div className="gar">
            <form className="col" onSubmit={this.Add}>
              <h1 className="p">Add New Password</h1>
              <div className="ll">
                <img
                  className="im"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                />
                <input
                  className="inp"
                  id="website"
                  onChange={this.Website}
                  type="text"
                  placeholder="Enter Website"
                />
              </div>

              <div className="ll">
                <img
                  className="im"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                  alt="username"
                />
                <input
                  className="inp"
                  id="username"
                  onChange={this.Username}
                  type="text"
                  placeholder="Enter Username"
                />
              </div>

              <div className="ll">
                <img
                  className="im"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                />
                <input
                  className="inp"
                  id="password"
                  onChange={this.Password}
                  type="password"
                  placeholder="Enter Password"
                />
              </div>
              <div className="bb">
                <button className="but" type="submit">
                  Add
                </button>
              </div>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="ppp"
            />
          </div>
        </div>

        <div className="sec">
          <div className="uu">
            <h1 className="po">Your Passwords</h1>
            <p className="span">{updatingNo}</p>
            <div className="ser">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="im lll"
              />
              <input
                type="search"
                className="inp llll"
                placeholder="Search"
                onChange={this.searchResult}
              />
            </div>
          </div>
          <hr />
          <div className="show">
            <input
              type="checkbox"
              id="check"
              className="check"
              onChange={this.checkBox}
            />
            <label htmlFor="check" className="pppp">
              Show Passwords
            </label>
          </div>
          {showing && (
            <div className="tt">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="last"
              />
              <p className="y">No Passwords</p>
            </div>
          )}
          {no && (
            <div className="lists">
              <ul className="ul">
                {list.map(each => (
                  <li key={each.id} className="lol">
                    <p className="pcol">{each.website[0]}</p>
                    <div>
                      <p className="whi">{each.website}</p>
                      <p className="whi">{each.username}</p>
                      {showPassword ? (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          alt="stars"
                          className="star"
                        />
                      ) : (
                        <div>
                          <p className="whi">{each.password}</p>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      data-testid="delete"
                      className="bu"
                      onClick={() => this.Delete(each.id)}
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                        alt="delete"
                        className="del"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App
